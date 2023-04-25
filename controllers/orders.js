const con = require("../db.js")

const createOrder = (req, res) => {
    sql = "INSERT INTO orders (tittle,number,place,user_id) VALUES(?)";
    const values = [req.body.tittle, req.body.number, req.body.place, req.body.user_id];
    con.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("inserted order");
    });
}

const getAllOrders = (req, res) => {
    sql = "SELECT * FROM orders",
        con.query(sql, (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(result);
        });

}


module.exports = {
    createOrder,
    getAllOrders
}