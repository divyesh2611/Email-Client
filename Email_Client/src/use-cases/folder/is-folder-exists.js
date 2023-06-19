module.exports = function makeIsFolderExists({
    folderDb,
}
){
    return async function isFolderExists({folderName,database,userId}){
        console.log("isfolderexits",folderName,database,userId)
        const result = await folderDb.checkFolderByUserId({database,folderName,userId});
        if(result.rows.length != 0){
            throw new Error("folder is already exists")
        }
        // console.log("resultis folder ",result);
    }
}
