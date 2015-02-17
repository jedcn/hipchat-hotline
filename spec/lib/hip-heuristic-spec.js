var heuristic = require("../../lib/hip-heuristic").heuristic;

describe("hip-heuristic", function() {

  var sampleArgvForUserMessage = [ 'node',
                                   '/projects/hipchat-hotline/bin/hchl',
                                   'you@company.com',
                                   'Hi' ],

      sampleArgvForRoomMessage = [ 'node',
                                   '/projects/hipchat-hotline/bin/hchl',
                                   'Robot Workshop',
                                   'It worked' ],

      manyOptionArgvForRoomMessage = [ 'node',
                                       '/projects/hipchat-hotline/bin/hchl',
                                       'Robot Workshop',
                                       '--color',
                                       'random',
                                       '--message-format',
                                       'html',
                                       '--notify',
                                       'false',
                                       'It worked' ];

  describe("recipient", function() {
    it("grabs the first non-option argument", function() {
      var result = heuristic(sampleArgvForUserMessage);
      expect(result.recipient()).toEqual('you@company.com');

      result = heuristic(sampleArgvForRoomMessage);
      expect(result.recipient()).toEqual('Robot Workshop');
    });
  });

  describe("recipientType", function() {
    it("is user for things that look like '@UserName'", function() {
      var result = heuristic([ 'node',
                               '/projects/hipchat-hotline/bin/hchl',
                               '@UserName',
                               'Hi' ]);
      expect(result.recipientType()).toEqual('user');
    });
    it("is user for email addresses", function() {
      var result = heuristic(sampleArgvForUserMessage);
      expect(result.recipientType()).toEqual("user");
    });
    it("is room for everything else", function() {
      var result = heuristic(sampleArgvForRoomMessage);
      expect(result.recipientType()).toEqual("room");
    });
  });

  describe("options", function() {
    it("returns defaults", function() {
      var result= heuristic(sampleArgvForUserMessage);
      var options = result.options();
      expect(options["message-format"]).toEqual('text');
      expect(options["notify"]).toBe(true);
      expect(options["color"]).toBe("green");
    });

    it("supports --notify", function() {
      var result = heuristic([ 'node',
                               '/projects/hipchat-hotline/bin/hchl',
                               'Robot Workshop',
                               '--notify',
                               'false',
                               'It worked' ]);
      expect(result.options()["notify"]).toBe(false);
    });
    it("supports --color", function() {
      var result = heuristic([ 'node',
                               '/projects/hipchat-hotline/bin/hchl',
                               'Robot Workshop',
                               '--color',
                               'random',
                               'It worked' ]);
      expect(result.options()["color"]).toBe("random");
    });
    it("supports --message-format", function() {
      var result = heuristic([ 'node',
                               '/projects/hipchat-hotline/bin/hchl',
                               'Robot Workshop',
                               '--message-format',
                               'html',
                               'It worked' ]);
      expect(result.options()["message-format"]).toBe("html");
    });
    it("supports everything jumbled together", function() {
      var result = heuristic(manyOptionArgvForRoomMessage);
      var options = result.options();
      expect(options["message-format"]).toBe("html");
      expect(options["color"]).toBe("random");
      expect(options["notify"]).toBe(false);
    });
  });
  describe("content", function() {
    it("returns the String after the recipient and the options", function() {
      var result = heuristic(manyOptionArgvForRoomMessage);
      expect(result.content()).toEqual('It worked');
    });
    it("returns all of the text after the recipient and the options", function() {
      var result = heuristic([ 'node',
                               '/projects/hipchat-hotline/bin/hchl',
                               'you@company.com',
                               '--color',
                               'random',
                               '--message-format',
                               'html',
                               '--notify',
                               'false',
                               'Oh',
                               'man,',
                               'this',
                               'is',
                               'crazy' ]);
      expect(result.content()).toEqual('Oh man, this is crazy');
    });
  });
});
