define("io.ox/core/relogin",["io.ox/core/extensions","io.ox/core/session","io.ox/core/notifications","io.ox/core/capabilities","io.ox/core/boot/util","io.ox/backbone/views/modal","gettext!io.ox/core","settings!io.ox/core"],function(e,o,n,i,r,t,s,a){"use strict";function c(e){return s(e&&"SES-0205"===e.code?"Your IP address has changed":"Your session is expired")}function u(){var e=i.has("guest")?a.get("customLocations/guestLogin")||ox.serverConfig.guestLoginLocation:a.get("customLocations/login")||ox.serverConfig.loginLocation;return _.url.vars(e||ox.loginLocation||"")}function l(){var e=i.has("guest")?a.get("customLocations/guestLogout")||ox.serverConfig.guestLogoutLocation:a.get("customLocations/logout")||ox.serverConfig.logoutLocation;return _.url.vars(e||ox.logoutLocation||"")}function g(){_.url.redirect(u())}function d(){_.url.redirect(l())}function f(e){var o=$.Deferred();return new t({async:!0,enter:"relogin",backdrop:"static",focus:"input",title:c(e),point:"io.ox/core/relogin"}).build(function(){this.$el.addClass("relogin")}).on("open",function(){$("html").addClass("relogin-required"),$("#io-ox-core").addClass("blur")}).on("relogin:continue",function(){o.resolve({reason:"relogin:continue"})}).on("relogin:success",function(){o.resolve({reason:"relogin:success"})}).open(),o.done(function(){$("html").removeClass("relogin-required"),$("#io-ox-core").removeClass("blur")})}function x(o,n,i){if(ox.online)if(h)o&&n&&p.push({request:o,deferred:n});else{p=o&&n?[{request:o,deferred:n}]:[],h=!0;var r=require("io.ox/core/extPatterns/stage"),t=e.Baton.ensure({error:i,reloginState:"pending"});r.run("io.ox/core/boot/login",t,{methodName:"relogin"}).then(function(){if("success"===t.data.reloginState){for(var e,o=0,n=require("io.ox/core/http");e=p[o];o++)e.request.noRetry||n.retry(e.request).done(e.deferred.resolve).fail(e.deferred.fail);h=!1}})}}e.point("io.ox/core/relogin").extend({id:"default",render:function(){this.$body.append($("<div>").text(s("You have to sign in again"))),this.addButton({action:"ok",label:s("Ok")}),this.on("ok",function(){this.trigger("relogin:continue")})}},{id:"password",index:100,render:function(e){if(a.get("features/reloginPopup",!ox.serverConfig.oidcLogin&&!ox.serverConfig.samlLogin)&&!i.has("guest && anonymous")){var r=_.uniqueId("form-control-label-");this.$header.append($("<div>").text(s("Please sign in again to continue"))),this.$body.append($("<label>").attr("for",r).text(s("Password")),$('<input type="password" name="relogin-password" class="form-control">').attr("id",r)),this.addButton({className:"btn-default",label:s("Cancel"),placement:"left",action:"cancel"}).addButton({action:"relogin",label:s("Sign in")}).on("cancel",function(){ox.trigger("relogin:cancel"),d()}).on("relogin",function(){var e=this.busy();o.login({name:ox.user,password:this.$body.find("input").val(),rampup:!1,staySignedIn:ox.secretCookie}).then(function(){n.yell("close"),e.$body.find("input").val(""),e.trigger("relogin:success"),e.close()},function(o){"LGI-0006"===o.code&&(o.error=s("Please enter correct password")),n.yell({headline:s("Failed to sign in"),type:"error",message:o.error}),e.idle(),e.$body.find("input").focus().select(),e.trigger("relogin:fail",o)})}),e.preventDefault()}}}),e.point("io.ox/core/boot/login").replace({id:"default",relogin:function(e){if("success"!==e.data.reloginState)return g();r.checkTabHandlingSupport()&&require(["io.ox/core/api/tab"],function(e){e.propagate("propagateLogin",{session:ox.session,language:ox.language,theme:ox.theme,user:ox.user,user_id:ox.user_id,context_id:ox.context_id,relogin:!0,exceptWindow:e.getWindowName(),storageKey:e.DEFAULT_STORAGE_KEYS.SESSION})})}}),e.point("io.ox/core/boot/login").extend({id:"userPrompt",index:5e3,relogin:function(e){return f(e.data.error).then(function(o){o&&"relogin:success"===o.reason&&(e.data.reloginState="success")})}});var p=[],h=!1;return ox.off("relogin:required",ox.relogin),ox.on("relogin:required",x),x});