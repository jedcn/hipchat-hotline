var reduce = require('amp-reduce'),
    ALLOWED_TAGS = [ 'a',
                     'b',
                     'i',
                     'strong',
                     'em',
                     'br',
                     'img',
                     'pre',
                     'code',
                     'ul',
                     'ol',
                     'li',
                     'table',
                     'tr',
                     'td' ];

function looksLikeHtml(s) {
  return reduce(ALLOWED_TAGS, function(memo, value) {
    return memo || s.indexOf('<' + value) >= 0;
  }, false);
}

exports.looksLikeHtml = looksLikeHtml;
