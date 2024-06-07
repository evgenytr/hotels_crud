const url = require('url');

function deleteUser(req,res,storage) {
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

    const result = storage.deleteUser(id);
    if(result===false){
        res.writeHead(404);
        res.end(JSON.stringify({"message":`User with id ${id} doesn't exist`}));
        return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({"message":`User succesfully deleted`}));
}

module.exports = deleteUser;