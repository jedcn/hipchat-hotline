//
// 'hip-client' exists to provide a boundary between what
// hipchat-hotline needs from HipChat.com clients.
//
// An express goal is to allow the `hipchatter` implementation to be
// replaced without changing other aspects of hipchat-hotline.
//
var debug = require('debug')('hip-client'),
    extend = require('amp-extend'),
    HipChatter = require('hipchatter'),
    P = require('bluebird');

var debugBeforeSend = function(fnName, recipient, content, options) {
  debug(fnName);
  debug('recipient: "' + recipient + '"');
  debug('content: "' + content + '"');
  debug('options');
  debug(options);
};

function sendMessage(chatter, type, to, msg, opts) {
  return new P(function(resolve, reject) {
    var resolver = function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    };
    var options = extend({ message: msg }, opts);
    debugBeforeSend('send' + type + 'Message', to, msg, options);
    if (type == 'User') {
      chatter.send_private_message(to, options, resolver);
    } else {
      chatter.notify(to, options, resolver);
    }
  });
}

/**
 * Binds together a token and a HipChatter instance.
 */
function HipClient(token) {
  this.hipchatter = new HipChatter(token);
}

/**
 * This function is responsible for invoking the API described here:
 * https://www.hipchat.com/docs/apiv2/method/private_message_user
 */
HipClient.prototype.sendUserMessage = function(to, msg, opts) {
  return sendMessage(this.hipchatter, 'User', to, msg, opts);
};

/**
 * This function is responsible for invoking the API described here:
 * https://www.hipchat.com/docs/apiv2/method/send_room_notification
 */
HipClient.prototype.sendRoomMessage = function(to, msg, opts) {
  return sendMessage(this.hipchatter, 'Room', to, msg, opts);
};

function client(token) {
  return new HipClient(token);
}

exports.client = client;
