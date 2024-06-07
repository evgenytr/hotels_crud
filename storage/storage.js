const currStorage = require("./memstorage/memstorage");

let getUsers = currStorage.getUsers;
let addUser = currStorage.addUser;
let deleteUser = currStorage.deleteUser;
let updateUser = currStorage.updateUser;
let getUserByID = currStorage.getUserByID;


module.exports = {
    getUsers, addUser, deleteUser, updateUser, getUserByID
}
