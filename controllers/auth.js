const con = require("../db.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = (req, res) => {
    //CHECK EXISTING USER
    const sql = "SELECT * FROM users WHERE name = ? OR username = ?";
    con.query(sql, [req.body.name, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const sql = "INSERT INTO users(`username`,`name`,`password`) VALUES (?)";
        const values = [req.body.username, req.body.name, hash];
        con.query(sql, [values], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({ id: result.insertId, name: req.body.name, username: req.body.username, token: generateToken(result.insertId, req.body.username) });
        });
    })
}

const login = (req, res) => {
    // check user
    sql = "SELECT * FROM users WHERE username = ?"
    con.query(sql, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );
        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");
        var data = JSON.parse(JSON.stringify(data[0]))
        res.status(200).json({ id: data.id, name: data.name, username: data.username, token: generateToken(data.id, data.username) })

        console.log(data);


    })
}

const generateToken = (id, username) => {
    return jwt.sign({ id, username }, "jwtsecret", {
        expiresIn: '30d',
    })
}

module.exports = {
    register,
    login
}