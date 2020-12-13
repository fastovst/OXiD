define.async("io.ox/mail/accounts/keychain",["io.ox/core/extensions","io.ox/core/api/account","io.ox/core/api/user","io.ox/core/capabilities","io.ox/core/event","io.ox/mail/accounts/model","gettext!io.ox/keychain","io.ox/backbone/validation","io.ox/keychain/model"],function(e,n,i,t,o,a,r){"use strict";function c(e,t){return n.all().done(function(n){if(s={},t&&(s[t.id]=t,t.accountType="mail",t.displayName=t.name||t.primary_address,i.getName(ox.user_id).then(function(e){t.personal=t.personal||e})),_(n).each(function(e){s[e.id]=e,e.accountType="mail",e.displayName=e.name||e.primary_address}),e){if("create:account"===(e=e.namespace?e.type+"."+e.namespace:e.type))return d.trigger("create"),void d.trigger("refresh.all");d.trigger(e)}})}function u(e){return function(){d.trigger(e)}}var d,l=$.Deferred();e.point("io.ox/keychain/model").extend({id:"mail",index:100,accountType:"mail",wrap:function(e){return new a(e)}});var s={};return c().done(function(){l.resolve({message:"Loaded mail keychain"})}),n.on("create:account refresh.all refresh.list",c),n.on("deleted",u("deleted")),n.on("updated",u("updated")),d={id:"mail",index:100,displayName:r("Mail account"),actionName:"mailaccount",canAdd:function(){return t.has("multiple_mail_accounts")},getAll:function(){return _(s).map(function(e){return e})},get:function(e){return s[e]},getStandardAccount:function(){return s[0]},hasStandardAccount:function(){return!!s[0]},createInteractively:function(e){var n=$.Deferred();return require(["io.ox/mail/accounts/settings"],function(i){i.mailAutoconfigDialog(e).done(function(){n.resolve()}).fail(n.reject)}),n},remove:function(e){return n.remove([e.id])},update:function(e){return n.update(e)}},o.extend(d),e.point("io.ox/keychain/api").extend(d),l});