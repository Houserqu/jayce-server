'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 基础类
 * 用于共享数据：连接池，事件
 */
function Base() {

  // 判断是否存在实例
  if ((0, _typeof3.default)(Base.instance) === 'object') {
    return Base.instance;
  }

  this.clients = []; // 连接池池
  this.actions = []; // 事件处理
  this.middleware = []; // 中间件
  this.name = 'base';
  this.subscriber = {}; // 订阅器

  // 缓存
  Base.instance = this;

  // 隐式返回this
}

module.exports = Base;