define("io.ox/multifactor/login/error_handler",["io.ox/core/http"],function(o){"use strict";ox.on("http:error",function(e){/(MFA-0001|MFA-0015)/i.test(e.code)&&(o.disconnect(),require(["io.ox/multifactor/auth"],function(t){t.reAuthenticate().then(function(){o.reconnect()},function(){/^MFA-0001/i.test(e.code)?(console.error("MF login failed, reload required"),ox.session="",o.resetDisconnect(e),ox.relogin(),location.reload()):o.reconnect()})}))})});