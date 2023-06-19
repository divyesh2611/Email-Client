module.exports = function makeGetEmailFolderThreadController({
    getEmailFolderThread
}){
    return async function getEmailFolderThreadController(req,res){
        let folderid = req.params.folderid;
        const result = await getEmailFolderThread({folderid});
        console.log(result)
        res.send(result);
    }
}