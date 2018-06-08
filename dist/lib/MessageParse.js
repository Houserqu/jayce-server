'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Base = require('./base');
var MiddleExecute = require('./middleExecute');
var subscriber = require('./subscriber');

/**
 * 消息解析器，根据客户端发送的消息构建请求对象和回复对象
 */
function MessageParse() {

  if ((0, _typeof3.default)(MessageParse.instance) === 'object') {
    return MessageParse.instance;
  }

  var that = this;

  /**
   * 根据消息创建请求对象
   * @param {string} msg 
   */
  this.createContext = function (msg, con, clients) {
    // 创建上下文对象
    var ctx = {};

    ctx.message = msg;
    ctx.con = con;
    ctx.res = {
      header: '',
      body: ''

      /**
       * 给当前链接发送消息
       * @param {object} data 
       */
    };ctx.send = function () {

      // 实例化中间件执行器
      MiddleExecute(ctx, 'response');
      //middleExecute.next();

      // 返回处理后的上下文
      //reqctx = middleExecute.ctx;

      con.send((0, _stringify2.default)(ctx.res));
    };

    /**
     * 广播
     * @param {object} data 
     */
    ctx.all = function (data, header) {
      var _this = this;

      this.res.body = data;
      this.res.header = (0, _extends3.default)({}, header, this.res.header);

      MiddleExecute(ctx, 'response');

      clients.forEach(function (item) {
        item.send(_this.res);
      });
    };

    /**
     * 发布 订阅消息
     * @param {object} data 
     */
    ctx.release = function (action) {
      var _this2 = this;

      this.res.body = action;
      this.res.header = (0, _extends3.default)({
        type: 'SUBSCRIBE'
      }, this.res.header);

      MiddleExecute(ctx, 'response');

      if (action.type in subscriber) {
        subscriber[action.type].forEach(function (item) {
          item.send((0, _stringify2.default)(_this2.res));
        });
      }
    };

    ctx.me = function (data, header) {
      this.res.body = data;
      //this.res.header = {...header, ...this.res.header};
      //MiddleExecute(ctx, 'response');

      ctx.send();
    };

    return ctx;
  };

  MessageParse.instance = this;
}

MessageParse.prototype = new Base();

module.exports = new MessageParse();