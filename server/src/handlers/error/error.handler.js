const { errorResponse } = require("../../commons/response");

const errorHandler = (err, req, res, next) => {
  console.log(`Error on ${req.method} ${req.url}`, {
    body: req.body,
    params: req.params,
    query: req.query,
  });
  console.log(err.stack);
  errorResponse(res, err.message, { status: 500 });
};

module.exports = errorHandler;
