'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Base = require('./base');

function Response() {
  // 判断是否存在实例
  if ((0, _typeof3.default)(Response.instance) === 'object') {
    return Response.instance;
  }

  /**
   * 广播
   */
  this.all = function (data) {
    console.log('res send');
    this.clients.forEach(function (item) {
      item.send((0, _stringify2.default)(data));
    });
  };

  Response.instance = this;
}

Response.prototype = new Base();

module.exports = new Response();