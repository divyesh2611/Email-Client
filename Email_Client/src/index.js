const express =  require('express');
const app  =  express();
const router =  require('./rest-service');

app.use(express.json());
app.use('/',router);
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server is listen on port no ${PORT}` );
})