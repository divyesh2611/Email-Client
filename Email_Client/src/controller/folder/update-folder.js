module.exports = function makeUpdateFolderController({
    updateFolder,
    Joi,
    getFolderByUserId
}){
    return async function updateFolderController(req,res){
        try{
            const database = req.header["database"]
            const folderId = req.params.id;
            const folderName = req.body.folderName;
            console.log(folderId,folderName)
            const data = {
                folderId:req.params.id,
                folderName:req.body.folderName,
            }
            const {error} = validateUpdateFolder(data);
    
            if(error){
                    return res.status(400).send({"validation error":error})
            }
            const columes = ["Name"];
            const result  = await getFolder({columes,database});
            if(checkFolder(result,folderName)){
                    return res.send("Folder is already exiest")
            }
            await updateFolder({folderId,folderName,database});
            res.send("folder is updated");
        }
        catch(error){
            res.send(`updateFolderController ${error} folder is not created`)
        }
  
    }
    function validateUpdateFolder(data){
        const schema = Joi.object({
            folderId:Joi.number().required(),
            folderName:Joi.string().required(),
        });
        return schema.validate(data);
    }
    async function getFolder({columns,database}){
        console.log(`getFolder ${columns}`)
        const result = await getFolderByUserId({columns,database});
        return result;
    }
    function checkFolder(result,folderName){
        let flag = 0;
            // console.log(result);
            let obj= result.filter((e)=>{
                return e.Name == folderName;
            })
            flag = obj.length>0;
        return flag;
    }

}