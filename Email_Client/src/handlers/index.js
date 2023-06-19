console.log("In index of handlers...");
const { OAuth2Client } = require('google-auth-library');
const {Kafka} = require('kafkajs')
const  dbMethods  = require('../data-access');
const makeAccessTokenGenerate = require('./access-token-update');
const {database} = require('../config/database.config')
const {CLIENT_ID} = require('../config/handlers.config');
const {CLIENT_SECRET} = require('../config/handlers.config');
const {REDIRECT_URI} = require('../config/handlers.config')
const {accessTokenGroupId} = require('../config/handlers.config');
const {accessTokenTopic} = require('../config/handlers.config');
const gmail = require('googleapis').google.gmail('v1');
const google = require('googleapis');
const makeFetchFolder = require('./fetch-folders');
const makeFetchEmail = require('./fetch-email-list');
const {folderFetch} = require('../use-cases/folder');
const {getEmailsListByFolder} = require('../use-cases/email');
const {fetchEmailDetails} = require('../use-cases/email');
const {updateAccessToken} = require('../use-cases/users')
const makeFetchEmailDetails = require('./fetch-email-details');
const makecreateDefaultFolder = require('../use-cases/folder/create-default-folder');
const {deleteUserKafkaTopic} = require('../use-cases/kafka');

const createDefaultFolders = makecreateDefaultFolder({
    createFolder:dbMethods.cockroachDb.folderDbMethods.createFolder
});

const makecreateDefaultFolderHandler = require('./create-user-default-folder')
const createDefaultFoldersHandlers = makecreateDefaultFolderHandler({
    Kafka,
    createDefaultFolders,
    deleteUserKafkaTopic
})

const accessTokenGenerate = makeAccessTokenGenerate({
    Kafka,
    updateAccessToken,
    accessTokenGroupId,
    accessTokenTopic,
    deleteUserKafkaTopic
})

const fetchFolder = makeFetchFolder({
    Kafka,
    accessTokenGroupId,
    accessTokenTopic,
    folderFetch,
    deleteUserKafkaTopic
})
const fetchEmail = makeFetchEmail({
    Kafka,
    getEmailsListByFolder,
    deleteUserKafkaTopic
})

const fetchEmaildetails= makeFetchEmailDetails({
    Kafka,
    fetchEmailDetails,
    deleteUserKafkaTopic
})
createDefaultFoldersHandlers();
fetchFolder();
fetchEmail();
fetchEmaildetails();
// accessTokenGenerate();
// module.exports = Object.freeze({
//     createDefaultFoldersHandlers,
// })



      
            
