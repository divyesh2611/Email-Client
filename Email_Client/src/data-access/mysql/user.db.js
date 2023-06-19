const { ref } = require("@hapi/joi/lib/compile");

const Table_Name = 'users'
function makeUserDbMethods({connection})
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
        console.log(database)
        
        console.log("Create user function..");
        
        console.log(name,email,expiryDate)
        const [result] =  await connection.execute(`INSERT INTO ${database}.${Table_Name} 
                                (name,emailAddress,accessToken,refToken,expiryDate) 
                                VALUES (?,?,?,?,?)`,[name,email,accessToken,refToken,expiryDate]);
        return result;                        
    }
    async function getAllUsers({columns,database})
    {
        columns = columns.toString();
        console.log(columns);
       console.log("getAllUsers")
        let [result] = await connection.execute(`select ${columns} from ${database}.${Table_Name}`);
        return result;
    }
    async function getUserById(id,columes,database){
         columes = columes.toString();
        let [result] = await connection.execute(`select ${columes} from ${database}.${Table_Name} where userId = ?`,[id]);
        // console.log(result);
        return result;
    }
    async function deleteUser({id,database}){
        console.log("dataaccess",id)
        let [result] = await connection.execute(`delete from ${database}.${Table_Name} where userId = ?`,[id]);
        // console.log(result);
        return result;
    }
    async function updateUser({id,variable,column,database}){
        let [result] = await connection.execute(`update ${database}.${Table_Name} set ${column}=? where userId = ?`,[variable,id]);
        // console.log(result);
        return result;
    }
    async function getUserByEmail({email,database}){
        // console.log("getUserByEmail")
        let [result] = await connection.execute(`select emailAddress from ${database}.${Table_Name} where emailAddress = ?`,[email]);
        // console.log("getUserByEmail",JSON.stringify(result))
        return result;
    }
}

module.exports = makeUserDbMethods;
