module.exports = function makeCreateFolderController({
    createFolder,
    Joi,
    getFolderByUserId,
}){
    return async function createFolderController(req,res){
        try{
            const database = req.header["database"]
            const {error} = validateCreateFolder(req.body);
            if(error){
                return res.status(400).send({"validation error":error})
            }
            const userId = req.body.userId;
            const folderName = req.body.folderName;
            const columns = ["Name"];
            const result  = await getFolder({columns,database});

            if(checkFolder({result,folderName})){
                return res.send("Folder is already exiest")
            }
            
            console.log(userId,folderName);
            await createFolder({userId,folderName,database});
            res.send('folder is created');
        }
        catch(error){
            console.log("error");
            res.send(`${error} folder is not created`);
        }
    }
    function validateCreateFolder(data){
        const schema = Joi.object({
            userId:Joi.number().required(),
            folderName:Joi.string().min(1).max(10).required(),
        });
        return schema.validate(data);
    }
    async function getFolder({columns,database}){
        const result = await getFolderByUserId({columns,database});
        
        return result;
    }
    function checkFolder({result,folderName}){
        let flag = 0;
            let obj= result.filter((e)=>{
                return e.Name == folderName;
            })
            flag = obj.length>0;
        return flag;
    }
}