const Table_Name = "email_folder";
module.exports = function makeFolderDbMethods({
    pool
}){
    return Object.freeze({
        createFolder,
        getFolderByUserId,
        deleteFolder,
        updateFolder,
        checkFolderByUserId,
        getFolderByPriority,
        updateFolderSyncstatus
    })
    async function createFolder({userId,folderName,database,providerId,priority,syncstatus}){
        console.log("createfolder dataaccess")
        console.log(userId,folderName,database,syncstatus)
        syncstatus = 'standby';
        const result =  await pool.query(`INSERT INTO ${database}.${Table_Name} (foldername,userid,providerid,priority,syncstatus) values ($1,$2,$3,$4,$5) returning folderid`,[folderName,userId,providerId,priority,syncstatus]);
        return result.rows[0].folder;
    }
    async function getFolderByUserId({columns,database,folderName,userId}){
        // console.log(`getFolderByUserId ${columns}`);
        // let userId ='d6d05667-676c-4158-be30-84c861a02763';
        columns = columns.toString();
        const result =  await pool.query(`select ${columns} from ${database}.${Table_Name} where userid = $1 and foldername = $2`,[userId,folderName]);
        return result; 
    }
    async function deleteFolder({Id,database}){
        const result = await pool.query(`delete from ${database}.${Table_Name} where  foldereid = $1`,[Id]);
        return result;
    }
    async function updateFolder({folderId,folderName,database}){
        const result = await pool.query(`update ${database}.${Table_Name} set name = $1 where folderid = $2`,[folderName,folderId]);
        return result;
    }
    async function checkFolderByUserId({folderName,userId,database}){
        const result = await pool.query(`select * from ${database}.${Table_Name} where userid = $1 and foldername = $2`,[userId,folderName] )
        return result;
    }
    async function getFolderByPriority({userId,database}){
        console.log(userId,database)
        const result = await pool.query(`select * from ${database}.${Table_Name} where userid = $1 and (syncstatus = 'standby' or syncstatus = 'fetching') order by priority asc  limit 1 `,[userId]);
        // console.log("folder priority",result)
        return result.rows[0];
    }
    async function updateFolderSyncstatus({
      nextpagetoken,syncstatus,database,foldername,userId
    }){
        const result = await  pool.query(`update ${database}.${Table_Name} set syncstatus = $1, nextpagetoken = $2  where userid = $3 and foldername = $4`,[syncstatus,nextpagetoken,userId,foldername])
    }

    
}