function createUser(req,res,storage) {

    let body = "";

    req.on('data', chunk=>{
        body+=chunk;
    });

    req.on('end', async ()=>{
        let parsedBody;
        
        try{
        parsedBody = JSON.parse(body);
        }catch(e){
            res.writeHead(400);
            res.end(JSON.stringify({"message":`Could not parse request ${e}`}));
            return;
        }

        //validate
        if(parsedBody.name === undefined 
            || parsedBody.age=== undefined 
            || isNaN(parsedBody.age)
        ) {
            res.writeHead(400);
            res.end(JSON.stringify({"message":"Invalid request"}));
            return;
        }

        let user = {name:parsedBody.name, age:parseInt(parsedBody.age)};
        user = await storage.addUser(user);
        res.writeHead(201);
        res.end(JSON.stringify(user));


    });

} 

module.exports = createUser;