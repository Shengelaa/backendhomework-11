const hasAllrequiredFields = (req, res, next) => {
  if (!req.body?.expense || !req.file) {
    return res.status(400).json({
      message: "expense and avatar field is required in form-data body",
    });
  }

  next(); // important to call next() if all is good
};

module.exports = hasAllrequiredFields;
