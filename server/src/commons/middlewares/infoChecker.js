const config = require("../../config");

function infoChecker(req, res, next) {
  res.setHeader("Written-By", config.writtenBy);
  if (req.url !== "/info") {
    console.log(`Access to ${req.method} ${req.url}`);
  }
  next();
}

module.exports = infoChecker;
// export default infoChecker;
