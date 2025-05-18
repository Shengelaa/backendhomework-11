const hasAllrequiredFields = (req, res, next) => {
  if (!req.body?.product) {
    return res.status(400).json({ message: "product field is required" });
  }
  next();
};

module.exports = hasAllrequiredFields;
