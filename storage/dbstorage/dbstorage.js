const {Client} = require("pg");

let users = {};
let currId = 0;

const client = new Client({
    user:'hotels-postgres',
    password:'admin',
    host:'localhost',
    port:5432,
    database:'hotels',
});

init();

async function init(){
    await client.connect();
    
    const res = await client.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL, 
        age INTEGER NOT NULL
    )`);

}

async function getUsers() {
    const res = await client.query(`SELECT * FROM users`);
    return res.rows;
}

async function addUser(user) {
    const res = await client.query(`INSERT INTO users(name,age) VALUES($1,$2) RETURNING *`,
        [user.name,user.age]);
 
    return res.rows[0];
}

async function updateUser(id, updatedUserData) {

    if(updatedUserData.age===undefined)
        updatedUserData.age = -1;

    const res = await client.query(`UPDATE users 
        SET
        name = COALESCE(NULLIF($1,''), name),
        age = COALESCE(NULLIF($2,-1), age)
        WHERE id = $3 RETURNING *`,
    [updatedUserData.name,updatedUserData.age,id]);

    if (res.rowCount==0) {
        return null;
    }

    return res.rows[0]; 
}

async function deleteUser(id){
    const res = await client.query(`DELETE FROM users WHERE id = $1`,
        [id]);

    return res.rowCount!=0;
}

async function getUserByID(id) {

    const res = await client.query(`SELECT * FROM users WHERE id = $1 LIMIT 1`,
    [id]);

    if (res.rowCount==0) {
        return false;
    }

    return res.rows[0]; 
}

module.exports = {
    getUsers,addUser,updateUser,deleteUser,getUserByID
}