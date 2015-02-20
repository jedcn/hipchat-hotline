var rewire = require('rewire'),
    extend = require('amp-extend');

var hipClientModule = rewire('../../lib/hip-client');
var client = hipClientModule.client;

describe('hip-client', function() {

  var injectedConstructor = function(token) {
    return mockHipChatterInstance;
  };

  hipClientModule.__set__('HipChatter', injectedConstructor);

  var mockHipChatterInstance = {
    send_private_message: function() {},
    notify: function() {}
  };

  var hipClient = client('UNIMPORTANT_API_TOKEN');

  var exampleUser = 'exampleUser',
      exampleRoom = 'exampleRoom',
      exampleOptions = {
        'message_format': 'text',
        'notify': false
      },
      exampleMessage = 'sampleMessage';

  describe('sendDirectMessage', function() {
    it('works with HipChatter#send_private_message', function() {
      spyOn(mockHipChatterInstance, 'send_private_message');
      hipClient.sendDirectMessage(exampleUser, exampleMessage, exampleOptions);
      var expectedOptions = extend({}, { 'message': exampleMessage }, exampleOptions);
      expect(mockHipChatterInstance.send_private_message)
        .toHaveBeenCalledWith(exampleUser,
                              expectedOptions,
                              jasmine.any(Function));
    });
  });

  describe('sendRoomMessage', function() {
    it('works with HipChatter#notify', function() {
      spyOn(mockHipChatterInstance, 'notify');
      hipClient.sendRoomMessage(exampleRoom, exampleMessage, exampleOptions);
      var expectedOptions = extend({}, { 'message': exampleMessage }, exampleOptions);
      expect(mockHipChatterInstance.notify)
        .toHaveBeenCalledWith(exampleRoom,
                              expectedOptions,
                              jasmine.any(Function));
    });
  });
});
