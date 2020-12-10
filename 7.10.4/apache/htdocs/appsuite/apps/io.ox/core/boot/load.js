define("io.ox/core/boot/load",["themes","gettext","io.ox/core/extensions","io.ox/core/boot/config","io.ox/core/boot/util","io.ox/core/session","io.ox/core/http","settings!io.ox/core","io.ox/core/capabilities","io.ox/core/manifests","io.ox/core/sockets","io.ox/core/locale","io.ox/core/moment"],function(e,o,t,n,i,a,r,c,u,l,s,d){"use strict";function g(){_.device.cache={};var o=_.sanitize.option(_.url.hash("theme"))||c.get("theme")||"default",t=e.set(o);return i.debug("Load UI > require [core/main] and set theme",o),t.catch(f.bind(null,o))}function f(o){function t(){console.error("Could not load default theme"),ox.trigger("boot:fail")}return i.debug("Loading theme failed",o),"default"===o?t():(console.error("Could not load custom theme",o),e.set("default").catch(t))}function m(){var e=$.Deferred();return require(["io.ox/multifactor/auth","io.ox/multifactor/login/loginScreen"],function(o,t){t.create(),o.doAuthentication().then(function(){t.destroy(),a.rampup().then(function(){e.resolve()})},function(o){console.error(o),console.error("Failed multifactor login. Reloading"),a.logout().always(function(){window.location.reload(!0),e.reject()})})}),e}function h(e){if(u.has("webmail")&&e.get("features/prefetchOnBoot",!0)){var o=r.defaultColumns.mail;if(e.get("features/textPreview",!0)&&(o.unseen+=",662",o.all+=",662",o.search+=",662"),e.get("features/authenticity",!1)&&(o.unseen+=",664",o.all+=",664",o.search+=",664"),"io.ox/mail/main"===c.get("autoStart")){var t="default0/INBOX",n=e.get(["viewOptions",t,"sort"],610);if("from-to"!==n){var i=!!e.get("threadSupport",!0)&&e.get(["viewOptions",t,"thread"],!0),a={action:i?"threadedAll":"all",folder:t,categoryid:"general",columns:o.all,sort:n,order:e.get(["viewOptions",t,"order"],"desc"),includeSent:!0,max:300,timezone:"utc",limit:"0,"+e.get("listview/primaryPageSize",50),deleted:!e.get("features/ignoreDeleted",!1)};!_.device("smartphone")&&u.has("mail_categories")&&e.get("categories/enabled")||delete a.categoryid,i||(delete a.includeSent,delete a.max),r.GET({module:"mail",params:a}).done(function(e){ox.rampup["mail/"+_.cacheKey(a)]=e})}}}}function p(){s.getSocket().done(function(e){if(u.has("webmail")&&e.on("ox:mail:new",function(e){try{ox.websocketlog.push({timestamp:_.now(),date:moment().format("D.M.Y HH:mm:ss"),event:"ox:mail:new",data:{folder:e.folder,id:e.id}})}catch(e){console.log(e)}ox.trigger("socket:mail:new",e)}),u.has("calendar")){var o=[],t=_.throttle(function(){var e={folders:_(o).chain().pluck("folders").flatten().compact().unique().value(),invitations:_(o).chain().pluck("needsAction").flatten().compact().unique(function(e){return e.id+"."+e.folder+"."+e.recurrenceId}).value()};ox.trigger("socket:calendar:updates",e),o=[]},1e4);e.on("ox:calendar:updates",function(e){try{ox.websocketlog.push({timestamp:_.now(),date:moment().format("D.M.Y HH:mm:ss"),event:"ox:calendar:updates",data:{folders:e.folders,invitations:e.needsAction}})}catch(e){console.log(e)}o.push(e),t()})}})}t.point("io.ox/core/boot/load").extend([{id:"user_config",run:function(){return n.user()}},{id:"i18n",run:function(e){var t=d.deriveSupportedLanguageFromLocale(e&&e.sessionData&&e.sessionData.language||ox.locale);return e.sessionData&&a.set(e.sessionData),ox.trigger("change:document:title"),i.debug("Load UI > load i18n plugins and set current locale",ox.locale),ox.signin=!1,_.device.cache={},ox.language=t,$.when(require([ox.base+"/precore.js"]),o.setLanguage(t),l.manager.loadPluginsFor("i18n")).then(function(){i.debug("Load UI > current locale and i18n plugins DONE."),o.enable()})}},{id:"locale",run:function(){return require(["io.ox/core/locale"])}},{id:"warnings",run:function(){require(["io.ox/core/boot/warning"]).then(function(){t.point("io.ox/core/boot/warning").invoke("draw")})}},{id:"tabHandling",run:function(){i.debug('Load "tabHandling"'),require(["io.ox/core/api/tab"]).then(function(e){return i.checkTabHandlingSupport()?e.enable():e.disable()})}},{id:"multifactor",run:function(e){if(e.sessionData&&e.sessionData.requires_multifactor)return g().then(m)}},{id:"compositionSpaces",run:function(){ox.rampup.compositionSpaces=$.when(r.GET({url:"api/mail/compose",params:{action:"all",columns:"subject"}}),require(["gettext!io.ox/mail"])).then(function(e,o){return(_(e).first()||[]).map(function(e){return{description:o("Mail: %1$s",e.subject||o("No subject")),floating:!0,id:e.id+Math.random().toString(16),keepOnRestore:!1,module:"io.ox/mail/compose",point:e.id,timestamp:(new Date).valueOf(),ua:navigator.userAgent}})}).catch(function(e){ox.debug&&console.error(e)})}},{id:"load",run:function(){i.restore(),i.cleanUp(),require(["settings!io.ox/mail"]).then(h),p();var e=l.manager.loadPluginsFor("core").then(function(){return require(["io.ox/core/main"])});return $.when(e,g()).then(function(e){i.debug("DONE!"),ox.trigger("boot:done"),$("#io-ox-login-password").val(""),e.launch()},function(e){console.error("Cannot launch core!",e),ox.trigger("boot:fail")})}}])});