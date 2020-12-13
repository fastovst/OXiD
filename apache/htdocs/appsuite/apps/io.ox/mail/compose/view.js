define("io.ox/mail/compose/view",["io.ox/mail/compose/extensions","io.ox/core/extensions","io.ox/mail/compose/api","io.ox/mail/api","io.ox/mail/util","settings!io.ox/mail","io.ox/core/notifications","gettext!io.ox/mail","io.ox/core/attachments/backbone","io.ox/core/tk/dialogs","io.ox/mail/compose/signatures","io.ox/mail/sanitizer","io.ox/mail/compose/util","less!io.ox/mail/style","less!io.ox/mail/compose/style","io.ox/mail/compose/actions/send","io.ox/mail/compose/actions/save"],function(t,e,i,o,n,a,s,d,r,c,l,h,p){"use strict";var u=0,m="io.ox/mail/compose";return e.point(m+"/buttons").extend({index:100,id:"send",draw:t.buttons.send},{index:300,id:"discard",draw:t.buttons.discard}),e.point(m+"/mailto").extend({id:"mailto",index:100,setup:t.mailto}),e.point(m+"/header").extend({index:100,id:"title",draw:t.title},{index:200,id:"buttons",draw:function(t){e.point(m+"/buttons").invoke("draw",this,t)}},{index:200,id:"inlineYell",draw:t.inlineYell}),e.point(m+"/fields").extend({id:"header",index:u+=100,draw:t.header},{id:"sender",index:u+=100,draw:t.sender},{id:"sender-realname",index:u+=100,draw:t.senderRealName},{id:"to",index:u+=100,draw:t.tokenfield("to")},{id:"cc",index:u+=100,draw:t.tokenfield("cc")},{id:"bcc",index:u+=100,draw:t.tokenfield("bcc")},{id:"replyto",index:u+=100,draw:t.tokenfield("reply_to")},{id:"subject",index:u+=100,draw:t.subject},{id:"composetoolbar",index:u+=100,draw:function(t){var i=$('<div data-extension-id="composetoolbar" class="row composetoolbar">');e.point(m+"/composetoolbar").invoke("draw",i,t),this.append(i)},redraw:function(t){var i=this.find(".row.composetoolbar");e.point(m+"/composetoolbar").invoke("redraw",i,t)}},{id:"attachments",index:u+=100,draw:function(t){var i=$('<div data-extension-id="attachments" class="row attachments">');e.point(m+"/attachments").invoke("draw",i,t),this.append(i)}},{id:"arialive",index:u+=100,draw:function(){var t=$('<div data-extension-id="arialive" class="sr-only" role="alert" aria-live="assertive">');this.append(t)}}),e.point(m+"/recipientActionLink").extend({id:"cc",index:100,draw:t.recipientActionLink("cc")},{id:"bcc",index:200,draw:t.recipientActionLink("bcc")}),e.point(m+"/recipientActionLinkMobile").extend({id:"mobile",index:100,draw:t.recipientActionLinkMobile}),e.point(m+"/recipientActions").extend({id:"recipientActions",index:100,draw:t.recipientActions}),e.point(m+"/menu").extend({id:"security",index:100,draw:t.security},{id:"signatures",index:200,draw:l.extensions.menu},{id:"options",index:300,draw:t.optionsmenu}),e.point(m+"/editors").extend({id:"plain-text",label:d("Plain Text"),mode:"text"},{id:"tinymce",label:d("HTML"),mode:"html"}),e.point(m+"/menuoptions").extend({id:"editor",index:100,draw:function(){if(!_.device("smartphone")){var t=this.data("view").header(d("Editor"));e.point(m+"/editors").each(function(e){(e.mode||e.label)&&t.option("editorMode",e.mode,e.label,{prefix:d("Editor"),radio:!0})})}}},{id:"priority",index:200,draw:function(){this.data("view").header(d.pgettext("E-Mail","Priority")).option("priority","high",d.pgettext("E-Mail priority","High"),{prefix:d.pgettext("E-Mail","Priority"),radio:!0}).option("priority","normal",d.pgettext("E-Mail priority","Normal"),{prefix:d.pgettext("E-Mail","Priority"),radio:!0}).option("priority","low",d.pgettext("E-Mail priority","Low"),{prefix:d.pgettext("E-Mail","Priority"),radio:!0})}},{id:"options",index:300,draw:function(){this.data("view").header(d("Options")).option("vcard",1,d("Attach Vcard"),{prefix:d("Options"),toggleValue:0}).option("requestReadReceipt",!0,d("Request read receipt"),{prefix:d("Options")})}}),e.point(m+"/composetoolbar").extend({id:"add_attachments",index:100,draw:function(e){var i=$('<div data-extension-id="add_attachments" class="mail-input">');i.addClass(_.device("smartphone")?"col-xs-5":"col-xs-offset-2 col-xs-3"),t.attachment.call(i,e),this.append(i)}},{id:"menus",index:200,draw:function(t){var i=$('<div class="pull-right text-right">');e.point(m+"/menu").invoke("draw",i,t),this.append($('<div data-extension-id="composetoolbar-menu" class="col-xs-7">').append(i))}}),e.point(m+"/attachments").extend({id:"attachmentPreview",index:100,draw:function(e){var i=$('<div data-extension-id="attachmentPreview" class="col-xs-12">');t.attachmentPreviewList.call(i,e),t.attachmentSharing.call(i,e),t.mailSize.call(i,e),t.imageResizeOption.call(i,e),i.appendTo(this)}}),e.point(m+"/attachments").disable("attachmentList"),e.point(m+"/editor/load").extend({id:"options",index:100,perform:function(t){t.options={useFixedWithFont:a.get("useFixedWithFont"),app:this,config:t.config,view:t.view,model:t.model,oxContext:{view:t.view}}}},{id:"image-loader",index:200,perform:function(t){var e=this;"html"===this.config.get("editorMode")&&(t.options.imageLoader={upload:function(t){var i=new r.Model({filename:t.name,uploaded:0,contentDisposition:"INLINE"}),o=new $.Deferred;return p.uploadAttachment({model:e.model,filename:t.name,origin:{file:t},attachment:i,contentDisposition:"inline"}),i.once("upload:complete",o.resolve),e.model.attachFiles([i]),o},getUrl:function(t){return o.getUrl(_.extend({space:e.model.get("id")},t),"view",{session:!1})}})}},{id:"editor",index:300,perform:function(t){var e=$.Deferred();return ox.manifests.loadPluginsFor("io.ox/mail/compose/editor/"+t.config.get("editorMode")).then(function(i){new i(t.view.editorContainer,t.options).done(function(i){t.editor=i,e.resolve()})},function(){e.reject({error:d("Couldn't load editor")})}),e}},{id:"pick",index:400,perform:function(t){return t.editor}}),e.point(m+"/editor/use").extend({id:"register",index:100,perform:function(t){var e=t.view;e.editor&&e.stopListening(e.editor),e.listenTo(t.editor,"change",e.syncMail),e.listenTo(t.config,"change:signature",e.syncMail)}},{id:"content",index:200,perform:function(t){var e=t.model,i=t.editor,o="text/html"===e.get("contentType")&&"text"===i.getMode(),n="text/plain"===e.get("contentType")&&"html"===i.getMode(),a=o||n?"setPlainText":"setContent";return $.when(i[a](t.content))}},{id:"model",index:300,perform:function(t){var e=t.editor.content_type;"alternative"===e.toLowerCase()&&(e="multipart/alternative"),t.model.set({content:t.editor.getContent(),contentType:e})}},{id:"show",index:400,perform:function(t){var e=t.editor;e.show(),t.view.editor=e}},{id:"pick",index:400,perform:function(t){return t.editor}}),Backbone.View.extend({className:"io-ox-mail-compose container f6-target",events:{'click [data-action="add"]':"toggleTokenfield",'keydown [data-extension-id="subject"]':"flagSubjectField",'keyup [data-extension-id="subject"] input':"setSubject",keydown:"focusSendButton","aria-live-update":"ariaLiveUpdate"},initialize:function(t){_.extend(this,l.view,this),this.app=t.app,this.config=t.config,this.editorHash={},this.messageFormat=t.messageFormat||a.get("messageFormat","html"),this.editor=null,this.composeMode="compose",this.editorId=_.uniqueId("editor-"),this.editorContainer=$('<div class="editor">').attr({"data-editor-id":this.editorId}),this.baton=e.Baton({model:this.model,config:this.config,view:this,app:this.app}),this.$el.on("dispose",function(t){this.dispose(t)}.bind(this)),_.device("tablet && ios < 13")&&$(document.body).on("touchstart",this.onTouchStart),this.listenTo(this.model,"keyup:subject change:subject",this.setTitle),this.listenTo(this.model,"change",_.throttle(this.onChangeSaved.bind(this,"dirty"),100)),this.listenTo(this.model,"before:save",this.onChangeSaved.bind(this,"saving")),this.listenTo(this.model,"success:save",this.onChangeSaved.bind(this,"saved")),this.listenTo(this.config,"change:editorMode",this.toggleEditorMode),this.listenTo(this.config,"change:vcard",this.onAttachVcard),this.listenTo(this.model,"change:content",this.onChangeContent),this.listenTo(this.config,"change:signatureId",this.setSignature),this.listenTo(this.config,"change:signatures",this.updateSignatures),this.listenTo(this.config,"change:signature",this.redrawSignature);var o,n,s=this;if(o=_.url.hash("mailto")){var d=function(t){return t.split(",").map(function(t){var e=_.compact(t.replace(/^("([^"]*)"|([^<>]*))?\s*(<(\s*(.*?)\s*)>)?/,"$2//$3//$5").split("//")).map(function(t){return t.trim()});return 1===e.length?[e[0],e[0]]:e})},r=o.replace(/^mailto:/,"").split(/\?/,2),c=decodeURIComponent(r[0]);n=_.deserialize(r[1]);for(var p in n)n[p.toLowerCase()]=n[p];c&&this.model.set("to",d(c),{silent:!0}),n.cc&&this.model.set("cc",d(n.cc),{silent:!0}),n.bcc&&this.model.set("bcc",d(n.bcc),{silent:!0}),n.body=h.sanitize({content:n.body,content_type:"text/html"},{WHOLE_DOCUMENT:!1}).content,this.setSubject(n.subject||""),this.model.set("content",n.body||""),_.url.hash("mailto",null)}this.listenTo(i.queue.collection,"change:pct",this.onSendProgress),e.point(m+"/mailto").invoke("setup"),this.logoutPointId="saveMailOnDraft_"+this.app.id,e.point("io.ox/core/logout").extend({id:this.logoutPointId,index:1e3+this.app.guid,logout:function(){return s.model.save()}})},onSendProgress:function(t,e){this.model.get("id")===t.get("id")&&e>=0&&this.app.getWindow().busy(e)},onChangeContent:function(t,e){e&&'<div style="" class="default-style"><br></div>'!==e||this.config.set("signatureId","")},ariaLiveUpdate:function(t,e){this.$('[data-extension-id="arialive"]').text(e)},setSubject:function(t){var e=t.target?$(t.target):void 0,i=e?e.val():t;t.which&&13===t.which&&e.attr("data-enter-keydown")&&(t.preventDefault(),this.editor.focus(),e.removeAttr("data-enter-keydown")),this.model.set("subject",i,{silent:_.device("safari")}).trigger("keyup:subject",i)},setTitle:function(){this.app.setTitle(this.model.get("subject")||d("Compose"))},saveDraft:function(){var t=this.app.getWindow();this.trigger("updateTokens"),t&&t.busy();var i=this,o=new e.Baton({model:this.model,config:this.config,app:this.app,view:i,catchErrors:!0}),n=$.Deferred();return e.point("io.ox/mail/compose/actions/save").cascade(this,o).then(function(t){if(o.rejected)return n.reject(o.error),t;n.resolve(t)},n.reject).always(function(){t&&t.idle()}),n},onChangeSaved:function(t){this.autoSaveState!==t&&("dirty"===t?this.inlineYell(""):"saving"===t?this.inlineYell(d("Saving...")):"saved"===t&&"saving"===this.autoSaveState&&this.inlineYell(d("Saved")),this.autoSaveState=t)},inlineYell:function(t){this.$el.is(":visible")&&(_.device("smartphone")||this.$el.closest(".io-ox-mail-compose-window").find(".inline-yell").text(t).fadeIn())},dirty:function(t){if(!1===t)this.editor&&this.model.set("content",this.editor.getContent()),this.initialModel=this.model.toJSON();else{if(!0!==t)return!_.isEmpty(this.model.deepDiff(this.initialModel));this.initialModel={}}},clean:function(){this.dirty(!1);for(var t in this.editorHash)this.editorHash[t].then(function(t){t.setContent(""),t.destroy()}),delete this.editorHash[t]},removeLogoutPoint:function(){e.point("io.ox/core/logout").disable(this.logoutPointId)},dispose:function(){i.queue.remove(this.model.get("id")),this.removeLogoutPoint(),this.stopListening(),this.model=null,$(document.body).off("touchstart",this.onTouchStart),delete this.editor},discard:function(){var t=this,e=$.when(),i=this.model.keepDraftOnClose();if((this.dirty()||i)&&!this.config.get("autoDismiss")){var n=i?d.pgettext("dialog","Delete draft"):d.pgettext("dialog","Discard message"),a=d(i?"Keep draft":"Save as draft"),s=d(i?"Do you really want to delete this draft?":"Do you really want to discard your message?");this.app.getWindow&&this.app.getWindow().floating?this.app.getWindow().floating.toggle(!0):_.device("smartphone")&&this.app.getWindow().resume(),e=$.Deferred(),new c.ModalDialog({width:550,container:_.device("smartphone")?t.$el.closest(".window-container-center"):$("#io-ox-core")}).text(s).addPrimaryButton("delete",n,"delete").addAlternativeButton("savedraft",a,"savedraft").addButton("cancel",d("Cancel"),"cancel").show().then(function(n){if("delete"===n){var a=t.config.get("autoDiscard"),s=t.model.get("meta").editFor;if(e.resolve(),!i||!a||!s)return;o.remove([{id:s.originalId,folder_id:s.originalFolderId}])}else"savedraft"===n?t.saveDraft().then(e.resolve,e.reject):e.reject()})}return e.then(function(){t.clean()})},send:function(){var t=d("[Copy] ");if(0===(this.model.get("subject")||"").indexOf(t)){var i=this.model.get("subject");i=i.replace(t,""),this.model.set("subject",i)}this.trigger("updateTokens");var o=this,n=new e.Baton({model:this.model,config:this.config,app:this.app,view:o,catchErrors:!0}),a=this.app.getWindow(),s=e.point("io.ox/mail/compose/actions/send");return a.busy(),this.model.saving=!0,s.cascade(this,n).then(function(){}).always(function(){(n.rejected||n.error)&&n.config.set("autoDismiss",!1),this.model&&(this.model.saving=!1),a.idle()}.bind(this))},onTouchStart:function(){$(document.activeElement).is("iframe")&&$(document.activeElement).blur()},toggleTokenfield:function(t){var e,i="string"==typeof t,o=i?t:$(t.target).attr("data-type");if(_.device("smartphone"))return i||t.preventDefault(),(e=this.$el.find('[data-extension-id="cc"], [data-extension-id="bcc"]')).hasClass("hidden")?(e.removeClass("hidden"),this.$el.find('[data-action="add"] span').removeClass("fa-angle-right").addClass("fa-angle-down")):_.isEmpty(this.model.attributes.cc)&&_.isEmpty(this.model.attributes.bcc)&&(this.model.set("cc",[]),this.model.set("bcc",[]),e.addClass("hidden"),this.$el.find('[data-action="add"] span').removeClass("fa-angle-down").addClass("fa-angle-right")),e;var n=this.$el.find('[data-type="'+o+'"]');return e=this.$el.find('[data-extension-id="'+o+'"]'),i||t.preventDefault(),e.hasClass("hidden")||i?(e.removeClass("hidden"),n.addClass("active"),"cc"===o&&n.attr("title",d("Hide carbon copy input field")),"bcc"===o&&n.attr("title",d("Hide blind carbon copy input field"))):this.model.has(o)&&!_.isEmpty(this.model.get(o))||(this.model.set(o,[]),e.addClass("hidden"),n.removeClass("active"),"cc"===o&&n.attr("title",d("Show carbon copy input field")),"bcc"===o&&n.attr("title",d("Show blind carbon copy input field"))),$(window).trigger("resize"),e},loadEditor:function(t){var i=this.config.get("editorMode"),o=new e.Baton({view:this,model:this.model,config:this.config,content:t});return(this.editorHash[i]=this.editorHash[i]||e.point(m+"/editor/load").cascade(this.app,o)).then(function(t){return o.editor=t,e.point(m+"/editor/use").cascade(this.app,o)}.bind(this))},getEditor:function(){var t=$.Deferred();return this.editor?(t.resolve(this.editor),t):this.loadEditor()},toggleEditorMode:function(){var t,e=this;return this.editor?(t=this.editor.getPlainText(),this.editor.hide()):t="text/html"===this.model.get("contentType")&&"text"===this.config.get("editorMode")?require(["io.ox/core/tk/textproc"]).then(function(t){return t.htmltotext(e.model.get("content"))}):this.model.get("content"),this.editorContainer.busy(),$.when(t).then(function(t){return e.loadEditor(t)}).then(function(){this.editorContainer.idle(),_.isFunction(this.editor.tinymce)&&this.editor.tinymce().undoManager.clear()}.bind(this))},onAttachVcard:function(){1===this.config.get("vcard")&&this.model.attachVCard(),this.config.set("vcard",0)},syncMail:function(){this.editor&&this.model.set("content",this.editor.getContent())},setBody:function(t){this.model.get("initial")&&(t=(t=String(t||"").replace(/^[\s\xA0]*\n([\s\xA0]*\S)/,"$1")).replace(/[\s\uFEFF\xA0]+$/,"")),"new"!==this.model.get("meta").type&&(t=t.replace(/\n<br>&nbsp;$/,"\n")),this.setSimpleMail(t),this.editor.setContent(t),this.model.get("initial")&&this.prependNewLine()},getParagraph:function(t,e){var i=$('<div class="io-ox-signature">').append(e?t:this.editor.ln2br(t));return $("<div>").append(i).html()},prependNewLine:function(){if("edit"!==this.config.get("type")){var t=this.editor.getContent().replace(/^\n+/,"").replace(/^(<div[^>]*class="default-style"[^>]*><br><\/div>)+/,""),e="html"===this.config.get("editorMode")?n.getDefaultStyle().node.get(0).outerHTML:"\n";this.editor.setContent(e+t)}},setMail:function(){var t=this,e=this.model,i=this.config;return this.toggleEditorMode().then(function(){return t.signaturesLoading}).done(function(){var o;if(_.device("!ios")&&(o=i.is("new|forward")?t.$(".tokenfield:first .token-input"):t.editor),i.is("replyall|edit")&&(_.isEmpty(e.get("cc"))||t.toggleTokenfield("cc")),_.isEmpty(e.get("bcc"))||t.toggleTokenfield("bcc"),t.setBody(e.get("content")),_.device("!ios")&&t.editor.tinymce){var n=a.get("defaultFontStyle",{}),s=(n.family||"").split(",")[0];_.isEmpty(n)||(s&&"browser-default"!==s&&t.editor.tinymce().execCommand("fontName",!1,s),n.size&&"browser-default"!==n.size&&t.editor.tinymce().execCommand("fontSize",!1,n.size))}o&&o.focus()})},setSimpleMail:function(t){"text"!==this.config.get("editorMode")&&(/<table/.test(t)||this.editorContainer.find(".editable.mce-content-body").addClass("simple-mail"))},focusEditor:function(){this.editor.focus()},flagSubjectField:function(t){var e=$(t.target);if(13===t.which)return e.attr("data-enter-keydown",!0)},focusSendButton:function(t){(t.metaKey||t.ctrlKey)&&13===t.which&&(t.preventDefault(),this.$el.parents().find('button[data-action="send"]').focus())},render:function(){var t=this,i=$('<div class="mail-compose-fields">');return e.point(m+"/fields").invoke("draw",i,this.baton),this.$el.append(i),this.setTitle(),this.$el.find("input.tokenfield").each(function(){$(this).data("bs.tokenfield").$input.on({compositionstart:function(){$(this).attr("data-ime","active")},compositionend:function(){$(this).attr("data-ime","inactive")},keydown:function(t){13===t.which&&"active"!==$(this).attr("data-ime")&&$(this).val("")},keyup:function(e){if(13!==e.which&&!_.device("smartphone")){var i=$(this).val();/^to:?\s/i.test(i)?$(this).typeahead("val",""):/^cc:?\s/i.test(i)?($(this).typeahead("val",""),t.toggleTokenfield("cc").find(".token-input").focus()):/^bcc:?\s/i.test(i)&&($(this).typeahead("val",""),t.toggleTokenfield("bcc").find(".token-input").focus())}}})}),this.$el.append(this.editorContainer),this}})});