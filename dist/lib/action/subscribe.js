'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = require('../action');
var Response = require('../jayce').Response;
var subscriber = require('../subscriber');

Action.action('/subscribe', function (ctx) {
  console.log('开始订阅请求');

  var action = ctx.req.body;

  if (ctx.req.header.type === 'SUBSCRIBE') {
    // 存在观察对象
    if (action in subscriber && (0, _typeof3.default)(subscriber[action]) instanceof Array) {
      subscriber[action].push(ctx.con);
    } else {
      subscriber[action] = [];
      subscriber[action].push(ctx.con);
    }
  }

  ctx.me('订阅成功');
});

Action.action('/unsubscribe', function (ctx) {
  var action = ctx.req.body;

  if (ctx.req.header.type === 'UNSUBSCRIBE') {
    // 存在观察对象
    if (action in subscriber && subscriber[action] instanceof Array) {
      subscriber[action].forEach(function (item, index) {
        if (item == ctx.con) {
          subscriber[action].splice(index, 1);
        }
      });
    }
  }
  console.log(subscriber[action].length);
  ctx.me('取消订阅成功');
});

module.exports = Action;