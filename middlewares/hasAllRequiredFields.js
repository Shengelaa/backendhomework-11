const hasAllrequiredFields = (req, res, next) => {
  console.log("body:", req.body);
  console.log("file:", req.file);

  if (!req.body?.expense || !req.file) {
    return res.status(400).json({
      message: "expense and avatar field is required in form-data body",
    });
  }

  next();
};

module.exports = hasAllrequiredFields;
