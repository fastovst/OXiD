define("io.ox/core/async",function(){"use strict";function e(e){return!!e&&(e.done&&e.fail&&e.always)}function n(){return 0===arguments.length?$.when():1===arguments.length?e(arguments[0])?arguments[0]:$.Deferred().resolve(arguments[0]):$.when.apply($,_(arguments).map(n))}return{defer:n}});