define("io.ox/mail/compose/main",["io.ox/core/extensions","io.ox/mail/api","io.ox/core/api/account","io.ox/mail/util","settings!io.ox/mail","gettext!io.ox/mail","io.ox/mail/actions","io.ox/mail/compose/actions"],function(e,i,t,o,n,r){"use strict";var s=e.point("io.ox/mail/compose/boot"),a=0;return s.extend({id:"bundle",index:a+=100,perform:function(){return require(["io.ox/mail/compose/bundle"])}},{id:"compose-model",index:a+=100,perform:function(e){var i=this;return require(["io.ox/mail/compose/model"]).then(function(t){return i.model=e.model=new t(e.data),e.data&&e.data.id&&(e.model.restored=!0),i.model.initialized})}},{id:"compose-view",index:a+=100,perform:function(e){var i=this;return require(["io.ox/mail/compose/config","io.ox/mail/compose/view"]).then(function(t,o){i.config=new t(_.extend({},e.config,{type:i.model.type})),i.view=e.view=new o({app:i,model:i.model,config:i.config})})}},{id:"fix-custom-displayname",index:a+=100,perform:function(){if(!n.get("customDisplayNames"))return t.getPrimaryAddressFromFolder(this.config.get("folderId")).catch(function(){return t.getPrimaryAddressFromFolder(i.getDefaultFolder())}).then(function(e){n.set(["customDisplayNames",e[1],"defaultName"],e[0])})}},{id:"fix-from",index:a+=100,perform:function(){var e=this.model;if(!e.get("from"))return t.getPrimaryAddressFromFolder(this.config.get("folderId")).catch(function(){return t.getPrimaryAddressFromFolder(i.getDefaultFolder())}).then(function(i){n.get(["customDisplayNames",i[1],"overwrite"])&&(i[0]=n.get(["customDisplayNames",i[1],"name"],"")),n.get("sendDisplayName",!0)||(i[0]=null),e.set("from",i)})}},{id:"fix-displayname",index:a+=100,perform:function(){function e(){var e=i.get("from");e&&i.set("from",o.getSender(e,t.get("sendDisplayName")))}var i=this.model,t=this.config;e(),this.view.listenTo(t,"change:sendDisplayName",e),this.view.listenTo(ox,"change:customDisplayNames",e)}},{id:"load-signature",index:a+=100,perform:function(){var e=this,i=this.view.signaturesLoading=$.Deferred();if(_.device("smartphone")){var t=n.get("mobileSignature",r("Sent from %s via mobile",ox.serverConfig.productName)),o=new Backbone.Collection([{id:"0",content:t,misc:{insertion:"below"}}]);this.config.set("signatures",o),i.resolve(o)}else require(["io.ox/core/api/snippets"],function(t){var o=t.getCollection();e.config.set("signatures",o),t.getAll().always(function(){i.resolve(o)})});return i.then(function(e){return this.config.set("signatures",e),e}.bind(this))}},{id:"render-view",index:a+=100,perform:function(e){e.win.nodes.main.addClass("scrollable").append(this.view.render().$el)}},{id:"editor-mode",index:a+=100,perform:function(){this.model.get("meta").editFor&&this.config.set("editorMode","text/plain"===this.model.get("contentType")?"text":"html"),("alternative"===this.config.get("preferredEditorMode")||"alternative"===this.config.get("editorMode"))&&this.config.set("editorMode","text/plain"===this.model.get("contentType")?"text":"html")}},{id:"auto-bcc",index:a+=100,perform:function(){n.get("autobcc")&&!this.config.is("edit")&&this.model.set("bcc",o.parseRecipients(n.get("autobcc"),{localpart:!1}))}},{id:"auto-discard",index:a+=100,perform:function(){this.config.set("autoDiscard",!this.config.is("edit"))}},{id:"set-mail",index:a+=100,perform:function(){return this.view.setMail()}},{id:"initial-signature",index:a+=100,perform:function(){return this.view.signaturesLoading.then(function(){this.config.setInitialSignature(this.model)}.bind(this))}},{id:"initial-patch",index:a+=100,perform:function(){this.view.dirty(!!this.model.restored),this.model.initialPatch()}},{id:"finally",index:a+=100,perform:function(e){var i=e.win;i.nodes.main.find(".tokenfield").css("padding-right",14+i.nodes.main.find(".recipient-actions").width()+20*i.nodes.main.find('[data-extension-id="to"] .has-picker').length),this.view.$el.find(".mail-input>.tokenfield>input.tokenfield").each(function(){var i=$(this).data("bs.tokenfield"),t=$(this).closest("[data-extension-id]").data("extension-id");delete i.maxTokenWidth,e.model.trigger("change:"+t,e.model,e.model.get(t))}),i.nodes.header.removeClass("sr-only"),i.nodes.body.removeClass("sr-only").find(".scrollable").scrollTop(0).trigger("scroll"),i.idle(),$(window).trigger("resize"),i.setTitle(this.model.get("subject")||r("Compose")),this.trigger("ready")}}),ox.on("http:error:MSGCS-0007 http:error:MSGCS-0011",function(e){var i=_.extend({},e);switch(e.code){case"MSGCS-0007":i.message=r("The mail draft could not be found on the server. It was sent or deleted in the meantime.");break;case"MSGCS-0011":var t=i.error_params[0]||20;i.message=r("You cannot open more than %1$s drafts at the same time.",t)}require(["io.ox/core/notifications"],function(e){e.yell(i)})}),{getApp:function(){var e,i=ox.ui.createApp({name:"io.ox/mail/compose",title:r("Compose"),userContent:!0,closable:!0,floating:!_.device("smartphone"),size:"width-xs height-md"});return i.setLauncher(function(){i.setWindow(e=ox.ui.createWindow({name:"io.ox/mail/compose",chromeless:!0,floating:!_.device("smartphone"),closable:!0,title:r("Compose")}))}),i.failRestore=function(e){var t={id:e};if(_.isObject(e)){if(e.restoreById)return i.open({type:"edit",original:{folderId:e.folder_id,id:e.id,security:e.security}});t=_(e).pick("to","cc","bcc","subject"),e.from&&e.from[0]&&(t.from=e.from[0]),e.attachments&&e.attachments[0]&&(t.content=e.attachments[0].content,t.contentType=e.attachments[0].content_type),t.meta={},t.meta.security=e.security,t.requestRqe=e.disp_notification_to,t.priority=["high","medium","low"][(t.priority||1)-1]}return i.open(t)},i.getContextualHelp=function(){return"ox.appsuite.user.sect.email.gui.create.html"},i.open=function(t,o){var n=$.Deferred();return"edit"===(t=_.extend({},t)).type&&(i.cid="io.ox/mail/compose:"+_.cid(t.original)+":"+t.type),e.nodes.header.addClass("sr-only"),e.nodes.body.addClass("sr-only"),e.busy().show(function(){s.cascade(i,{data:t||{},config:o,win:e}).then(function(){n.resolve({app:i}),ox.trigger("mail:"+i.model.get("meta").type+":ready",t,i)},function(e){i.view&&(i.view.dirty(!1),i.view.removeLogoutPoint()),i.quit(),n.reject(e)})}),n},i.setQuit(function(){if(i.view)return i.view.discard()}),i.on("quit",function(){i.model&&i.model.destroy()}),window.compose=i,i},reuse:function(e,i){return!(!i||"edit"!==i.type)&&ox.ui.App.reuse("io.ox/mail/compose:"+_.cid(i.original)+":edit")}}});