

var IntlRelativeFormat = window.IntlRelativeFormat = require('intl-relativeformat');
var IntlMessageFormat = require('intl-messageformat');

require('intl-relativeformat/dist/locale-data/en.js');
require('intl-relativeformat/dist/locale-data/es.js');

var es = require('./es');
var en = require('./en-US');
var it = require('./it');

var MESSAGES = {};
MESSAGES.es = es;
MESSAGES['en-US'] = en;
MESSAGES.it = it;

var locale = localStorage.locale || 'es';

module.exports = {
  message: function (text, opts) {
    opts = opts || {};
    var msg = new IntlMessageFormat(MESSAGES[locale][text], locale, null);
    return msg.format(opts); 
  },
  date: new IntlRelativeFormat(locale)
}