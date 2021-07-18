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
      res.render("pages/Home", {
        logo: "Levyne",
        products: rows,
      });
      console.log(rows);
    } catch (e) {
      console.log(e);
    }
  };
  getProducts();
});
app.get("/amazon", (req, res) => {
  const getProducts = async () => {
    try {
      let rows = await query("select *from products");
      rows = Object.values(JSON.parse(JSON.stringify(rows)));
      res.render("pages/Amazon", {
        logo: "Amazon",
        products: rows,
      });
      console.log(rows);
    } catch (e) {
      console.log(e);
    }
  };
  getProducts();
});
app.get("/swiggy", (req, res) => {
  const getProducts = async () => {
    try {
      let rows = await query("select *from products");
      rows = Object.values(JSON.parse(JSON.stringify(rows)));
      res.render("pages/Swiggy", {
        logo: "Swiggy",
        products: rows,
      });
      console.log(rows);
    } catch (e) {
      console.log(e);
    }
  };
  getProducts();
});
app.get("/zomato", (req, res) => {
  const getProducts = async () => {
    try {
      let rows = await query("select *from products");
      rows = Object.values(JSON.parse(JSON.stringify(rows)));
      res.render("pages/Zomato", {
        logo: "Zomato",
        products: rows,
      });
      console.log(rows);
    } catch (e) {
      console.log(e);
    }
  };
  getProducts();
});
app.get("/facebook", (req, res) => {
  const getProducts = async () => {
    try {
      let rows = await query("select *from products");
      rows = Object.values(JSON.parse(JSON.stringify(rows)));
      res.render("pages/Facebook", {
        logo: "Facebook",
        products: rows,
      });
      console.log(rows);
    } catch (e) {
      console.log(e);
    }
  };
  getProducts();
});

app.listen(5000, () => console.log("succesfully connected to port 5000"));
