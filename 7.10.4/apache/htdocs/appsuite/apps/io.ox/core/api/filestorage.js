define("io.ox/core/api/filestorage",["io.ox/core/http","io.ox/core/event","io.ox/core/extensions"],function(e,t,r){"use strict";var o={},n=new Backbone.Collection,i=new Backbone.Collection,c=[],u=function(e){var t=["googledrive","dropbox","boxcom","onedrive"];r.point("io.ox/core/filestorage/service-list").invoke("customize",t),_(e).each(function(e){e=e.get?e.toJSON():e,-1!==_(t).indexOf(e.filestorageService)&&c.push(e.qualifiedId)}),c=_.uniq(c)},a={rampupDone:!1,rampupFailed:!1,rampup:function(){return a.rampupDone?$.Deferred().resolve():(a.rampupFailed&&$.Deferred().reject(),e.pause(),a.getAllServices(),a.getAllAccounts(),e.resume().done(function(e){var t=!1;_(e).each(function(e){e.error&&(t=!0)}),t?(a.rampupDone=!1,a.rampupFailed=!0):(a.rampupDone=!0,a.rampupFailed=!1)}).fail(function(e){return a.rampupFailed=!0,e}))},getAccountsCache:function(){return i},getAllServices:function(t,r){if((r=void 0===r||r)&&n.length)return $.Deferred().resolve(n);var i={action:"all"};return t&&(i.filestorageService=t),e.GET({module:"fileservice",params:i}).then(function(e){return n.reset(e),_(e).each(function(e){try{e.configuration&&e.configuration.length>0&&e.configuration[0].options&&(o[e.configuration[0].options.type]={filestorageService:e.id,configuration:{type:e.configuration[0].options.type}})}catch(e){console.error(e)}}),n})},getService:function(t,r){if(r=_.defaultValue(r,!0),!t)return $.Deferred().reject();if(r&&n.length){var o=n.get(t);if(o)return $.Deferred().resolve(o)}return e.GET({module:"fileservice",params:{action:"get",id:t}}).then(function(e){return new Backbone.Model(e)})},getAllAccounts:function(t){return(t=_.defaultValue(t,!0))&&i.length>0?$.Deferred().resolve(i):e.GET({module:"fileaccount",params:{action:"all"}}).then(function(e){return i.reset(e),u(e),i})},getAccount:function(t,r){if(r=_.defaultValue(r,!0),!t.id||!t.filestorageService)return $.Deferred().reject();if(r&&i.length>0){var o=i.get(t.id);if(o)return $.Deferred().resolve(o)}return e.GET({module:"fileaccount",params:{action:"get",id:t.id,filestorageService:t.filestorageService}}).then(function(e){return new Backbone.Model(e)})},createAccount:function(t){return e.PUT({module:"fileaccount",params:{action:"new"},data:t}).then(function(e){return a.getAccount({id:e,filestorageService:t.filestorageService}).then(function(e){return i.add(e),u([e]),a.trigger("create",i.get(e)),i.get(e)})})},createAccountFromOauth:function(e,t){if(t=t||{},!e)return $.Deferred().reject();if(a.getAccountForOauth(e))return $.Deferred().reject({code:"EEXISTS"});var r=_.copy(o[e.serviceId],!0);return r?(r.displayName=t.displayName||e.displayName,r.configuration.account=String(e.id),a.createAccount(r)):$.Deferred().reject()},deleteAccount:function(t,r){function o(e){return i.remove(t),c=_(c).without(t.qualifiedId),a.trigger("delete",n||t),require(["io.ox/core/folder/api"],function(e){ox.trigger("account:delete",t.qualifiedId),e.propagate("account:delete")}),e}var n,u=r||{};return t.attributes&&(n=t,t=t.attributes),(u.softDelete?$.Deferred().resolve():e.PUT({module:"fileaccount",params:{action:"delete",id:t.id,filestorageService:t.filestorageService}})).then(o,o)},remove:function(e,t){return a.deleteAccount(e,t)},getAccountForOauth:function(e){var t;return _(i.models).each(function(r){r.get("configuration")&&r.get("configuration").account===String(e.id)&&(t=r)}),t},updateAccount:function(t){return e.PUT({module:"fileaccount",params:{action:"update"},data:t}).then(function(){return a.getAccount({id:t.id,filestorageService:t.filestorageService},!1).then(function(e){return i.add(e,{merge:!0}),a.trigger("update",i.get(e)),i.get(e)})})},isStorageAvailable:function(e){return e?!!o[e]:_.keys(o)},consistencyCheck:function(){a.rampupDone&&!a.rampupFailed&&require(["io.ox/oauth/keychain"],function(e){try{var t={},r=e.accounts;_(i.models).each(function(e){if(("googledrive"===e.get("filestorageService")||"dropbox"===e.get("filestorageService")||"onedrive"===e.get("filestorageService")||"boxcom"===e.get("filestorageService"))&&e.get("configuration")&&e.get("configuration").account){var o=e.get("configuration").account;r.get(o)&&!t[o]?t[o]=!0:a.deleteAccount(e)}})}catch(e){ox.debug&&console.error(e)}})},isExternal:function(e,t){var r=!1,o=t||{};if(a.rampupDone&&e&&e.account_id&&(r=-1!==_(c).indexOf(e.account_id)),r&&(o.type||o.root)){var n=i.findWhere({qualifiedId:e.account_id});o.root&&(r=e.id===n.get("rootFolder")),r&&o.type&&(r=n.get("filestorageService"))}return r}};return t.extend(a),require(["io.ox/core/folder/api"],function(e){e.on("remove:infostore",function(e){var t=/.*:\/\/(\d+)/.exec(e.account_id);null!==t&&t[1]&&i.remove(t[1])})}),a});