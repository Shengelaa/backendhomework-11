const hasKey = (req, res, next) => {
  console.log("req.body:", req.body); // debug print
  const key = req.body?.key;

  if (key !== "123") {
    return res.status(403).json({ error: "permission denied 1" });
  }

  next();
};

module.exports = hasKey;
