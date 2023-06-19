const { database } = require("../../config/database.config");


const Table_Name = 'email_attachment';

module.exports = function makeAttachmentDbMethods({
 pool,

}){
    return Object.freeze({
        insertAttachment,
    })
    async function insertAttachment({emailid,fileName,size,path}){
        return result  = await pool.query(`insert into ${database}.${Table_Name} (emailid,filename,size,path) values($1,$2,$3,$4)`,[emailid,fileName,size,path])
    }
}