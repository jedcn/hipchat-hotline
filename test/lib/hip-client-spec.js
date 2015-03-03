var rewire = require('rewire'),
    extend = require('amp-extend');

describe('hip-client', function() {
  describe('passing messages to hipchatter client', function() {

    // Methods aren't important here-- instead this is created so that
    // we have something to spy on.
    var mockHipChatterInstance = {
      send_private_message: function() {},
      notify: function() {}
    };

    var injectedConstructor = function() {
      return mockHipChatterInstance;
    };

    var hipClientModule = rewire('../../lib/hip-client');
    var client = hipClientModule.client;

    hipClientModule.__set__('HipChatter', injectedConstructor);

    var hipClient = client('UNIMPORTANT_API_TOKEN');

    var exampleUser = 'exampleUser',
        exampleRoom = 'exampleRoom',
        exampleOptions = {
          'message_format': 'text',
          'notify': false
        },
        exampleMessage = 'sampleMessage';

    describe('sendUserMessage', function() {
      it('works with HipChatter#send_private_message', function() {
        spyOn(mockHipChatterInstance, 'send_private_message');
        hipClient.sendUserMessage(exampleUser, exampleMessage, exampleOptions);
        var expectedOptions = extend({},
                                     { 'message': exampleMessage },
                                     exampleOptions);
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
        var expectedOptions = extend({},
                                     { 'message': exampleMessage },
                                     exampleOptions);
        expect(mockHipChatterInstance.notify)
          .toHaveBeenCalledWith(exampleRoom,
                                expectedOptions,
                                jasmine.any(Function));
      });
    });
  });

  describe('resolution + rejection of returned promises', function() {

    // Methods are important here-- one pretends the HipChatter
    // invocation always fails, the other always succeeds.
    var error = new Error('Failure'),
        successfulResponse = '',
        alwaysFails = function(to, opts, callback) {
          callback(error);
        },
        alwaysSucceeds = function(to, opts, callback) {
          callback(null, successfulResponse);
        },
        mockHipChatterInstance = {
          // sendUserMessage
          send_private_message: alwaysFails,
          // sendRoomMessage
          notify: alwaysSucceeds
        },
        injectedConstructor = function() {
          return mockHipChatterInstance;
        },
        hipClientModule = rewire('../../lib/hip-client'),
        client = hipClientModule.client;

    hipClientModule.__set__('HipChatter', injectedConstructor);

    var hipClient = client('UNIMPORTANT_API_TOKEN');

    describe('successful resolution', function() {
      it('returns the response from HipChatter', function() {
        hipClient
          .sendRoomMessage('to', 'msg', {})
          .done(function(result) {
            expect(result).toEqual(successfulResponse);
          }, function() {
            expect(true).toEqual(false);
          });
      });
    });

    describe('unsuccessful rejection', function() {
      it('returns the Error from HipChatter', function() {
        hipClient
          .sendUserMessage('to', 'msg', {})
          .done(function() {
            expect(true).toEqual(false);
          }, function(error) {
            expect(error).toEqual(error);
          });
      });
    });
  });
});
