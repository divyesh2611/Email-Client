module.exports = function makeDeleteUserUseCase({
    userDb,
    Joi
}){
    return async function deleteUserUseCase({id,database}){
        // console.log("deleteUserUseCase",id,typeof id)
        const {error} = validateDeleteUser({id});
         console.log("error",error)
            if(error){
                
               throw new Error(error.message);
            }
        const result = await userDb.deleteUser({id,database}); 
        console.log("result",result)
        return result; 
    }
    function validateDeleteUser({id}){
        // console.log("dataaaaa",id,typeof id)
        const schema = Joi.object({
            id:Joi.number().required(),
        });
        return schema.validate({id});
    }
}