const Table_Name = "email_folder";
module.exports = function makeFolderDbMethods({
    connection
}){
    return Object.freeze({
        createFolder,
        getFolderByUserId,
        deleteFolder,
        updateFolder,
    })
    async function createFolder({userId,folderName,database}){
        console.log("database dataaceesss",database)
        await connection.execute(`INSERT INTO ${database}.${Table_Name} (folderName,userId) values (?,?)`,[folderName,userId]);
    }
    async function getFolderByUserId({columns,database}){
        userId = 41;
        // console.log(`getFolderByUserId ${columns}`);
        columns = columns.toString();
        const [result] =  await connection.execute(`select ${columns} from ${database}.${Table_Name} where userId = ?`,[userId]);
        return result; 
    }
    async function deleteFolder({Id,database}){
        const [result] = await connection.execute(`delete from ${database}.${Table_Name} where  Id = $1`,[Id]);
        return result;
    }
    async function updateFolder({folderId,folderName,database}){
        const [result] = await connection.execute(`update ${database}.${Table_Name} set Name = $1 where folderId = $2`,[folderName,folderId]);
        return result;
    }
}