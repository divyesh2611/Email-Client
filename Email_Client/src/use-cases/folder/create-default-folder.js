module.exports = function makeCreateDefaultFolder({
    createFolder,
}){
    return async function createDefaultFolder({userId,database}){
        console.log("userid",userId)
        let folder = ["Inbox","Sent","Archived","Outbox","Trash"];
        console.log("createdefault folder usecase");
            for(folderName of folder){
                
                // const result = await createFolder({userId,folderName,database,providerId:null,priority:null});
                // console.log("result",result)
            }
            
    }
}