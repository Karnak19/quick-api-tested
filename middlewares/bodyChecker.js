const bodyChecker = (keysToValidate) => (req, res, next) => {
  if (req.body) {
    if (req.body.firstName && req.body.lastName) {
      next();
    } else {
      res.status(422).json({
        status: "Incomplete",
        message: "'firstName' and 'lastName' keys should be included",
      });
    }
  } else {
    res.status(422).json({
      status: "Incomplete",
      message: "Please fill the body",
    });
  }
};

module.exports = bodyChecker;
