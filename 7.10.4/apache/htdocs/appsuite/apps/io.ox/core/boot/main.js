define.async("io.ox/core/boot/main",["themes","gettext","io.ox/core/extensions","io.ox/core/extPatterns/stage","io.ox/core/boot/util","io.ox/core/boot/form","io.ox/core/boot/config"],function(o,e,n,t,i,r,s){"use strict";var a={guest:"useForm",guest_password:"useForm",anonymous_password:"useForm",reset_password:"useForm",message:"useForm",message_continue:"useForm"},u={start:function(o){o=o||{};var e=n.Baton({hash:_.url.hash(),logins:this});return t.run("io.ox/core/boot/login",e,{methodName:"login",beginAfter:o.after,softFail:!0}).then(function(){_.device("desktop")&&$('meta[name="viewport"]').remove()})},invoke:function(o){var e=a[o]||o;if(_.isFunction(this[e]))return i.debug("Using login type",e),this[e]();$("#io-ox-login-container").empty().append($('<div class="alert alert-info">').text("Unknown login type.")),$("#background-loader").fadeOut(250)},defaultLogin:function(){t.isRunning("io.ox/core/boot/login")||this.start({after:"autologin"})},useForm:function(){if(this.useForm=$.noop,!ox.serverConfig.forceHTTPS||"https:"===location.protocol||ox.debug){ox.on("language",function(o,e){ox.trigger("change:document:title",e.pgettext("word","Sign in"))}),e.setLanguage("en_US");var n=_.sanitize.option(_.url.hash("theme"))||ox.serverConfig.signinTheme||"login";i.debug("Load default language and theme ...",n),$.when(o.set(n),require(["io.ox/core/boot/i18n"])).done(function(){i.debug("Load default language and theme DONE."),r()})}else location.href="https:"+location.href.substring(location.protocol.length)},useToken:function(){require("io.ox/core/boot/login/token")()},useLocalStorage:function(){require("io.ox/core/boot/login/localStorage")()},useCookie:function(){return require("io.ox/core/boot/login/auto")()},propagateSession:function(){window.parent&&window.parent.postMessage(_.url.hash("session"),"*"),window.opener&&window.opener.postMessage(_.url.hash("session"),"*"),i.debug("Propagated session",_.url.hash("session"))}};return n.point("io.ox/core/boot/login").extend({id:"explicit",index:100,login:function(o){void 0!==o.hash.login_type&&(o.stopPropagation(),o.logins.invoke(o.hash.login_type))}},{id:"no-autologin",index:300,login:function(o){"false"===o.hash.autologin&&o.disable("io.ox/core/boot/login","autologin")}},{id:"default",index:1e12,login:function(o){o.logins.useForm()},relogin:function(){i.gotoSignin("login_type=useForm")}}),ox.once({"login:success":function(o){t.abortAll("io.ox/core/boot/login"),$("#background-loader").fadeIn(i.DURATION,function(){$("#io-ox-login-screen").hide().empty()});var e;require(["io.ox/core/boot/rampup"]).then(function(){return e=n.Baton({sessionData:o}),i.debug("loaded rampup namespace > running rampup phase"),t.run("io.ox/core/boot/rampup",e,{methodName:"fetch"})}).then(function(){return i.debug("finished rampup phase > getting boot/load namespace",ox.rampup),require(["io.ox/core/boot/load"])}).then(function(){return e=n.Baton(_.extend({},e,ox.rampup)),i.debug("running boot/load phase"),t.run("io.ox/core/boot/load",e)}).then(function(){i.checkTabHandlingSupport()&&require(["io.ox/core/api/tab"],function(o){o.propagate("propagateLogin",{session:ox.session,language:ox.language,theme:ox.theme,user:ox.user,user_id:ox.user_id,context_id:ox.context_id,exceptWindow:o.getWindowName(),storageKey:o.DEFAULT_STORAGE_KEYS.SESSION})})})},"login:fail":function(){t.isRunning("io.ox/core/boot/login")||u.start({after:"autologin"})},"login:fail:session-based":function(o){o.stopPropagation(),$(".throbber").hide(),$("#showstopper, #showstopper .session").show()}}),s.server().then(function(){return ox.manifests.loadPluginsFor("login")},function(o){return i.debug("Error while loading config from server",o),ox.trigger("server:down",o),$.Deferred().resolve()}).then(function(){return u})});