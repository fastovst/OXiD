define("io.ox/settings/accounts/views",["io.ox/core/extensions","io.ox/settings/util","io.ox/backbone/mini-views/listutils","io.ox/backbone/views/disposable","gettext!io.ox/settings/accounts"],function(e,t,i,o,n){"use strict";var a=function(t){void 0!==t.data.id&&void 0!==t.data.accountType&&e.point("io.ox/settings/accounts/"+t.data.accountType+"/settings/detail").invoke("draw",t.data.node,t)},c=function(e){var t=e.get("accountType")||e.get("module"),i=String(e.get("serviceId")||e.id).match(/\.?([a-zA-Z]*)(\d*)$/)[1]||"fallback";return $('<i class="account-icon fa" aria-hidden="true">').addClass(t.toLowerCase()).addClass("logo-"+i)},s=function(e){if(void 0!==e.get("status")&&"ok"!==e.get("status"))return $('<div class="error-wrapper">').append($('<i class="error-icon fa fa-exclamation-triangle" aria-hidden="true">'),$('<div class="error-message">').text(e.get("status").message))};return{ListItem:o.extend({tagName:"li",className:"settings-list-item",events:{'click [data-action="edit"]':"onEdit",'click [data-action="delete"]':"onDelete"},initialize:function(){this.listenTo(this.model,"change",this.render)},getTitle:function(){var e="mail"===this.model.get("accountType")?"name":"displayName";return this.model.get(e)},renderSubTitle:function(){var t=$('<div class="list-item-subtitle">');return e.point("io.ox/settings/accounts/"+this.model.get("accountType")+"/settings/detail").invoke("renderSubtitle",t,this.model),t},renderTitle:function(e){return i.makeTitle(e)},render:function(){var t=this,o=t.getTitle(),a=e.point("io.ox/settings/accounts/"+t.model.get("accountType")+"/settings/detail").pluck("draw").length>0,l=0!==t.model.get("id");return t.$el.attr({"data-id":t.model.get("id"),"data-accounttype":t.model.get("accountType")}),t.$el.empty().append(c(t.model),this.renderTitle(o).append(this.renderSubTitle()),i.makeControls().append(a?i.appendIconText(i.controlsEdit({"aria-label":n("Edit %1$s",o)}),n("Edit"),"edit"):"",l?i.controlsDelete({title:n("Delete %1$s",o)}):$('<div class="remove-placeholder">')),s(this.model)),t},onDelete:function(e){e.preventDefault();var i=this.model.pick("id","accountType","folder"),o=this;require(["io.ox/backbone/views/modal"],function(e){new e({async:!0,title:n("Delete account")}).build(function(){this.$body.append(n("Do you really want to delete this account?"))}).addCancelButton().addButton({action:"delete",label:n("Delete account")}).on("delete",function(){var e=this,n=void 0!==i.folder&&"mail"!==i.accountType,a=n?"io.ox/core/folder/api":"io.ox/keychain/api";t.yellOnReject(require([a]).then(function(e){return e.remove(n?i.folder:i)}).then(function(){o.disposed?e.close():(o.model.collection.remove(o.model),e.close())},function(){throw e.close(),arguments}).always(function(){require(["io.ox/core/api/account","io.ox/core/folder/api"],function(e,t){e.getUnifiedInbox().done(function(e){if(!e)return t.refresh();var i=e.split("/")[0];t.pool.unfetch(i),t.refresh()})})}))}).open()})},onEdit:function(e){e.preventDefault(),e.data={id:this.model.get("id"),accountType:this.model.get("accountType"),model:this.model,node:this.el},a(e)}})}});