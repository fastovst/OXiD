define("io.ox/multifactor/api",["io.ox/core/http","static/3rd.party/purify.min.js"],function(e,r){"use strict";function t(e){return e&&e.error?(require(["io.ox/core/notifications"],function(r){r.yell("error",e.error)}),console.error(e.error),e.error):e}function i(e){return!(!e||"AUTHENTICATION_DENIED"!==e.value)}return{getProviders:function(r){return $.when(e.GET({module:"multifactor/provider",params:{action:"all"},force:!0}).then(function(e){if(e){var i=[];return e.forEach(function(e){r&&e.backupProvider&&i.push(e),r||e.backupOnlyProvider||i.push(e)}),{providers:i}}t(e)}))},getDevices:function(i){var n=[];return $.when(e.GET({module:"multifactor/device",params:{action:"all"},force:!0}).then(function(e){if(_.isArray(e))return e.forEach(function(e){switch(e.name=r.sanitize(e.name)+"",i){case"BACKUP":e.backup&&n.push(e);break;case"APP":e.trustedApplicationDevice&&n.push(e);break;default:e.trustedApplicationDevice||e.backup||n.push(e)}}),n;t(e)},function(e){return t(e),$.Deferred().reject(e)}))},deleteDevice:function(r,i){var n=$.Deferred();return e.PUT({module:"multifactor/device",params:{action:"delete",providerName:r,deviceId:i}}).then(function(e){e&&e.error&&n.reject(t(e)),n.resolve(e)},n.reject),n},editDevice:function(r,i,n){var o=$.Deferred();return e.PUT({module:"multifactor/device",params:{action:"rename",providerName:r,deviceId:i},data:{name:n,providerName:r,id:i}}).then(function(e){e&&e.error&&o.reject(t(e)),o.resolve(e)},o.reject),o},beginAuth:function(r,t){return $.when(e.PUT({module:"multifactor/device",params:{action:"startAuthentication",deviceId:t,providerName:r},force:!0}))},beginRegistration:function(r,i,n,o){return $.when(e.PUT({module:"multifactor/device",params:{action:"startRegistration"},data:{providerName:r,name:i,backup:n,parameters:o}})).then(t,t)},finishRegistration:function(r,t,i,n){return $.when(e.PUT({module:"multifactor/device",params:_.extend({action:"finishRegistration",providerName:r,deviceId:t},n),data:i}))},doAuth:function(r,n,o,a){var c=$.Deferred(),u=_.extend({secret_code:o},a);return e.PUT({module:"multifactor/device",params:{action:"finishAuthentication",deviceId:n,providerName:r},data:u,force:!0}).then(function(e){e&&e.error&&c.reject(t(e)),i(e)?c.reject(e):c.resolve(e)},c.reject),c}}});