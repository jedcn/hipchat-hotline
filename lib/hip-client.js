var extend = require('amp-extend'),
    HipChatter = require('hipchatter');

function HipClient(token) {
  this.hipchatter = new HipChatter(token);
}

HipClient.prototype.sendDirectMessage =
  function(user, content, options, callback) {
    // https://www.hipchat.com/docs/apiv2/method/private_message_user
    var optionsToUse = extend({ message: content }, options);
    this.hipchatter.send_private_message(user, optionsToUse, callback);
  };

HipClient.prototype.sendRoomMessage =
  function(room, content, options, callback) {
    // https://www.hipchat.com/docs/apiv2/method/send_room_notification
    var optionsToUse = extend({ message: content }, options);
    this.hipchatter.notify(room, optionsToUse, callback);
  };

function client(token) {
  var hipClient = new HipClient(token);
  function stdoutCallback(err, response) {
    if (err) {
      console.log('Problem: ' + err);
    }
    if (response) {
      console.log('Response: "' + response + '"');
    }
  }
  return {
    sendDirectMessage: function(user, content, options) {
      hipClient.sendDirectMessage(user, content, options, stdoutCallback);
    },
    sendRoomMessage: function(room, content, options) {
      hipClient.sendRoomMessage(room, content, options, stdoutCallback);
    }
  };
}

exports.client = client;
