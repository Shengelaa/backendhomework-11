const FiftyFiftyChance = (req, res, next) => {
  const random = Math.floor(Math.random() * 2) + 1;
  if (random === 1) {
    return res
      .status(400)
      .json({ message: "You cant access to this kind of info" });
  }

  next();
};

module.exports = FiftyFiftyChance;
