define("io.ox/settings/security/settings/pane",["io.ox/core/extensions","io.ox/backbone/views/extensible","io.ox/core/capabilities","io.ox/core/settings/util","settings!io.ox/core","settings!io.ox/mail","gettext!io.ox/mail"],function(e,t,i,s,n,o,l){"use strict";var a=0;e.point("io.ox/settings/security/settings/detail").extend({index:a+=100,id:"header",draw:function(){this.append(s.header(l("Security")))}},{index:a+=100,id:"general",draw:function(){this.append(new t({point:"io.ox/settings/security/settings/detail/general",model:n}).build(function(){this.listenTo(this.model,"change",this.model.saveAndYell.bind(this.model,void 0)),this.listenTo(this.model,"change:autoLogout",function(){ox.autoLogout.restart()})}).inject({getAutoLogoutOptions:function(){return[{label:l("Never"),value:0},{label:l("5 minutes"),value:3e5},{label:l("10 minutes"),value:6e5},{label:l("15 minutes"),value:9e5},{label:l("30 minutes"),value:18e5}]}}).render().$el)}},{index:a+=100,id:"mail",draw:function(){i.has("webmail")&&!i.has("guest")&&this.append(new t({point:"io.ox/settings/security/settings/detail/mail",model:o}).build(function(){this.listenTo(this.model,"change",this.model.saveAndYell.bind(this.model,void 0))}).render().$el)}}),e.point("io.ox/settings/security/settings/detail/general").extend({id:"autoLogout",index:100,render:function(){this.model.isConfigurable("autoLogout")&&this.$el.append(s.fieldset(l("General"),s.compactSelect("autoLogout",l("Automatic sign out"),this.model,this.getAutoLogoutOptions())))}}),e.point("io.ox/settings/security/settings/detail/mail").extend({id:"mail",index:100,render:function(){this.$el.append(s.fieldset(l.pgettext("app","Mail"),s.checkbox("allowHtmlImages",l("Allow pre-loading of externally linked images"),this.model)).addClass("mail"))}}),e.point("io.ox/settings/security/settings/detail/mail").disable("authenticity").extend({id:"authenticity",index:200,render:function(){o.get("features/authenticity",!1)&&this.$("fieldset.mail").append(s.compactSelect("authenticity/level",l("Show email authenticity"),this.model,[{label:l("Disabled"),value:"none"},{label:l("Suspicious and unclassified emails only"),value:"fail_suspicious_trusted"},{label:l("All emails"),value:"fail_suspicious_neutral_none_pass_trusted"}]))}}),e.point("io.ox/settings/security/settings/detail/mail").extend({id:"trusted",index:300,render:function(){this.model.isConfigurable("features/trusted/user")&&this.$("fieldset.mail").append(s.textarea("features/trusted/user",l("Always trust mails from the following senders"),this.model,l('Comma-separated list e.g. "example.org, alice@example.com"')))}})});