var rewire = require('rewire');

var hipchatHotline = rewire('../../lib/hipchat-hotline');
var hotline = hipchatHotline.hotline;

describe('hipchat-hotline', function() {

  var mockClientInstance = {
    sendUserMessage: function() {},
    sendRoomMessage: function() {}
  };

  hipchatHotline.__set__('client', function() { return mockClientInstance; });

  describe('hotline', function() {

    var exampleUser = 'user@company.com',
        exampleRoom = 'Robot Workshop',
        exampleTextMessage = 'It worked',
        exampleHtmlMessage = 'It <b>really</b> worked',
        htmlMessageToRoomArgv = [ 'node',
                                  '/projects/hipchat-hotline/bin/hchl',
                                  exampleRoom,
                                  exampleHtmlMessage ],
        textMessageToUserArgv = [ 'node',
                                  '/projects/hipchat-hotline/bin/hchl',
                                  '--notify',
                                  'false',
                                  '--color',
                                  'red',
                                  exampleUser,
                                  exampleTextMessage ];

    describe('getting a token from the env', function() {
      var setToken, mockProcess, mockConsole;
      var revertClient, revertProcess, revertConsole;

      beforeEach(function() {
        revertClient = hipchatHotline.__set__('client', function(token) {
          setToken = token;
          return mockClientInstance;
        });
        mockProcess = {
          exit: function() {}
        };
        mockConsole = {
          log: function() {}
        };
        revertProcess = hipchatHotline.__set__('process', mockProcess);
        revertConsole = hipchatHotline.__set__('console', mockConsole);
      });

      afterEach(function() {
        revertClient();
        revertProcess();
        revertConsole();
      });

      it('gets HIPCHAT_API_TOKEN and passes it along', function() {
        hotline({'HIPCHAT_API_TOKEN': 'token'}, htmlMessageToRoomArgv);
        expect(setToken).toEqual('token');
      });

      it('prints and exits if it cannot get HIPCHAT_API_TOKEN', function() {
        spyOn(mockConsole, 'log');
        spyOn(mockProcess, 'exit');
        hotline({'MISSING_HIPCHAT_API_TOKEN': 'token'}, htmlMessageToRoomArgv);
        expect(mockProcess.exit)
          .toHaveBeenCalledWith(1);
        expect(mockConsole.log)
          .toHaveBeenCalledWith('You must set HIPCHAT_API_TOKEN to proceed');
      });
    });

    describe('sending to a room', function() {
      it('parses argv and sends a message', function() {
        spyOn(mockClientInstance, 'sendRoomMessage');
        hotline({'HIPCHAT_API_TOKEN': 'token'}, htmlMessageToRoomArgv);
        expect(mockClientInstance.sendRoomMessage)
          .toHaveBeenCalledWith(exampleRoom,
                                exampleHtmlMessage,
                                jasmine.objectContaining({
                                  'notify': true,
                                  'color': 'green',
                                  'message-format': 'html'
                                }));
      });
    });

    describe('sending to a user', function() {
      it('parses argv and sends a message', function() {
        spyOn(mockClientInstance, 'sendUserMessage');
        hotline({'HIPCHAT_API_TOKEN': 'token'}, textMessageToUserArgv);
        expect(mockClientInstance.sendUserMessage)
          .toHaveBeenCalledWith(exampleUser,
                                exampleTextMessage,
                                jasmine.objectContaining({
                                  'notify': false,
                                  'color': 'red',
                                  'message-format': 'text'
                                }));
      });
    });
  });
});
