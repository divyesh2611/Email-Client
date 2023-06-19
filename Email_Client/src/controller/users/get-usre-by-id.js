module.exports = function makeGetUserByIdController({
    getUserById,
    Joi
}){
    return async function getUserByIdController(req,res){
        try{
            const database = req.headers["database"];
            const {error} = validateUserById(req.params);

            if(error){
                return res.status(400).send({"validation error":error})
            }
            let id = req.params.id
            let columes = '*';
            let data = await getUserById({id,columes,database});
            res.send(data);
        }
        catch(e){
            console.log("erorr");
            res.send(`${e} user is not found`);
        }
    }
    function validateUserById(data){
        const schema = Joi.object({
            id:Joi.string().required(),
        });
        return schema.validate(data);
    }
}