module.exports = function makeDeleteFolderController({
    deleteFolder,
    Joi
}){
    return async function deleteFolderController(req,res){
        const database = req.header["database"]
        const folderName = req.body.folderName;
        const userId = req.params.Id;
        const data = {
            folderName:req.body.folderName,
            userId:req.params.Id
        }
        const {error} = validateDeleteFolder(data);
        if(error){
                return res.status(400).send({"validation error":error})
        }

        console.log(folderName);
        await deleteFolder({folderName,userId,database});
        res.send('folder is deleted');
    }
    function validateDeleteFolder(data){
        const schema = Joi.object({
            userId:Joi.number().required(),
            folderName:Joi.string().min(1).max(10).required(),
        });
        return schema.validate(data);
    }
}