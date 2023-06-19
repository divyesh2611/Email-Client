module.exports = function makeGetAllUserUseCase({
    userDb,
}){
    return async function getAllUserUseCase({columns,database}){
       let result =  await userDb.getAllUsers({columns,database});
       result = JSON.stringify(result)
    //    console.log(`getAllUserUseCase ${result}`)
        return result;
    }
}