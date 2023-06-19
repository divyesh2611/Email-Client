const makeCreateFolderController = require('./create-folder');
const useCase = require('../../use-cases');
const makeGetFolderByUserIdController = require('./get-folder-by-userid');
const makeDeleteFolderController = require('./delete-folder');
const makeUpdateFolderController = require('./update-folder');
const Joi = require('joi')
const createFolderController = makeCreateFolderController({
    createFolder:useCase.folder.createFolder,
    Joi,
    getFolderByUserId:useCase.folder.getFolderByUserId,
});
const getFolderByUserIdController = makeGetFolderByUserIdController({
    getFolderByUserId:useCase.folder.getFolderByUserId,
})
const deleteFolderController = makeDeleteFolderController({
    deleteFolder:useCase.folder.deleteFolder,
})
const updateFolderController = makeUpdateFolderController({
    updateFolder:useCase.folder.updateFolder,
    Joi,
    getFolderByUserId:useCase.folder.getFolderByUserId,
})
module.exports = Object.freeze({
    createFolderController,
    getFolderByUserIdController,
    deleteFolderController,
    updateFolderController
})