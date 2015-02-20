var debug = require('debug')('hip-client'),
    extend = require('amp-extend'),
    HipChatter = require('hipchatter');

function HipClient(token) {
  this.hipchatter = new HipChatter(token);
}

HipClient.prototype.sendUserMessage =
  /**
   * This function is responsible for invoking the API described here:
   * https://www.hipchat.com/docs/apiv2/method/private_message_user
   */
  function(user, content, options, callback) {
    var optionsToUse = extend({ message: content }, options);
    debug('sendUserMessage');
    debug('user: "' + user + '"');
    debug('content: "' + content + '"');
    debug('options');
    debug(optionsToUse);
    this.hipchatter.send_private_message(user, optionsToUse, callback);
  };

HipClient.prototype.sendRoomMessage =
  /**
   * This function is responsible for invoking the API described here:
   * https://www.hipchat.com/docs/apiv2/method/send_room_notification
   */
  function(room, content, options, callback) {
    var optionsToUse = extend({ message: content }, options);
    debug('sendRoomMessage');
    debug('room: "' + room + '"');
    debug('content: "' + content + '"');
    debug('options');
    debug(optionsToUse);
    this.hipchatter.notify(room, optionsToUse, callback);
  };

function client(token) {
  function stdoutCallback(err, response) {
    if (err) {
      console.log('Problem: ' + err);
    }
    if (response) {
      console.log('Response: "' + response + '"');
    }
  }
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
