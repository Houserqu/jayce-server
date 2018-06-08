"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requestLogger(ctx, next) {
  console.log("req: " + (0, _stringify2.default)(ctx.req));
  next();
}

module.exports = requestLogger;