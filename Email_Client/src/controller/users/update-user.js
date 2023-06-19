module.exports = function makeUpdateUserController({
    updateUser,
    Joi
}){
    return async function updateUserController(req,res){
        try{
            const database = req.headers["database"];
            const {error} = validateUpdateUser(req.body);

            if(error){
                return res.status(400).send({"validation error":error})
            }
            let id = req.params.id;
            let variable = req.body.name;
            let column = 'name';
            await updateUser({id,variable,column,database});
            res.send("user is updated");
        }
        catch(e){
            console.log("error");
            res.send(`${e} user is not updated`)
        }
        
    }
    function validateUpdateUser(data){
        const schema = Joi.object({
            name:Joi.string().min(5).required(),
        });
        return schema.validate(data);
    }
}