module.exports = function makeGetFolderByUserIdUseCase({
    folderDb,
    Joi
}){
    return async function getFolderByUserIdUseCase({columns,userId,databse}){
        const {error} = validateFolderByUserId({userId});
        console.log("error",error)
        if(error){
            throw new Error(error.message); 
        }
       const result = await folderDb.getFolderByUserId({columns,userId,databse});
       return result;
       
    }
    function validateFolderByUserId({userId}){
        console.log(("validateUserById",userId));
        const schema = Joi.object({
            userId:Joi.number().required(),
        });
        return schema.validate({userId});
    }
}