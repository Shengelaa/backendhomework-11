const { Router } = require("express");
const FiftyFiftyChance = require("../middlewares/FiftyFiftyChange.middleware");

const random = require("./random.service.js");

const randomRoute = Router();

randomRoute.get("/", FiftyFiftyChance, random);

module.exports = randomRoute;
