define("io.ox/multifactor/settings/pane",["io.ox/core/extensions","io.ox/backbone/views/extensible","io.ox/core/settings/util","io.ox/multifactor/api","io.ox/multifactor/factorRenderer","io.ox/core/yell","settings!io.ox/multifactor","gettext!io.ox/core/boot","less!io.ox/multifactor/settings/style","io.ox/multifactor/bundle"],function(t,e,i,o,n,c,a,d){"use strict";function r(t,e){t||(t=$(".multifactorStatusDiv"),e=$(".multifactorBackupDiv")),ox.busy(!0),t.empty(),e.empty(),o.getDevices().then(function(e){s(t,e)}),o.getDevices("BACKUP").then(function(i){s(e,i,!0),i.length>0?$(".addBackupDevice").hide():$(".addBackupDevice").show(),t.addClass("mfLoaded")}).always(function(){ox.idle()})}function s(t,e,i){if(e&&e&&e.length>0)return t.append(n.renderDeletable(e)),$(".multifactorRecoverySection").show(),l(t),u(t),$(".multifactorBackupField").show(),i&&(h=!0),void(a.get("allowMultiple")||$("#addDevice").hide());i?h=!1:(t.append($('<div class="emptyMultifactor">').append(d("No 2-Step verification options configured yet."))),$(".multifactorBackupField").hide(),$("#addDevice").show())}function l(t){t.find(".mfDelete").click(function(t){t.preventDefault(),f($(t.target).closest(".multifactordevice"))})}function u(t){t.find(".mfEdit").click(function(t){t.preventDefault(),p($(t.target).closest(".multifactordevice"))})}function f(t){ox.load(["io.ox/multifactor/settings/views/deleteMultifactorView"]).done(function(e){e.open(t).then(function(){r()})})}function p(t){ox.load(["io.ox/multifactor/settings/views/editMultifactorView"]).done(function(e){e.open(t).then(function(){r()})})}function v(t){var e=$('<button id="'+(t?"addBackupDevice":"addDevice")+'" class="btn btn-primary">').append(d(t?"Add recovery option":"Add verification option"));return e.click(function(){m(t)}),t&&e.addClass("addBackupDevice"),e}function m(t){o.getProviders(t).then(function(e){e&&e.providers?ox.load(["io.ox/multifactor/settings/views/addMultifactorView"]).done(function(i){i.open(e.providers,t).then(function(){r(),t||h||m(!0)})}):c("error",d("Problem getting 2-step verification providers"))})}t.point("io.ox/multifactor/settings/detail").extend({index:100,id:"view",draw:function(){this.append(new e({point:"io.ox/multifactor/settings/detail/view",model:a}).render().$el)}});var x,g,h,w=0;t.point("io.ox/multifactor/settings/detail/view").extend({id:"header",index:w+=100,render:function(){this.$el.addClass("io-ox-multifactor-settings").append(i.header(d.pgettext("app","2-Step Verification")))}},{id:"status",index:w+=100,render:function(){x=$('<div id="multifactorStatus" class="multifactorStatusDiv">'),this.$el.append(i.fieldset(d("Verification Options"),x,v()))}},{id:"recoveryDevices",index:w+=100,render:function(){g=$('<div id="multifactorStatus" class="multifactorBackupDiv">');var t=i.fieldset(d("Recovery Options"),g,v(!0)).addClass("multifactorBackupField");this.$el.append(t),r(x,g)}})});