const url = require('url');

const createUser = require("./user/createUser");
const deleteUser = require("./user/deleteUser");
const getUser = require("./user/getUser");
const listUsers = require("./user/listUsers");
const updateUser = require("./user/updateUser");

const userRoutes = (req,res, storage) => {
    const parsedUrl = url.parse(req.url,true);
    const path = parsedUrl.pathname;
    const method = req.method;

    res.setHeader("Content-Type","application/json");

    if(path==="/users" && method==="GET") {
        listUsers(req,res,storage);
        return;
    }

    if(path==="/users" && method==="POST") {
        createUser(req,res,storage);
        return;
    }

    if(path.indexOf("/users/")==0 && method==="GET") {
        getUser(req,res,storage);
        return;
    }

    if(path.indexOf("/users/")==0 && method==="PUT") {
        updateUser(req,res,storage);
        return;
    }

    if(path.indexOf("/users/")==0 && method==="DELETE") {
        deleteUser(req,res,storage);
        return;
    }

    res.writeHead("404");
    res.end(JSON.stringify({message:`route ${path} not found in users`}))
}

module.exports = userRoutes;