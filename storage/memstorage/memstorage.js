let users = {};
let currId = 0;

function getUsers() {
   return users;
}

function addUser(user) {
    currId++;
    user.id = currId;
    users[currId] = user;
    return user;
}

function updateUser(id, updatedUserData) {
    if(!users[id]) {
        return null;
    }
    users[id] = {...users[id], ...updatedUserData};
    return users[id];
}

function deleteUser(id){
    if(!users[id]) {
        return false;
    }
    delete(users[id]);
    return true;
}

function getUserByID(id) {
    if(!users[id]) {
        return null;
    }
    return users[id];
}

module.exports = {
    getUsers,addUser,updateUser,deleteUser,getUserByID
}