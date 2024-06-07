const url = require('url');

function updateUser(req,res,storage){
    const parsedUrl = url.parse(req.url,true);
    const pathname = parsedUrl.pathname;
    const parsedPath = pathname.split('/');
    if(parsedPath.length!=3){
        res.writeHead(400);
        res.end(JSON.stringify({"message":`Invalid request`}));
        return;
    }
    const id = parseInt(parsedPath[2]);
    if(isNaN(id)){
        res.writeHead(400);
        res.end(JSON.stringify({"message":`Invalid request`}));
        return;
    }

    let body = "";

    req.on('data', chunk=>{
        body+=chunk;
    });

    req.on('end', ()=>{
        let parsedBody;
        try{
        parsedBody = JSON.parse(body);
        }catch(e){
            res.writeHead(400);
            res.end(JSON.stringify({"message":`Could not parse request ${e}`}));
            return;
        }

        user = storage.updateUser(parsedBody);
        if(user===null) {
            res.writeHead(404);
            res.end(JSON.stringify({"message":`user with id ${id} not found`}));
            return;
        }
        res.writeHead(202);
        res.end(JSON.stringify(user));


    });
}

module.exports = updateUser;