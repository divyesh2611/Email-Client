module.exports = function makeGetEmailFolderThreadUsecase({
    getEmailFolderThread
}){
    return async function getEmailFolderThreadUsecase({folderid}){
       return await getEmailFolderThread({folderid});
    }

    
}