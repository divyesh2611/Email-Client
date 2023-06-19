module.exports = function makeCreateFolderUseCase({
    folderDb,
    Joi,
    isFolderExists,
}){
    return async function createFolderUseCase({userId,folderName,database,providerId,priority}){
        
        const {error} = validateCreateFolder({userId,folderName});
        if(error){
            throw new Error(error.message);
        }
        await isFolderExists({
            folderName,
            database,
            userId
        });
        return await folderDb.createFolder({userId,folderName,database,providerId,priority});
          
    }

    function validateCreateFolder({userId,folderName}){
        const schema = Joi.object({
            userId:Joi.string().required(),
            folderName:Joi.string().min(1).max(20).required(),
        });
        if(folderName.match(/^([+-]?[1-9]\d*|0)$/)){
            const error = new Error('\"folderName" is must be string');
            console.log("error.message",error.message);
            const e={
                error :error
            }
            return e;
        }
        else
          return schema.validate({userId,folderName});
        
    }

    
    
}