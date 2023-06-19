const  database  = 'kafka';

const Table_Name = 'kafka_user';
module.exports = function makeKafkaDbMethods({
    pool
}){
    return Object.freeze({
        addUserKafkaTopic,
        checkUserKafkaTopic,
        deleteKafkaTopic
    })
    async function addUserKafkaTopic({
        uniqueid,tenant
    }){
       const result = await pool.query(`INSERT INTO ${database}.${Table_Name} (uniqueid,tenant) values ($1,$2) `,[uniqueid,tenant]); 
    } 
    async function checkUserKafkaTopic({
        uniqueid,tenant
    }){
      const result =   await pool.query(`select * from ${database}.${Table_Name} where uniqueid = $1  and tenant = $2`,[uniqueid,tenant]);
        return result.rows;
    }
    async function deleteKafkaTopic({
        uniqueid,tenant
    }){
        await pool.query(`select * from ${database}.${Table_Name} where uniqueid = $1  and tenant = $2`,[uniqueid,tenant])
    }

   
}