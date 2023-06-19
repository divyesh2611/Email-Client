const Joi = require('joi');
const makeGetEmailsListByFolderUsecase = require('./get-emails-list-by-folder');
const makeGetEmailFolderThreadUsecase = require('./get-email-folder-thread');
const dbMethods = require('../../data-access');
const {getFolderByUserId, updateFolder} = require('../folder');
const oauth2Client = require('../../config/gmail-client.config')
const {google} = require('googleapis');
const {database} = require('../../config/database.config');
const {Kafka} = require('kafkajs');
const makeFetchEmailDetailsUsecase = require('./fetch-emails-details');
const makeKafkaProducerUsecase = require('./kafka-producer');
const recipientDb = require('../../data-access/cockroach/recipient.db');
const { recipientDbMethods } = require('../../data-access/cockroach');
const {fetchAttachment} = require('../attachment');
const makeSendEmailUsecase = require('./send-email');
const { base64 } = require('js-base64');
const fs = require('fs');
const {addUserKafkaTopic} = require('../kafka');
const {checkUserKafkaTopic} = require('../kafka');

const kafkaProducer = makeKafkaProducerUsecase({
    Kafka,
    addUserKafkaTopic,
    checkUserKafkaTopic
})
const b64Decode = require('base-64').decode;
const makeParseEmail = require('./parse-email')
const parseEmail = makeParseEmail({b64Decode});
const getEmailsListByFolder = makeGetEmailsListByFolderUsecase({
    google,
    oauth2Client,
    database,
    kafkaProducer,
    getFolderByPriority:dbMethods.cockroachDb.folderDbMethods.getFolderByPriority,
    updateFolderSyncstatus:dbMethods.cockroachDb.folderDbMethods.updateFolderSyncstatus
})

const  fetchEmailDetails = makeFetchEmailDetailsUsecase({
    fetchAttachment,
    oauth2Client,
    google,
    kafkaProducer,
    addEmail:dbMethods.cockroachDb.emailDbMethods.addEmail,
    recipientDbMethods:dbMethods.cockroachDb.recipientDbMethods,
    parseEmail,
    insertEmailFolderAsso:dbMethods.cockroachDb.emailFolderAssoDbMethods.insertEmailFolderAsso,
    updateEmailHtmlBody:dbMethods.cockroachDb.emailDbMethods.updateEmailHtmlBody
})

const sendEmail = makeSendEmailUsecase({
   google,
   oauth2Client,
   getUserByEmail:dbMethods.cockroachDb.userDbMethods.getUserByEmail,
   base64,
   fs
})
const getEmailFolderThread = makeGetEmailFolderThreadUsecase({
    getEmailFolderThread:dbMethods.cockroachDb.emailDbMethods.getEmailFolderThread
})

module.exports = Object.freeze({
    getEmailsListByFolder,
    fetchEmailDetails,
    sendEmail,
    getEmailFolderThread
})