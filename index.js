const express = require("express")
const app = express()
const cors = require("cors")
const con = require("./db")
const authRoutes = require("./routes/auth")
const ordersRoutes = require("./routes/orders")

const port = 4000


app.use(express.json());
app.use(cors())
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "CREATE TABLE users (id SMALLINT NOT NULL AUTO_INCREMENT ,name VARCHAR(255), username VARCHAR(255),password VARCHAR(255),PRIMARY KEY (id))";
    // con.query(sql, function(err, result) {
    //     if (err) throw err;
    //     console.log("Table created");
    // });
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);



app.listen(port, () => { console.log(`app running on ${port}`) })