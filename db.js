const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "husam1998",
    database: "sarh-alwarith"
})

module.exports = con