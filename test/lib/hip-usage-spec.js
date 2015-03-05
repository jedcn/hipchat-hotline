var usage = require('../../lib/hip-usage');

describe('hip-usage', function() {

  var usageForMessage = usage(['node',
                                '/usr/local/bin/hipchat-hotline',
                                'you@company.com',
                                'Hi']),

      usageForHelp = usage(['node',
                            '/usr/local/bin/hipchat-hotline',
                            '--help']),

      usageForVersion = usage(['node',
                               '/usr/local/bin/hipchat-hotline',
                               '--version']),

      usageThatsConfused = usage(['node',
                                  '/usr/local/bin/hipchat-hotline']);

  describe('wantHelp()', function() {
    it('is true when --help is present', function() {
      expect(usageForHelp.wantHelp()).toBe(true);
      expect(usageForMessage.wantHelp()).toBe(false);
      expect(usageForVersion.wantHelp()).toBe(false);
      expect(usageThatsConfused.wantHelp()).toBe(false);
    });
  });

  describe('needHelp()', function() {
    it('is true when no args are offered', function() {
      expect(usageThatsConfused.needHelp()).toBe(true);
    });
  });

  describe('printHelp()', function() {
    it('it prints usage info', function() {
      var mockConsole = {
        log: function() {}
      };
      spyOn(mockConsole, 'log');
      usageForHelp.printHelp(mockConsole);
      expect(mockConsole.log).toHaveBeenCalled();
      var firstCallArgs = mockConsole.log.calls.argsFor(0);
      expect(firstCallArgs)
        .toEqual(['Usage: hipchat-hotline <recipient> <msg>']);
    });
  });

  describe('wantVersion()', function() {
    it('is true if --version is present', function() {
      expect(usageForVersion.wantVersion()).toBe(true);
      expect(usageForHelp.wantVersion()).toBe(false);
      expect(usageForMessage.wantVersion()).toBe(false);
      expect(usageThatsConfused.wantVersion()).toBe(false);
    });
  });
});
