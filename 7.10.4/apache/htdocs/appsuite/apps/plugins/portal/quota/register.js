define("plugins/portal/quota/register",["io.ox/core/extensions","gettext!plugins/portal","io.ox/core/api/quota","io.ox/core/capabilities","settings!io.ox/core","io.ox/backbone/mini-views/quota","less!plugins/portal/quota/style"],function(e,t,o,i,u,a){"use strict";var n=function(){return o.requestFileQuotaUpdates(),o.load()},l=function(e){var o=[];return("unified"===u.get("quotaMode","default")||i.has("infostore"))&&o.push({module:"file",quota:e.file.quota,usage:e.file.use,name:"memory-file",title:t("unified"===u.get("quotaMode","default")?"Quota":"File quota")}),"default"===u.get("quotaMode","default")&&i.has("webmail")&&(o.push({module:"mail",quota:e.mail.quota,usage:e.mail.use,name:"memory-mail",title:t("Mail quota")}),o.push({module:"mail",quota:e.mail.countquota,usage:e.mail.countuse,quotaField:"countquota",usageField:"countuse",renderUnlimited:!1,name:"mailcount",title:t("Mail count quota"),sizeFunction:function(e){return e}})),_(o).select(function(e){return void 0!==e.quota&&void 0!==e.usage})},r=function(e){this.append($('<ul class="content no-pointer list-unstyled">').append(_(l(e)).map(function(e){return new a(_.extend({tagName:"li",className:"paragraph"},e)).render().$el})))};e.point("io.ox/portal/widget/quota").extend({title:t("Quota"),load:function(){return $.Deferred().resolve()},draw:function(){return $.Deferred().resolve()},hideSidePopup:!0,preview:function(){var e=this;return n().done(function(t){r.call(e,t)})}}),e.point("io.ox/portal/widget/quota/settings").extend({title:t("Quota"),type:"quota",editable:!1,unique:!0})});