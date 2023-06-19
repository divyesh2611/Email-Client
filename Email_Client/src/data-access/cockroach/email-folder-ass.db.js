const Table_Name = 'emails_folders_asso';

module.exports = function makeEmailFolderAssoDbMethods({
    pool
}){
    return Object.freeze({
        insertEmailFolderAsso,
    })
    async function insertEmailFolderAsso({
        database,
        folderid,
        emailid
        }){
            console.log("******insertEmailfolder*******",database,folderid,emailid)
            result = await pool.query(`INSERT INTO ${database}.${Table_Name} (folderiD,emailid) values ($1,$2) `,[folderid,emailid]);
            return result.rows[0];
        } 
}
