//
// 'hip-client' exists to provide a boundary between what
// hipchat-hotline needs from HipChat.com clients.
//
// An express goal is to allow the `hipchatter` implementation to be
// replaced without changing other aspects of hipchat-hotline.
//
var debug = require('debug')('hip-client'),
    extend = require('amp-extend'),
    HipChatter = require('hipchatter');

function HipClient(token) {
  this.hipchatter = new HipChatter(token);
}

/**
 * This function is responsible for invoking the API described here:
 * https://www.hipchat.com/docs/apiv2/method/private_message_user
 */
HipClient.prototype.sendUserMessage =
  function(user, content, options, callback) {
    var optionsToUse = extend({ message: content }, options);
    debug('sendUserMessage');
    debug('user: "' + user + '"');
    debug('content: "' + content + '"');
    debug('options');
    debug(optionsToUse);
    this.hipchatter.send_private_message(user, optionsToUse, callback);
  };

/**
 * This function is responsible for invoking the API described here:
 * https://www.hipchat.com/docs/apiv2/method/send_room_notification
 */
HipClient.prototype.sendRoomMessage =
  function(room, content, options, callback) {
    var optionsToUse = extend({ message: content }, options);
    debug('sendRoomMessage');
    debug('room: "' + room + '"');
    debug('content: "' + content + '"');
    debug('options');
    debug(optionsToUse);
    this.hipchatter.notify(room, optionsToUse, callback);
  };

function stdoutCallback(err) {
  if (err) {
    console.log('Problem: ' + err);
  }
}

function client(token) {
  var hipClient = new HipClient(token);
  return {
    sendUserMessage: function(user, content, options) {
      hipClient.sendUserMessage(user, content, options, stdoutCallback);
    },
    sendRoomMessage: function(room, content, options) {
      hipClient.sendRoomMessage(room, content, options, stdoutCallback);
    }
  };
}

exports.client = client;
