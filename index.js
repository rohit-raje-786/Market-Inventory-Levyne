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

app.get("/", (req, res) => {
  const getProducts = async () => {
    try {
      let rows = await query("SELECT *FROM Product");
      rows = Object.values(JSON.parse(JSON.stringify(rows)));
      const count = {};
      let items = [];
      for (let i = 0; i < rows.length; i++) {
        items.push(rows[i].name);
      }
      items.forEach((e) => (count[e] ? count[e]++ : (count[e] = 1)));

      const freq = Object.entries(count);

      console.log(freq);
      res.render("pages/Home", {
        logo: "Levyne",
        products: rows,
        freq: freq,
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
      let rows = await query("SELECT *FROM Product");
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
      let rows = await query("SELECT *FROM Product");
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
      let rows = await query("SELECT *FROM Product");
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
      let rows = await query("SELECT *FROM Product");
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

app.get("/delete/:id", async (req, res, next) => {
  try {
    let rows = await query(
      `DELETE FROM Product WHERE ProductID=${req.params.id}`
    );
    console.log(rows);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

app.listen(5000, () => console.log("successfully connected to port 5000"));
