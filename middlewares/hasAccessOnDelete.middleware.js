const hasKey = (req, res, next) => {
  const key = req.headers["key"];

  if (key !== "123") {
    return res.status(404).json({ error: "permittion denied" });
  }
  next();
};

module.exports = hasKey;
