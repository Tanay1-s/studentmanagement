const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));

const port = process.env.PORT || 3000;
const url = process.env.DB_URL;
mongoose.connect(url);
const con = mongoose.connection;
app.use(express.json());

app.use("/api", require("./routes/routes"));

app.get("/", async (req, res) => {
  res.send("Server running...");
});
con.on("open", () => {
  console.log("DB Connected");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//student login-saransh
//student register-saransh
//teacher login-saransh
//teacher register-saransh
//teacher dashboard-tanay
//student dashboard-Tanay
//single student page-sahil
//add certificate form- sahil
//navbar-tanay
//about-sahil
