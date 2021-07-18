var express = require("express");
var app = express();

var mysql = require("mysql");
const util = require("util");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "products",
});
const query = util.promisify(con.query).bind(con);
let data = [];


console.log(data);

app.set("view engine", "ejs");
const products = [
  { name: "Chockalate Cake", price: 34 },
  { name: "Cadbury", price: 25 },
  { name: "Milkshake", price: 56 },
];
app.get("/", (req, res) => {
  const getProducts = async () => {
    try {
      let rows = await query("select *from products");
      rows = Object.values(JSON.parse(JSON.stringify(rows)));
      for (let i = 0; i < rows.length; i++) {
        data.push(rows[i]);
      }
      console.log(rows);
    } finally {
      con.end();
    }
  };
  getProducts();
  res.render("pages/Home", {
    logo: "Levyne",
    products: products,
  });
});
app.get("/amazon", (req, res) => {
  res.render("pages/Amazon", {
    logo: "Amazon",
    products: products,
  });
});
app.get("/swiggy", (req, res) => {
  res.render("pages/Swiggy", {
    logo: "Swiggy",
    products: products,
  });
});
app.get("/zomato", (req, res) => {
  res.render("pages/Zomato", {
    logo: "Zomato",
    products: products,
  });
});
app.get("/facebook", (req, res) => {
  res.render("pages/Facebook", {
    logo: "Facebook",
    products: products,
  });
});

app.listen(5000, () => console.log("succesfully connected to port 5000"));
