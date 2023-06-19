module.exports  = function makeGetUserByEmailUseCase({
    userDb,
    Joi
}){
    
    return async function GetUserByEmailUseCase({email,database}){
        console.log("userdb",userDb);
        console.log("GetUserByEmailUseCase",email,typeof email,database)
        const {error} = validateUserByEmail({email});
        // console.log("error",error)
        if(error){
            throw new Error(error.message); 
        }
        return await userDb.getUserByEmail({email,database});
    }
    function validateUserByEmail({email}){
        console.log(("valEmaiateUserByEmail",email));
        const schema = Joi.object({
            email:Joi.string().email().required(),
        });
        return schema.validate({email});
    }
}