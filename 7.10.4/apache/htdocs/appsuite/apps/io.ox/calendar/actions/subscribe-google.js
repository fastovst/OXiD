define("io.ox/calendar/actions/subscribe-google",["io.ox/core/capabilities","io.ox/oauth/backbone","io.ox/oauth/keychain","io.ox/core/folder/api","io.ox/core/yell","gettext!io.ox/calendar"],function(e,o,n,a,c,r){"use strict";function i(e){var i=new o.Account.Model({serviceId:e.id,displayName:n.chooseDisplayName(e)});return i.enableScopes("calendar_ro").save().then(function(){return a.create("1",{module:"event",title:r("My Google Calendar"),"com.openexchange.calendar.provider":"google","com.openexchange.calendar.config":{oauthId:i.id}})}).then(function(e){c("success",r("Account added successfully"));var o=n.accounts.get(e["com.openexchange.calendar.config"].oauthId);o&&o.fetch()})}return function(){if(!e.has("calendar_google"))return console.error('Cannot add google calendar due to missing capability "calendar_google"');var o=n.services.find(function(e){return e.get("id").indexOf("google")>=0});return o?o.get("availableScopes").indexOf("calendar_ro")<0?console.error('Cannot add calendar due to missing scope "calendar" in OAuth service'):void i(o):console.error("No google service provider found")}});