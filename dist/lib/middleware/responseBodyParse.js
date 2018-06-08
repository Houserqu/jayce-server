"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function responseBodyParse(ctx, next) {
  ctx.res.header = (0, _extends3.default)({}, ctx.res.header, { code: 200 });
  next();
}

module.exports = responseBodyParse;