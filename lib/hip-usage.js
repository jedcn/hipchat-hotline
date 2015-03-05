function printHelp(out) {
  var log = out ? out.log : console.log;
  log('Usage: hipchat-hotline <recipient> <msg>');
  log('  Options');
  log('    When sending to either user or room:');
  log('      --message-format text | html');
  log('      --notify         false | true');
  log('    When sending to a room:');
  log('      --color          yellow | green | red | gray | purple');
}

function usage(argv) {
  var minArgs = require('minimist')(argv.slice(2));
  return {
    wantVersion: function() {
      return !! minArgs.version;
    },
    wantHelp: function() {
      return !! minArgs.help;
    },
    needHelp: function() {
      return minArgs._.length < 2;
    },
    printHelp: printHelp
  };
}

module.exports = usage;
