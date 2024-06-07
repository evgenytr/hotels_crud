const http = require('http');

const router = require('./router/router');

const server = http.createServer(router);

const PORT = 8080;

server.listen(PORT, ()=> {
    console.log(`Server has started and listens on port ${PORT}`)
})