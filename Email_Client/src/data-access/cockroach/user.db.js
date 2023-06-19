
const Table_Name = 'users'
 function makeUserDbMethods({
    pool,
    redisClient
})
{
    
    return Object.freeze({
        createUser,
        getAllUsers,
        getUserById,
        deleteUser,
        updateUser,
        getUserByEmail
    })
    async function createUser({name,email,database,accessToken,refToken,expiryDate})
    {   
        // const cockroachConnection = await pool.connect();
        // console.log(name)
        // cockroachConnection.release();
        
        // console.log("Create user function..");
        console.log(database)
        
        console.log("Create user function..");
        
        console.log(name,email,accessToken,refToken,expiryDate)
        const result =  await pool.query(`INSERT INTO ${database}.${Table_Name} 
                                (name,emailAddress,accessToken,refToken,expiryDate) 
                                VALUES ($1,$2,$3,$4,$5) returning userid`,[name,email,accessToken,refToken,expiryDate]);
        return result;                             
    }
    async function getAllUsers({columns,database})
    {
        columns = columns.toString();
        console.log(columns);
       console.log("getAllUsers")
        let result = await pool.query(`select ${columns} from ${database}.${Table_Name}`);
        return result.rows;
    }
    async function getUserById({id,columes,database}){
        //  columes = columes.toString()
        let user =  await redisClient.hGetAll(id);
        let result;
        if(!user.userid){
            result = await pool.query(`select * from ${database}.${Table_Name} where userid = $1`,[id]);
            console.log("result",result.rows[0])
         for(let fild in result.rows[0]){
            await redisClient.hSet(id,fild,result.rows[0][fild].toString());
         }
            return result.rows[0];
         }
         else{
            console.log("user",user)
            return user;
         }
    }
    async function deleteUser({id,database}){
        console.log("dataaccess",id)
        let [result] = await pool.query(`delete from ${database}.${Table_Name} where userid = $1`,[id]);
        // console.log(result);
        return result;
    }
    async function updateUser({id,variable,column,database}){
        // console.log("updateuser",id,variable,column,database)
        let user =  await redisClient.hGetAll(id);
        await pool.query(`update ${database}.${Table_Name} set ${column}=$1 where userid = $2 `,[variable,id] );
        let data =await pool.query(`select * from ${database}.${Table_Name} where userid = $1`,[id]);
        if(!user.userid){    
            for(let fild in data.rows[0]){
                await redisClient.hSet(id,fild,data.rows[0][fild].toString());
            }
         }
         else{
             await redisClient.hSet(id,'name',variable);
             let user = await redisClient.hGetAll(id);
         }
         
    }
    async function getUserByEmail({email,database}){
        console.log("getUserByEmail");
        console.log(email,database)
        let result = await pool.query(`select * from ${database}.${Table_Name} where emailAddress  = $1`,[email]);
        return result.rows[0];
    }
}

module.exports = makeUserDbMethods;
