module.exports = function makeGetFolderByUserIdController({
    getFolderByUserId
}){
    return async function getFolderByUserIdController(req,res){
        const database = req.header["database"]
        let userId = +req.params.userId;
        await getFolderByUserId({userId,database});
        res.send("susseccfull");
    }
}