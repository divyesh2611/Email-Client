module.exports = function makeGetAllUserController({
    getAllUser,
}){
    return async function getAllUserController(req,res){
        try{
            const database = req.headers["database"];
            const columns = ["Email_Address"];
            await getAllUser({columns,database});
            res.send("data is awailable");
        }
        catch(e){
            console.log("error");
            res.send(`${e} data is not awailable`)
        }
       
    }
}