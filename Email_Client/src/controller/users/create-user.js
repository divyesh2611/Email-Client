module.exports = function makeCreateUserController({
    createUser,
    Joi,
    getUserByEmail,
}){
    return async function createUserController(req,res){
        try{
            const database = req.headers['database'];
            console.log("database",database)
            const name =  req.body.name;
            const email = req.body.email;
            const accessToken = req.body.accessToken;
            const refToken = req.body.refToken;
            const expiryDate = req.body.expiryDate
            const {error} = validateCreateUser(req.body);

            if(error){
                return res.status(400).send({"validation error":error.details[0].message})
            }
            const Email =  await getEmail({email,database});
            // console.log("helloolkdsjfka")
            if(CheckEmail({Email,email})){
                return res.send("email is already exiest")
            }
            console.log("createUserController")
            const result = await createUser({name,email,database,accessToken,refToken,expiryDate});
            console.log(result.insertId);
            let userId = result.insertId;

            res.send('user is created');
        }
        catch(e){
            console.log("error");
            res.send(`${e} user is not created`);
        }
            
    }

    function validateCreateUser(data){
        const schema = Joi.object({
            name:Joi.string().min(5).required(),
            email:Joi.string().email().required(),
        });
        return schema.validate(data);
    }

    async function getEmail({email,database}){
        const result  = await getUserByEmail({email,database});
        // console.log("getEmail",result)
        return result;
    }
    function CheckEmail({Email,email}){
        let flag = 0;
            console.log(Email)
            let obj= Email.filter((e)=>{
                return e.Email_Address == email;
            })
            flag = obj.length>0;
        return flag;
    }
}