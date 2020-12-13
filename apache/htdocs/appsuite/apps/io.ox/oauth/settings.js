define("io.ox/oauth/settings",["io.ox/core/extensions","io.ox/oauth/keychain","io.ox/oauth/backbone","io.ox/backbone/mini-views/common","io.ox/backbone/mini-views/settings-list-view","io.ox/settings/accounts/views","io.ox/keychain/api","io.ox/backbone/views/modal","gettext!io.ox/settings"],function(t,e,i,n,o,s,a,c,d){"use strict";function l(t){return"infostore"===t?"files":t}function u(t){this.id=t,this.draw=function(i){var a=e.accounts.get(i.data.id),u=new Backbone.Collection([].concat(a.get("associations")).map(function(t){return _.extend({serviceId:a.get("serviceId"),accountType:t.module},t)}));u.on("remove",function(){a.fetch()}),new c({focus:"input",async:!0,title:a.get("displayName"),point:"io.ox/settings/accounts/"+t+"/settings/detail/dialog",relatedAccountsCollection:u,account:a,service:e.services.withShortId(t),parentAccount:i.data.model}).extend({title:function(){var t=this.$el.find(".modal-header"),e=this.options.service.id.match(/\.?(\w*)$/)[1]||"fallback";this.$el.addClass("oauth-account"),this.options.account.has("identity")&&t.find(".modal-title").append($('<div class="account-identity">').text(this.options.account.get("identity"))),t.append($('<div class="service-icon">').addClass("logo-"+e))},text:function(){var t,e=this,i=new o({tagName:"ul",childView:s.ListItem.extend({events:function(){return _.extend({"click .deeplink":"openModule"},s.ListItem.prototype.events)},getTitle:function(){return this.model.get("name")||p[this.model.get("module")]||s.ListItem.prototype.getTitle.apply(this)},renderTitle:function(t){return $('<div class="list-item-title">').append($('<button type="button" class="btn btn-link deeplink">').attr({title:d("Open %1$s in %2$s",t,p[this.model.get("module")])}).append(t))},openModule:function(){var t=this.model;ox.launch("io.ox/"+l(this.model.get("module"))+"/main",{folder:t.get("folder")}).done(function(){this.folder.set(t.get("folder")),e.close()})}}),collection:this.options.relatedAccountsCollection});this.$body.append($('<div class="form-group">').append($("<label>",{for:t=_.uniqueId("input")}).text(d("Account Name")),new n.InputView({name:"displayName",model:this.options.account,id:t}).render().$el),$('<div class="form-group">').append(i.render().$el))}}).addCancelButton().addButton({action:"save",label:d("Save")}).on("save",function(){var t=this,e=this.options.account,i=this.options.parentAccount;e.save().then(function(){i.set(e.attributes),t.close()},function(){t.idle()})}).open()},this.renderSubtitle=function(t){var i=e.accounts.get(t.get("id")),n=this;i&&n.append($.txt(i.get("associations").map(function(t){return p[t.module]||i.get("displayName")}).join(", ")))}}var p={mail:d.pgettext("app","Mail"),fileStorage:d.pgettext("app","Drive"),infostore:d.pgettext("app","Drive"),calendar:d.pgettext("app","Calendar"),contacts:d.pgettext("app","Address Book")};return _(e.serviceIDs).each(function(e){t.point("io.ox/settings/accounts/"+e+"/settings/detail").extend(new u(e))}),{}});