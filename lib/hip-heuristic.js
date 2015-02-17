function parseArgs(argv) {
  var parserOptions = {
    'boolean': [ 'notify' ],
    'default': {
      'notify': true,
      'message-format': 'text',
      'color': 'green'
    }
  };
  return require('minimist')(argv.slice(2), parserOptions);
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
      return require('amp-extend')({}, parsed);
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
