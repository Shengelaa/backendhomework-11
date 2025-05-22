//!1) Craete routes and grouped all expenses into routes.
//!2) Add services file where you write all logics.
//!3) Create a middleware and add this middleware on delete route. check if you does not provided some key from headers, throw errors.
//!4) Create a middleware that add craete expense route and check if user pass all required fields, otherwise throw errors.
//!5) Create a /random-fact route that returs some random fact about anything that you want, create a middleware that adds to random route and randomly half of request blocks and half of requests pass.
const express = require("express");
const { readFile, writeFile } = require("./utils");
const apiRouter = require("./api");
const randomFact = require("./random-fact/random.route");
const {
  upload,
  deleteFromCloudinary,
} = require("../backendhomework-11/config/cloudinary.config");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use("/random-info", randomFact);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const users = [
  { id: 1, name: "giorgi", age: 21 },
  { id: 2, name: "nika", age: 17 },
];

app.get("/", async (req, res) => {
  res.redirect("/api/expenses");
});

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
