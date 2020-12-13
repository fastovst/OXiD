define.async("io.ox/mail/settings/pane",["io.ox/core/extensions","io.ox/backbone/views/extensible","io.ox/core/capabilities","io.ox/core/settings/util","io.ox/core/notifications","io.ox/mail/mailfilter/vacationnotice/model","io.ox/mail/mailfilter/autoforward/model","io.ox/core/api/mailfilter","settings!io.ox/mail","gettext!io.ox/mail"],function(e,t,i,o,n,a,s,l,d,r){"use strict";function c(e){return d.isConfigurable(e)}void 0===d.get("features/registerProtocolHandler")&&d.set("features/registerProtocolHandler",!0),e.point("io.ox/mail/settings/detail").extend({index:100,id:"view",draw:function(){this.append(new t({point:"io.ox/mail/settings/detail/view",model:d}).inject({getSoundOptions:function(){return[{label:r("Bell"),value:"bell"}]}}).build(function(){this.listenTo(d,"change",function(){d.saveAndYell().then(function(){require(["io.ox/mail/api"],function(e){e.updateViewSettings()})},function(){n.yell("error",r("Could not save settings"))})})}).render().$el)}});var u=0;e.point("io.ox/mail/settings/detail/view").extend({id:"header",index:u+=100,render:function(){this.$el.addClass("io-ox-mail-settings").append(o.header(r.pgettext("app","Mail")))}},{id:"buttons",index:u+=100,render:function(e){this.$el.append(e.branch("buttons",null,$('<div class="form-group buttons">')))}},{id:"display",index:u+=100,render:function(){this.$el.append(o.fieldset(r.pgettext("noun","View"),o.checkbox("allowHtmlMessages",r("Allow html formatted emails"),d),o.checkbox("isColorQuoted",r("Color quoted lines"),d),o.checkbox("useFixedWidthFont",r("Use fixed-width font for text mails"),d),o.checkbox("sendDispositionNotification",r("Show requests for read receipts"),d),d.get("features/unseenFolder",!1)&&c("unseenMessagesFolder")?o.checkbox("unseenMessagesFolder",r("Show folder with all unseen messages"),d):[]))}},{id:"sounds",index:u+=100,render:function(){!_.device("smartphone")&&(i.has("websocket")||ox.debug)&&Modernizr.websockets&&(this.$el.append(o.fieldset(r("Notification sounds"),o.checkbox("playSound",r("Play sound on incoming mail"),d),o.compactSelect("notificationSoundName",r("Sound"),d,this.getSoundOptions()).prop("disabled",!d.get("playSound")))),this.listenTo(d,"change:playSound",function(e){this.$('[name="notificationSoundName"]').prop("disabled",e?"":"disabled")}))}},{id:"behavior",index:u+=100,render:function(){if(!i.has("guest")){var e=!!i.has("collect_email_addresses");this.$el.append(o.fieldset(r("Behavior"),o.checkbox("removeDeletedPermanently",r("Permanently remove deleted emails"),d),e?o.checkbox("contactCollectOnMailTransport",r('Automatically collect contacts in the folder "Collected addresses" while sending'),d):[],e?o.checkbox("contactCollectOnMailAccess",r('Automatically collect contacts in the folder "Collected addresses" while reading'),d):[],o.checkbox("features/registerProtocolHandler",r("Ask for mailto link registration"),d).find("label").css("margin-right","8px").end().append(navigator.registerProtocolHandler?$('<a href="#" role="button">').text(r("Register now")).on("click",function(e){e.preventDefault();var t=location,i=t.href.indexOf("#"),o=t.href.substr(0,i);navigator.registerProtocolHandler("mailto",o+"#app="+ox.registry.get("mail-compose")+":compose&mailto=%s",ox.serverConfig.productNameMail)}):[])))}}});var f,p=l.getConfig().then(function(e){f=!!_(e.actioncmds).findWhere({id:"vacation"})},function(){f=!1});return e.point("io.ox/mail/settings/detail/view/buttons").extend({id:"vacation-notice",index:100,render:function(){function e(e){this.find('[data-action="edit-vacation-notice"] .fa-toggle-on').toggle(e.get("active"))}if(i.has("mailfilter_v2")&&f){this.append($('<button type="button" class="btn btn-default" data-action="edit-vacation-notice">').append($('<i class="fa fa-toggle-on" aria-hidden="true">').hide(),$.txt(r("Vacation notice")+" ...")).on("click",function(){ox.load(["io.ox/mail/mailfilter/vacationnotice/view"]).done(function(e){e.open()})}));var t=new a;t.fetch().done(e.bind(this,t)),ox.on("mail:change:vacation-notice",e.bind(this))}}},{id:"auto-forward",index:200,render:function(){function e(e){this.find('[data-action="edit-auto-forward"] .fa-toggle-on').toggle(e.isActive())}if(i.has("mailfilter_v2")){this.append($('<button type="button" class="btn btn-default" data-action="edit-auto-forward">').append($('<i class="fa fa-toggle-on" aria-hidden="true">').hide(),$.txt(r("Auto forward")+" ...")).on("click",function(){ox.load(["io.ox/mail/mailfilter/autoforward/view"]).done(function(e){e.open()})}));var t=new s;t.fetch().done(e.bind(this,t)),ox.on("mail:change:auto-forward",e.bind(this))}}},{id:"imap-subscription",index:300,render:function(){d.get("ignoreSubscription",!1)||_.device("smartphone")||i.has("guest")||this.append($('<button type="button" class="btn btn-default">').text(r("Change IMAP subscriptions")+" ...").on("click",function(){ox.load(["io.ox/core/folder/actions/imap-subscription"]).done(function(e){e()})}))}}),p});