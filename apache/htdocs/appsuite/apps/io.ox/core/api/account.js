define("io.ox/core/api/account",["settings!io.ox/mail","io.ox/core/http","io.ox/core/event"],function(e,t,n){"use strict";function r(e,t){return e=$.trim(e||""),t=l.trimAddress(t),[e!==t?e:"",t]}function i(t){if(!t)return[];if(!t.addresses)return[r(t.personal,t.primary_address)];var n=_(String(t.addresses||"").toLowerCase().split(",")).map($.trim).sort();return _(n).map(function(n){return r(n!==t.primary_address&&e.get("features/anonymousAliases",!1)?"":t.personal,n)})}var a={},u={},o=e.get("defaultseparator","/"),c=""===e.get("namespace","INBOX/"),s=function(t){var n=_.isArray(t);t=n?t:[t];var r=/^default\d+/,i=function(t){var n,i="default"+this.id+o,a=t+"_fullname";if(this[a])r.test(this[a])||(this[a]=i+this[a]);else{if(0!==this.id)return;(n=e.get(["folder",t]))||(this[t]?(n=c?"default0":e.get("folder/inbox"),n+=o+this[t]):n=""),this[a]=n}};return _(t).each(function(e){_(["trash","sent","drafts","spam","archive","confirmed_spam","confirmed_ham"]).each(i,e)}),n?t:t[0]},d=new RegExp("^default\\d+"+o+"[^"+o+"]+"+o),f=new RegExp("^default\\d+"+o+"[^"+o+"]+$"),l={};n.extend(l),l.isUnified=function(t){/^\d+$/.test(t)&&(t="default"+t);var n=e.get("unifiedInboxIdentifier");if(!n||"null"===n)return!1;var r=String(t).match(/^(default\d+)/);return!!r&&n===r[1]+o+"INBOX"},l.isUnifiedFolder=function(e){return f.test(e)&&l.isUnified(e)},l.isUnifiedRoot=function(e){return l.isUnified(e)&&1===e.split(o).length},l.isAccount=function(e){if(_.isNumber(e))return e in a;var t=String(e).match(/^default(\d+)/);return t&&t[1]in a},l.isPrimary=function(e){return/^default0/.test(e)},l.isExternal=function(e){return l.isAccount(e)&&!l.isPrimary(e)},l.getUnifiedMailboxName=function(){return this.getUnifiedInbox().then(function(e){return null===e?null:e.split(o)[0]})},l.getUnifiedInbox=function(){var t=e.get("unifiedInboxIdentifier",null);return $.when("null"===t?null:t)},l.getInbox=function(){return e.get("folder/inbox")},l.is=function(){function e(e,n){if(l.isUnified(n)){var r=t[e];return Boolean(r&&r.test(n))}return"inbox"===e?u[n]===e:_(u).some(function(t,r){var i=0===n.indexOf(r+o);return t===e&&(r===n||i)})}var t={inbox:/^default\d+\DINBOX(?:\/|$)/,sent:/^default\d+\DSent(?:\/|$)/,trash:/^default\d+\DTrash(?:\/|$)/,drafts:/^default\d+\DDrafts(?:\/|$)/,spam:/^default\d+\DSpam(?:\/|$)/};return _.memoize(function(t,n){return t=String(t||"").split("|"),n=String(n||""),_(t).reduce(function(t,r){return t||e(r,n)},!1)},function(e,t){return e+":"+t})}(),l.getFoldersByType=function(e,t){return _(u).chain().map(function(n,r){return(void 0===t||-1!==r.indexOf("default"+t))&&(n===e&&r)}).compact().value()},l.getStandardFolders=function(){return _(u).keys()},l.isStandardFolder=function(e){return void 0!==u[e]},l.isMalicious=function(e,t){if(e)return!!l.is("spam",e)||(!!l.is("confirmed_spam",e)||_(t).some(function(t){return t===e||0===e.indexOf(t+o)}))},l.getType=function(e){return"virtual/all-unseen"===e?"unseen":u[e]},l.getTypes=function(){return u},l.inspect=function(){return{accounts:a,types:u}},l.parseAccountId=function(e,t){if("number"==typeof e)return e;if(/^default(\d+)/.test(String(e))){if(!l.isUnified(e))return parseInt(e.replace(/^default(\d+)(.*)$/,"$1"),10);var n=e.replace(d,"");if(n!==e&&/^default\d+/.test(n))return l.parseAccountId(n,t);if(!t)return 0;var r=e.match(/^default(\d+)/);return r&&r.length?parseInt(r[1],10):0}return 0},l.getPrimaryAddress=function(e){return l.get(e||0).then(p).then(function(t){return t?0===e||!t.transport_url||l.isUnified(e)?l.getDefaultAddress():[t.personal,t.primary_address]:$.Deferred().reject(t)}).then(function(e){return r(e[0],e[1])})},l.getDefaultAddress=function(){return l.get(0).then(p).then(function(t){var n=$.trim(e.get("defaultSendAddress",""));return[t.personal,n||t.primary_address]})},l.getValidAddress=function(e){return l.getAllSenderAddresses().then(function(t){if(!_.isEmpty(t))return _.isEmpty(e.from)||(e.from=t.filter(function(t){return t[1]===e.from[0][1].toLowerCase()})),_.isEmpty(e.from)?l.getPrimaryAddress().then(function(t){return _.extend(e,{from:[t]})}):e})},l.getPrimaryAddressFromFolder=function(e){var t=this.parseAccountId(e,!0),n=l.isUnified(t);return this.getPrimaryAddress(n?0:t)},l.getDefaultDisplayName=function(){return require(["io.ox/contacts/util","io.ox/core/api/user"]).then(function(e,t){return t.get({id:ox.user_id}).then(function(t){return e.getMailFullName(t)})})};var p=function(e){return!e||e.personal&&(" "===e.personal||""!==$.trim(e.personal))?$.Deferred().resolve(e):l.getDefaultDisplayName().then(function(t){return e.personal=t,e})};return l.trimAddress=function(e){return(e=$.trim(e)).indexOf("@")>-1?e.toLowerCase():e},l.getSenderAddresses=function(e){return this.get(e||0).then(p).then(i)},l.getAllSenderAddresses=function(e){return l.all(e).then(function(e){return _(e).filter(function(e){return 0===e.id||!!e.transport_url})}).then(function(e){return $.when.apply($,_(e).map(p))}).then(function(){return _(arguments).flatten(!0)}).then(function(e){return $.when.apply($,_(e).map(i))}).then(function(){return _(arguments).flatten(!0)}).then(function(e){return e})},l.cache={},ox.rampup&&ox.rampup.accounts&&_(ox.rampup.accounts).each(function(e){var n=s(t.makeObject(e,"account"));l.cache[n.id]=n}),l.all=function(e){var n=_.extend({useCache:!0},e);return(_(l.cache).size()>0&&n.useCache?$.Deferred().resolve(_(l.cache).values()):t.GET({module:"account",params:{action:"all"},appendColumns:!0,processResponse:!0}).then(function(e){return e=s(e),l.cache={},_(e).each(function(e){l.cache[e.id]=s(e)}),e})).done(function(e){a={},u={},_(e).each(function(e){a[e.id]=!0,u["default"+e.id+"/INBOX"]="inbox",_("drafts sent spam trash archive confirmed_spam".split(" ")).each(function(t){var n=e[t],r=e[t+"_fullname"]||n;u[r]||(u[r]=t)})})})},l.get=function(e){return l.cache[e]?$.Deferred().resolve(l.cache[e]):l.all().then(function(){return l.cache[e]})},l.create=function(e){return t.PUT({module:"account",params:{action:"new"},data:e,appendColumns:!1}).then(function(e){return l.reload().then(function(){return ox.trigger("account:create"),l.trigger("create:account",{id:e.id,email:e.primary_address,name:e.name}),require(["io.ox/core/folder/api"],function(e){e.propagate("account:create")}),e})})},l.remove=function(e){return t.PUT({module:"account",params:{action:"delete"},data:e,appendColumns:!1}).done(function(){var t=(l.cache[e]||{}).root_folder;delete l.cache[e],ox.trigger("account:delete",t),l.trigger("refresh.all"),l.trigger("delete"),require(["io.ox/core/folder/api"],function(e){e.propagate("account:delete")})})},l.validate=function(e,n){return n=_.extend({action:"validate"},n),t.PUT({module:"account",appendColumns:!1,params:n,data:e,processData:!1}).then(function(e){return $.Deferred().resolve(e.data,13===e.category?e:void 0)},function(e){return $.Deferred().resolve(e.data,e)})},l.update=function(e){return delete e.mail_url,delete e.transport_url,t.PUT({module:"account",params:{action:"update"},data:e,appendColumns:!1}).then(function(n){var r=n.id;if(l.cache[r]){var i=n.unified_inbox_enabled;l.cache[r].unified_inbox_enabled!==i&&require(["io.ox/core/folder/api"],function(e){e.propagate(i?"account:unified-enable":"account:unified-disable")})}return(_.isObject(n)?$.Deferred().resolve(n):t.GET({module:"account",params:{action:"get",id:e.id},appendColumns:!1})).done(function(e){e=s(e),l.cache[r]=e}).done(function(e){l.trigger("refresh.all"),l.trigger("update",e)})})},l.autoconfig=function(e){return t.POST({module:"autoconfig",data:_.extend({action:"get"},e)})},l.configtestAll=function(){return t.GET({module:"jslob",params:{action:"all"}})},l.configtestList=function(e){return t.PUT({module:"jslob",params:{action:"list"},data:e})},l.configtestUpdate=function(e,n){return t.PUT({module:"jslob",params:{action:"update",id:n},data:e})},l.configtestSet=function(e,n){return t.PUT({module:"jslob",params:{action:"set",id:n},data:e})},l.getStatus=function(e){var n={action:"status"};return e&&(n.id=e),t.GET({module:"account",params:n})},l.getPrimaryName=function(){if(!l.cache[0])return"";var e=l.cache[0].name;return/^(email|e-mail)$/i.test(e)?String(l.cache[0].primary_address).toLowerCase().split("@")[1]||"":e},l.reload=function(){return l.all({useCache:!1})},l.refresh=function(){return this.reload().done(function(){l.trigger("refresh.all")})},ox.on("refresh^",function(){l.refresh()}),l});