const http = require('http');
const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 8000

const server = http.createServer(app);

if(!module.parent){
server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
});
}