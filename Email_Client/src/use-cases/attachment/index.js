const makeFetchAttachmentUsecase = require('./fetch-attachment')
const oauth2Client = require('../../config/gmail-client.config')
const {google} = require('googleapis');
const fs = require('fs');
const dbMethods = require('../../data-access')
const fetchAttachment = makeFetchAttachmentUsecase({
    google,
    oauth2Client,
    fs,
    insertAttachment:dbMethods.cockroachDb.attachmentDbMethods.insertAttachment
})

module.exports = Object.freeze({
    fetchAttachment,
})