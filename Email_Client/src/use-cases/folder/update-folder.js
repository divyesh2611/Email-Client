module.exports = function makeUpdateFolderUseCase({
    folderDb,
    Joi
}){
    return async function updateFolderUseCase({folderId,folderName}){
         console.log("updateFolderUseCase",folderId,)
        const {error} = validateUpdateFolder({folderId,folderName});
        
        if(error){
                console.log("error.message",error.message)
                throw new Error(error.message);
            }
         const result =  await folderDb.updateFolder({folderId:folderId,folderName:folderName});
         console.log("result",result)
         return result;
    }
    function validateUpdateFolder({folderId,folderName}){
        console.log("validatefolder",typeof folderId,typeof folderName,folderId,folderName)
        const schema = Joi.object({
            folderId:Joi.number().required(),
            folderName:Joi.string().min(5).required(),
        });
        return schema.validate({folderId,folderName});
    }
}