module.exports = function makeCreateUserUsecase({
    userDb,
    Joi,
    Kafka,
    addUserKafkaTopic,
    checkUserKafkaTopic
}){
    
    return async function createUserUsecase({name,email,database,accessToken,refToken,expiryDate}){
        // console.log("createUserUsecase",database);
        // accessToken = "kajslfdkaurw23sda";
        // refToken = "dsfdsfs23t3463q";
        // expiryDate = new Date();
        const {error} = validateCreateUser({name,email});
            if(error){
                throw new Error(error.message);
        }
        const userByEmailId = await userDb.getUserByEmail({email,database})
        console.log("userByEmailId",userByEmailId);
        if(userByEmailId){
            throw new Error('User with the same email is already exists');
        }
        const result =  await userDb.createUser({name,email,database,accessToken,refToken,expiryDate});
        
        console.log("userid",result.rows[0].userid,accessToken)
        await runProducer(result.rows[0].userid,accessToken,refToken,database);
        return result;
    }
    function validateCreateUser({name,email}){
       
        const schema = Joi.object({
            name:Joi.string().min(5).required(),
            email:Joi.string().email().required(),
        });
    
        return schema.validate({name,email});
    }
    async function runProducer(userId,accessToken,refToken,database)
    {

        const messageObject = {
            id: userId,
            accessToken:accessToken ,
            refToken: refToken
        }
        const messageValue = JSON.stringify(messageObject)

        const kafka = new Kafka({
            clientId:'Email-client1',
            brokers:['localhost:9092']
        })
        const producer = kafka.producer();
        await producer.connect();
        console.log("above kafka in create user usecase")
        const defaultTopicResult = await checkUserKafkaTopic({uniqueid:'defaultFoldersTopic'+"-"+userId,tenant:database})
        
        const fetchFolderResult = await checkUserKafkaTopic({uniqueid:'fetchfolder'+'-'+userId,tenant:database})
        console.log(defaultTopicResult,typeof defaultTopicResult)
        if(!defaultTopicResult[0]){
            await producer.send({
                topic: 'defaultFoldersTopic',
                messages: [
                    {
                        value:userId.toString()   
                    }
                ]
            })
            await addUserKafkaTopic({uniqueid:'defaultFoldersTopic'+'-'+userId,tenant:database})
        }
        
           
        
        
        if(!fetchFolderResult[0]){
            await producer.send({
                topic: 'fetchfolder',
                messages: [
                    { value: messageValue }
                ]
            })
            addUserKafkaTopic({uniqueid:'fetchfolder'+'-'+userId,tenant:database})

        }
        
        
        
    }
}