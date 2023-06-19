
module.exports = function makeDeleteFolderUseCase({
    folderDb,
    Joi
}){
    return async function deleteFolderUseCase({Id}){
      console.log("Id : ",Id,typeof Id)
        const {error} = validateDeleteFolder({Id});
        if(error){
                throw new Error(error.message);
        }

        return await folderDb.deleteFolder({Id});
    }
    function validateDeleteFolder({Id}){
        const schema = Joi.object({
            Id:Joi.number().required(),
        });
        return schema.validate({Id});
    }
}