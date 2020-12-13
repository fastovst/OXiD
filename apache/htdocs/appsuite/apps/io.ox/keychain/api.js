define("io.ox/keychain/api",["io.ox/core/extensions","io.ox/core/http","gettext!io.ox/keychain"],function(e,t,n){"use strict";function r(e,t){return e.index-t.index}function o(){a.submodules={},i=[],e.point("io.ox/keychain/api").each(function(e){i.push(e)}),i.sort(r),_.each(i,function(e){a.submodules[e.id]=e,e.invoke("init"),e.on&&!e.isInitialized&&(e.on("triggered",function(){var t=$.makeArray(arguments);t.shift(),t.length>1&&(t[1].accountType=e.id),a.trigger.apply(a,t)}),e.isInitialized=!0),e.trigger("initialized")})}function c(e,t){var n=a.submodules[e];if(!n)throw new Error("I do not know keys of accountType "+e+"! I suppose a needed plugin was not registered in the server configuration.");return n.invoke.apply(n,[t,n].concat($.makeArray(arguments).slice(2)))}var i,a=_.extend({},Backbone.Events);return o(),e.point("io.ox/keychain/api").on("extended",o),a.getAll=function(){var e=[];return _(a.submodules).each(function(t){e=e.concat(c(t.id,"getAll"))}),e},a.get=function(e,t){return c(e,"get",t)},a.getStandardAccount=function(e){return c(e,"getStandardAccount")},a.hasStandardAccount=function(e){return c(e,"hasStandardAccount")},a.getOrCreateStandardAccountInteractively=function(e,t){if(!a.hasStandardAccount(e))return a.createInteractively(e,t)},a.createInteractively=function(e){return c.apply(this,[e,"createInteractively"].concat($.makeArray(arguments).slice(1)))},a.remove=function(e){return e.attributes&&(e=e.toJSON()),c(e.accountType,"remove",e).always(function(){require(["io.ox/core/folder/api"],function(e){ox.trigger("account:delete"),e.propagate("account:delete")})})},a.update=function(e){return e.attributes&&(e=e.toJSON()),c(e.accountType,"update",e)},a.isEnabled=function(e){return!!a.submodules[e]},a.accountType=function(e){return a.submodules[e]},a.checkSecrets=function(){return t.GET({module:"recovery/secret",params:{action:"check"}})},a.migrateFromOldSecret=function(e){return t.POST({module:"recovery/secret",data:{action:"migrate",password:e}})},a.cleanUp=function(){return t.GET({module:"recovery/secret",params:{action:"clean_up"}})},a.cleanUpIrrecoverableItems=function(){return t.GET({module:"recovery/secret",params:{action:"remove"}}).done(function(){ox.cache.clear(),require(["io.ox/core/notifications"],function(e){e.yell("success",n("The unrecoverable items have been cleaned up successfully. Please refresh this page to see the changes."))})})},a});