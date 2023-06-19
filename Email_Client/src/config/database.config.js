const mysql = require('mysql2');
const {Client} = require('pg');
const {createClient} = require('redis');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     // database: 'exercise',
//     password:'root'
// }).promise();


 const client = new Client({
        host: 'localhost',
        port:8080,
        // database: 'database-name',
        user: 'divyseh',
        password: 'divyesh',
      })

  const cockroachConnection = client.connect();

  const redisClient = createClient();
  redisClient.on('error', err => console.log('Redis Client Error', err));
  redisClient.connect();
  
   


// module.exports = {connection:connection,cockroachConnection:cockroachConnection,database:'test1'};

module.exports = {cockroachConnection:cockroachConnection,database:'test1',redisClient};