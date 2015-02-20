var looksLikeHtml = require('../../lib/html-util').looksLikeHtml;

describe('html-util', function() {
  describe('looksLikeHtml', function() {
    it('says strings with an <a are html', function() {
      var text = 'Check <a href="https://google.com">this out</a>';
      expect(looksLikeHtml(text)).toBe(true);
    });
    it('says strings with an <b> are html', function() {
      var text = 'Check <b>it</b> out!';
      expect(looksLikeHtml(text)).toBe(true);
    });
    it('says strings with a <table> are html', function() {
      var text = '<table><tr><td>1</td></tr></table>';
      expect(looksLikeHtml(text)).toBe(true);
    });
    it('says simple strings without tags are not html', function() {
      var text = 'Look, no tags!';
      expect(looksLikeHtml(text)).toBe(false);
    });
  });
});
