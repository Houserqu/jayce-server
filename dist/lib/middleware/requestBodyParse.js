'use strict';

function requestBodyParse(ctx, next) {
  var req = JSON.parse(ctx.message);
  if (req.header && req.body) {
    ctx.req = req;
    next();
  } else {
    ctx.req = {
      header: {
        url: '/error'
      },
      body: ''
    };
    return;
  }
}

module.exports = requestBodyParse;