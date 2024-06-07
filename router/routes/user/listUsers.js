function listUsers(req,res,storage) {
    let allUsers = storage.getUsers();
    res.writeHead(200);
    res.end(JSON.stringify(allUsers));
}

module.exports = listUsers;