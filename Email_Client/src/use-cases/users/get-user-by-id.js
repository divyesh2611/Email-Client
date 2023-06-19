module.exports  = function makeGetUserByIdUseCase({
    userDb,
    Joi
}){
    return async function GetUserByIdUseCase({id,columes,database}){
        console.log("GetUserByIdUseCase",id,typeof id)
        const {error} = validateUserById({id});
        console.log("error",error)
        if(error){
            throw new Error(error.message); 
        }
        return await userDb.getUserById({id,columes,database});
    }
    function validateUserById({id}){
        console.log(("validateUserById",id));
        const schema = Joi.object({
            id:Joi.string().required(),
        });
        return schema.validate({id});
    }
}

