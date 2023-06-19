

module.exports = function makeUpdateUserUseCase({
    userDb,
    Joi
}){
    return async function makeUpdateUserUseCase({id,variable,column,database}){
        const {error} = validateUpdateUser({id});

        if(error){
                throw new Error(error.message)
        }
        return await userDb.updateUser({id,variable,column,database});
    }
    function validateUpdateUser({id}){
        const schema = Joi.object({
            id:Joi.string().required(),
        });
        return schema.validate({id});
    }
}