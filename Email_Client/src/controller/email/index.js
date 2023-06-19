const makeSendEmailController = require('./send-email');
const makeThredEmailController = require('./tread-email');
const makeGetEmailFolderThreadController = require('./get-email-folder-thread');
const usecase = require('../../use-cases')
const axios = require('axios');
const sendEmailController = makeSendEmailController({
    sendEmail:usecase.email.sendEmail,
});
const treadEmailsController = makeThredEmailController({
    axios
})
const getEmailFolderThreadController = makeGetEmailFolderThreadController({
    getEmailFolderThread:usecase.email.getEmailFolderThread
})

module.exports = Object.freeze({
    sendEmailController,
    treadEmailsController,
    getEmailFolderThreadController
    
})