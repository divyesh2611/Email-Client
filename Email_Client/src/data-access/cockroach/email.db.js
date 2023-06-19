const { database } = require("../../config/database.config");



const Table_Name = 'emails';
const Table_Name_Attachment = 'email_attachment';
const Table_Name_Association = 'emails_folders_asso';

module.exports = function makeEmailDbMethods({
    pool
}){
    return Object.freeze({
        addEmail,
        updateEmailHtmlBody,
        getEmailFolderThread
    })
    async function addEmail({
        threadId,snippet,fromdata,userId,msgId,database,bodyHtml,bodyText,subject,createdat
    }){
        console.log("from",fromdata)
        createdat = createdat/1000;
          const   result = await pool.query(`INSERT INTO ${database}.${Table_Name} (threadid,snippet,msgid,userid,bodyHtml,bodyText,subject,createdat,fromdata) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning emailid`,[threadId,snippet,msgId,userId,bodyHtml,bodyText,subject,createdat,fromdata]);
            return result.rows[0].emailid;
    } 
    async function updateEmailHtmlBody({
       bodyHtml,emailid
    }){
        await pool.query(`update ${database}.${Table_Name} set bodyhtml = $1 where emailid = $2`,[bodyHtml,emailid]);

    }
    async function getEmailFolderThread({
     folderid
    }){
      const result =   await pool.query(`SELECT "${Table_Name}".emailid  "${Table_Name}".fromdata, "${Table_Name}".subject, "${Table_Name}".snippet, "${Table_Name}".createdat, MAX("${Table_Name_Attachment}".filename) AS max_filename, "${Table_Name_Attachment}".path
      FROM "${Table_Name}"
      INNER JOIN "${Table_Name_Association}" ON "${Table_Name}".emailid = "${Table_Name_Association}".emailid
      LEFT JOIN "${Table_Name_Attachment}" ON "${Table_Name}".emailid = "${Table_Name_Attachment}".emailid
      WHERE "${Table_Name_Association}".folderid = $1
      GROUP BY "${Table_Name}".emailid, "${Table_Name_Attachment}".path `,[folderid]);
        return result.rows;
    }

   
}
