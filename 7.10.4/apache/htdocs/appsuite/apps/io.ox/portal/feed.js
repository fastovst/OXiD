define("io.ox/portal/feed",function(){"use strict";function t(t){this.options=_.extend({},t||{})}return t.prototype.load=function(t,n){var o,e="feed_callback_"+_.now(),r=this;return t&&(e+="_"+t),n&&(e+="_"+n),o=this.options.url+e,(n||t)&&(o=this.appendLimitOffset(o,t,n)),$.ajax({url:o,dataType:"jsonp",jsonp:!1,jsonpCallback:e}).then(function(t){return r.process(t)})},t.prototype.process=function(t){return t},t.prototype.appendLimitOffset=function(t){return t},t});