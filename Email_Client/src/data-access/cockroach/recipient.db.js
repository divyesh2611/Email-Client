

const Table_Name = 'email_recipient';
module.exports = function makeRecipientDbMethods({
  pool
}){
    return Object.freeze({
        addRecipientTo,
        addRecipientBcc,
        addRecipientCc

    })
    async function addRecipientTo({emailid,emailAddress,database}){
            console.log("addrecipientto",emailid,emailAddress)
            await pool.query(`INSERT INTO ${database}.${Table_Name} (emailid,emailaddress,type) values ($1,$2,$3)`,[emailid,emailAddress,'to']);    
    }
    async function addRecipientBcc({emailid,emailAddress,database}){
        await pool.query(`INSERT INTO ${database}.${Table_Name} (emailid,emailaddress,type) values ($1,$2,$3)`,[emailid,emailAddress,'bcc']);  
    }
    async function addRecipientCc({emailid,emailAddress,database}){
        await pool.query(`INSERT INTO ${database}.${Table_Name} (emailid,emailaddress,type) values ($1,$2,$3)`,[emailid,emailAddress,'Cc']);  
    }

}