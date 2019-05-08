const { backOfficePublic } = require("./config");
const blockchain = require("./blockchain");
const express = require("express")
const cors = require("cors");
const db = require("./db");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", (req, res) => {
  db.query("SELECT id, name, email, stellar, is_merchant, created_at FROM users", (err, results, fields) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/user", async (req, res) => {
  const { email } = req.query;
  if (email) {
    console.log(email);
    db.query("SELECT id, name, email, public_key, created_at FROM users WHERE email = ?", [ email ], async (err, results, fields) => {
      const result = results[0];
      if (err) throw err;
      result.balance = await blockchain.getBalance(result.public_key);
      res.json(result);
    });
  } else {
    throw "Email parameter is missing";
  }
});

app.get("/balance", async (req, res) => {
  const { email, public_key } = req.query;
  if (email === "backoffice") {
    const balance = await blockchain.getBalance(backOfficePublic);
    res.json({ balance });
  } else if (public_key){
    const balance = await blockchain.getBalance(public_key);
    res.json({ balance });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));