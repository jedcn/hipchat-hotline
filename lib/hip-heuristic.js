//
// `hip-hueristic` exists to interpret command line parameters.
//
// This includes some guess work (is a message text or html? Is it
// meant for a user or a room?) and that's where the word 'heuristic'
// comes from.
//
var extend = require('amp-extend'),
    looksLikeHtml = require('./html-util').looksLikeHtml;

function parseArgs(argv) {
  var options = {
    'boolean': [ 'notify' ],
    'default': {
      'notify': true,
      'message-format': 'NOT_SET',
      'color': 'green'
    },
    'alias': {
      'message-format': 'message_format',
    }
  };
  return require('minimist')(argv.slice(2), options);
}

function newMessageFormat(original, value) {
  var setBothKeys = {
    'message-format': value,
    'message_format': value
  };
  return extend({}, original, setBothKeys);
}

function tweakParsedOptions(content, original) {
  var newFormat,
      noExplicitFormat = original['message-format'] === 'NOT_SET';
  if (noExplicitFormat) {
    if (looksLikeHtml(content)) {
      newFormat = 'html';
    } else {
      newFormat = 'text';
    }
  } else {
    newFormat = original['message-format'];
  }
  return newMessageFormat(original, newFormat);
}

// Examine arguments, and return an object with functions that
// interprets them.
function heuristic(argv) {
  var parsed = parseArgs(argv),
      nonOptionArgs = parsed['_'];
  var publicAPI = {
    recipient: function() {
      return nonOptionArgs[0];
    },
    options: function() {
      var content = this.content();
      return tweakParsedOptions(content, parsed);
    },
    recipientType: function() {
      if (this.recipient().indexOf('@') > -1) {
        return 'user';
      }
      return 'room';
    },
    content: function() {
      var contentArgs = nonOptionArgs.slice(1);
      return contentArgs.join(' ');
    }
  };
  return publicAPI;
}

exports.heuristic = heuristic;
