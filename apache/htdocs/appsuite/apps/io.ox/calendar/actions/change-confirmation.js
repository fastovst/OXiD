define("io.ox/calendar/actions/change-confirmation",["io.ox/calendar/api"],function(n){"use strict";return function(o,e){return((e=e||{}).api||n).checkConflicts(o).then(function(n){var o=new $.Deferred;return 0===n.length?o.resolve():(ox.load(["io.ox/calendar/conflicts/conflictList"]).done(function(e){e.dialog(n).on("cancel",function(){o.reject()}).on("ignore",function(){o.resolve()})}),o)})}});