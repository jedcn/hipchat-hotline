//
// `hipchat-hotline` exists to take the execution environment (env,
// argv), determine intent from it, and then deliver a single message.
//
var debug = require('debug')('hotline'),
    client = require('./hip-client').client,
    heuristic = require('./hip-heuristic').heuristic;

function getTokenOrDie(env) {
  var envToUse = env || process.env;
  var token = envToUse['HIPCHAT_API_TOKEN'];
  if (!token) {
    console.log('You must set HIPCHAT_API_TOKEN to proceed');
    process.exit(1);
  }
  return token;
}

function sendMessage(client, argv) {
  var intended = heuristic(argv),
      recipient = intended.recipient(),
      content = intended.content(),
      options = intended.options();
  debug('Recipient: "' + recipient + '"');
  debug('Content: "' + content + '"');
  debug('Options: ');
  debug(options);
  if (intended.recipientType() == 'user') {
    client.sendUserMessage(recipient, content, options);
  } else {
    client.sendRoomMessage(recipient, content, options);
  }
}

function hotline(env, argv) {
  var token = getTokenOrDie(env);
  sendMessage(client(token), argv);
}

exports.hotline = hotline;
