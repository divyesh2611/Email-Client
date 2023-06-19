module.exports = function makeDeleteUserController({
    deleteUser,
    Joi
}){
    return async function deleteUserController(req,res){
        try{
            const database = req.headers["database"];
            const {error} = validateDeleteUser(req.params);

            if(error){
                return res.status(400).send({"validation error":error})
            }
            let id = req.params.id;
            await deleteUser({id,database});
            res.send("user is deleted");
        }
        catch(e)
        {
            console.log("error");
            res.send(`${e}user not found`);
        }
        
    }
    function validateDeleteUser(data){
        const schema = Joi.object({
            id:Joi.number().required(),
        });
        return schema.validate(data);
    }
}