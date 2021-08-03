var express = require("express");
var app = express();
var session = require('express-session');

var mysql = require("mysql");
const util = require("util");
var con = mysql.createConnection({
  host: "SG-Levyne-4674-mysql-master.servers.mongodirector.com",
  user: "sgroot",
  password: "cdGO2rIs8uP!FYm9",
  database: "Levyne",
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
const query = util.promisify(con.query).bind(con);

app.set("view engine", "ejs");

//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }))

app.get('/auth', (req, res) => {
  res.render("pages/login", { logo: "Login" });
})

app.post('/auth', async (req, res) => {
	var number = req.body.number;
	if (number) {
		await query('SELECT * FROM accounts WHERE number = ?', [number], function(error, results) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.number = number;
				res.redirect('/');
			} else {
				res.send('Incorrect Number! Please try again');
			}			
		});
	} else {
		res.send('Please enter Username and Password!');
	}
});

app.get("/", (req, res) => {
  const getProducts = async () => {
    try {
      let rows = await query("select *from FakeCakeProducts");
      rows = Object.values(JSON.parse(JSON.stringify(rows)));
      const count = {};
      let items = [];
      for (let i = 0; i < rows.length; i++) {
        items.push(rows[i].brand);
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
      let rows = await query("select *from FakeCakeProducts");
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
      let rows = await query("select *from FakeCakeProducts");
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
      let rows = await query("select *from FakeCakeProducts");
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
      let rows = await query("select * from FakeCakeProducts");
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
  if(req.session.loggedin){
    try {
      let rows = await query(
        `DELETE FROM FakeCakeProducts Where eancode=${req.params.id}`
      );
      console.log(rows);
      res.redirect("/");
    } catch (e) {
      console.log(e);
    }
    
  }
  else {
    res.send('Please login to buy and checkout!');
  }
  
});

app.listen(5000, () => console.log("succesfully connected to port 5000"));
