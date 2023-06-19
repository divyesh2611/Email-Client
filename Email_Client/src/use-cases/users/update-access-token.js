module.exports = function makeUpdateAccessTokenUsecase({
    OAuth2Client,
    database,
    dbMethods,
    CLIENT_ID, 
    CLIENT_SECRET
}){
    return async function updateAccessTokenUsecase(){
        const authClient = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
        const newDate = new Date();
        const currentDate = new Date().getTime(); 
        const result = await dbMethods.cockroachDb.userDbMethods.getAllUsers({columns:'*',database:database});
        console.log(result)
        
        const users = result.map(user =>{
          console.log(user,user.expirydate.getTime(),currentDate)
          if(user.expirydate.getTime() < currentDate)
           return user ;
        })

        
        if(users[0]!=undefined){
          console.log("users",users)
          for(let user of users){
              authClient.setCredentials({ refresh_token: user.reftoken });
              return authClient.getAccessToken()
                .then(async (tokenResponse) => {
                  const accessToken = tokenResponse.token;
                  console.log('New access token:', accessToken);
                  const id  = user.userid
                  await dbMethods.cockroachDb.userDbMethods.updateUser({id,columnData: accessToken,column: 'accesstoken',database})
                  console.log("accessToken is updated successfully")
                })
                .catch((err) => {
                  console.error('Error updating access token:', err);
                });
          }
        }
    } 
    
    
   
}
