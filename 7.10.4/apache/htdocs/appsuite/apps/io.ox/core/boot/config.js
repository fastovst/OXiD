define("io.ox/core/boot/config",["io.ox/core/boot/util","io.ox/core/http","io.ox/core/manifests","io.ox/core/capabilities"],function(e,r,o,i){"use strict";function n(e,r){!r&&u||(u=r,ox.serverConfig=e||{},ox.rampup&&ox.rampup.errors&&ox.rampup.errors["MSG-0113"]&&(ox.serverConfig.capabilities=_.filter(ox.serverConfig.capabilities,function(e){return"webmail"!==e.id})),_.isArray(ox.serverConfig.languages)&&(ox.serverConfig.languages=_(ox.serverConfig.languages).object()),i.reset(),o.reset(),ox.trigger("server:up"))}function s(o){var i;return"user"===o&&(i=ox.rampup.serverConfig)?(n(i,"user"===o),$.when(i)):(e.debug("Load config ("+o+") ... "),r.GET({module:"apps/manifests",params:{action:"config"},appendSession:"user"===o,failOnError:!0}).done(function(r){n(r,"user"===o),e.debug("Load config ("+o+") DONE",r)}))}var u=!1;return{server:_.memoize(function(){return s("server")}),user:_.memoize(function(){return s("user")})}});