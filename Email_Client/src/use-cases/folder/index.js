const makeCreateFolderUseCase = require('./create-folder');
const makeGetFolderByUserIdUseCase = require('./get-folder-by-user-id');
const makeDeleteFolderUseCase = require('./delete-folder');
const makeUpdateFolderUseCase = require('./update-folder');
const makeCreateDefaultFolder = require('./create-default-folder');
const makeIsFolderExists = require('./is-folder-exists')
const dbMethods = require('../../data-access');
const makeFetchFolder = require('./fetch-folders');
const {CLIENT_ID} = require('../../config/handlers.config');
const {CLIENT_SECRET} = require('../../config/handlers.config');
const {REDIRECT_URI} = require('../../config/handlers.config')
const Joi = require('joi');
const {database} = require('../../config/database.config')
const { OAuth2Client } = require('google-auth-library');
const {google} = require('googleapis');
const {Kafka} = require('kafkajs')
const {addUserKafkaTopic} = require('../kafka');
const {checkUserKafkaTopic} = require('../kafka');
const ACCESS_TOKEN = 'ya29.a0Ael9sCO7tUaSXESjye1TbOhVchl92quZhu5nxOX_PnhMRB1v1HgfuCtqTZTgpW-FoC2dzfvfGp--roDoLCQ1pxqItk6qpaKq4U3bsK6MbtSuqjV8z_Qq0rczJxU5yxsvuy-c_VPxsubP2jFGyM5dprtnr4c_aCgYKAbASARMSFQF4udJh-B77dv0vlqI0sSgnUWKnXg0163';
const REFRESH_TOKEN = '1//0grNDDmizOz4pCgYIARAAGBASNwF-L9Ir5oUz5YZZ-XqcazsUdvUIM1rdaOXv2gbbEa2ri2-HTd8cgJG-xL3u5csHxUEof4LzScw';


const isFolderExists = makeIsFolderExists({
    folderDb:dbMethods.cockroachDb.folderDbMethods,
})
const createFolder = makeCreateFolderUseCase({
    folderDb:dbMethods.cockroachDb.folderDbMethods,
    Joi,
    isFolderExists,
})
const getFolderByUserId = makeGetFolderByUserIdUseCase({
    folderDb:dbMethods.cockroachDb.folderDbMethods,
    Joi
})
const deleteFolder = makeDeleteFolderUseCase({
    folderDb:dbMethods.cockroachDb.folderDbMethods,
    Joi
})
const updateFolder = makeUpdateFolderUseCase({
    folderDb:dbMethods.cockroachDb.folderDbMethods,
    Joi
})
const createDefaultFolder = makeCreateDefaultFolder({
    createFolder,
})
const userId = "8a7c7dad-ae6d-451f-83c9-99c09cb25729";
// createDefaultFolder({userId:userId,database:'test1'});
const folderFetch = makeFetchFolder({
    CLIENT_ID, 
    CLIENT_SECRET, 
    REDIRECT_URI, 
    google,
    OAuth2Client ,
    createFolder,
    Joi,
    database,
    Kafka,
    addUserKafkaTopic,
    checkUserKafkaTopic
})
// folderFetch({accessToken:'asdf',refToken:'sdads',userId:'sdaw343'});
module.exports = Object.freeze({
    createFolder,
    getFolderByUserId,
    deleteFolder,
    updateFolder,
    createDefaultFolder,
    isFolderExists,
    folderFetch
})
