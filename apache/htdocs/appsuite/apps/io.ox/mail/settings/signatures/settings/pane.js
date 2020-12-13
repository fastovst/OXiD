define("io.ox/mail/settings/signatures/settings/pane",["io.ox/core/extensions","io.ox/backbone/views/extensible","gettext!io.ox/mail","settings!io.ox/mail","io.ox/core/settings/util","io.ox/backbone/views/modal","io.ox/core/api/snippets","io.ox/backbone/mini-views","io.ox/core/config","io.ox/core/notifications","io.ox/backbone/mini-views/listutils","io.ox/mail/util","io.ox/mail/api","io.ox/backbone/mini-views/settings-list-view","io.ox/core/tk/contenteditable-editor","io.ox/mail/compose/inline-images","static/3rd.party/purify.min.js","less!io.ox/mail/settings/signatures/style"],function(e,t,i,n,a,o,r,s,l,d,u,c,p,g,m,f,v){"use strict";function h(t,a){return a=a||{id:null,name:"",signature:"",misc:{insertion:n.get("defaultSignaturePosition","below")}},new o({width:640,async:!0,title:i(a.id?"Edit signature":"Add signature"),point:"io.ox/mail/settings/signature-dialog/edit"}).inject({getSignature:function(){return a},validateName:function(){var e=this.$("#signature-name"),t=this.$(".help-block.error"),n=""!==$.trim(e.val());if(e.toggleClass("error",!n),n)return e.removeAttr("aria-invalid aria-describedby"),t.empty();e.attr({"aria-invalid":!0,"aria-describedby":t.attr("id")}),t.text(i("Please enter a valid name"))}}).build(function(){this.$el.addClass("io-ox-signature-dialog")}).addCancelButton().addButton({action:"save",label:i("Save")}).on("save",function(){if(this.validateName(),this.$("input.error").length)return this.idle().$("input.error").first().focus();var t=new e.Baton({view:this});return e.point("io.ox/mail/settings/signature-dialog/save").cascade(this,t).always(function(){this&&this.idle&&this.idle()}.bind(this))}).on("close",function(){this.editor&&this.editor.destroy()}).open()}function x(e){return/(<\/?\w+(\s[^<>]*)?>)/.test(e||"")}function b(e){return e=$.trim(e),e=e.replace(/^<pre>([\s\S]+)<\/pre>$/,"$1"),x(e)?e.replace(/[\r\n\t]/g,"").replace(/(<br>|<br><\/div>|<\/div>|<\/p>)/gi,"\n").replace(/<(?:.|\n)*?>/gm,"").replace(/\n+/g,"<br>"):_.escape(e).replace(/\n+/g,"<br>")}function w(e){var t=l.get("gui.mail.signatures");return new o({width:640,async:!0,title:i("Import signatures"),point:"io.ox/mail/settings/signature-dialog/import",model:new Backbone.Model}).build(function(){this.$body.append($('<p class="help-block">').text(i("You can import all existing signatures from the previous product generation at once.")),a.checkbox("delete",i("Delete old signatures after import"),this.model),$('<ul class="io-ox-signature-import">').append(_(t).map(function(e){var t=b(e.signature_text);return""!==t&&"<br>"!==t||(t=$("<i>").text(i("No preview available"))),$("<li>").append($('<div class="signature-name">').text(e.signature_name),$('<div class="signature-preview">').append(t))})))}).addCancelButton().addButton({action:"import",label:i("Import")}).on("import",function(){var i=this,n=$(e.target),a=_(t).map(function(e){return r.create({type:"signature",module:"io.ox/mail",displayname:e.signature_name,content:e.signature_text,misc:{insertion:e.position,"content-type":"text/html"},meta:{imported:e}}).fail(d.yell)});$.when.apply($,a).then(function(){i.model.get("delete")&&(n.remove(),l.remove("gui.mail.signatures"),l.save()),i.close()},function(){i.idle()})}).open()}e.point("io.ox/mail/settings/signature-dialog/edit").extend({id:"name",index:100,render:function(){var e=this.getSignature();this.$body.append($('<div class="form-group">').append($('<label for="signature-name" class="sr-only">').text(i("Signature name")),$('<input id="signature-name" type="text" class="form-control">').attr("placeholder",i("Signature name")).val(e.displayname).on("change",this.validateName.bind(this)))),_.defer(function(){this.$("#signature-name").focus()}.bind(this))}}),e.point("io.ox/mail/settings/signature-dialog/edit").extend({id:"error",index:200,render:function(){this.$body.append($('<div class="help-block error">').attr("id",_.uniqueId("error-help-")))}}),e.point("io.ox/mail/settings/signature-dialog/edit").extend({id:"editor",index:300,render:function(e){var t,i=e.view.getSignature();this.$body.append($('<div class="form-group">').css({"min-height":"266px",height:"266px"}).append(t=$('<div class="editor">').attr("data-editor-id",_.uniqueId("editor-")))),new m(t,{toolbar1:"bold italic | alignleft aligncenter alignright | link image",advanced:"fontselect fontsizeselect forecolor | code",css:{"min-height":"230px",height:"230px","overflow-y":"auto"},height:230,plugins:"autolink oximage oxpaste oxdrop link paste textcolor emoji lists code",class:"io-ox-signature-edit",keepalive:p.keepalive,scrollpane:t,oxContext:{signature:!0},imageLoader:{upload:function(t){return f.api.inlineImage({file:t,editor:e.view.editor.tinymce()})},getUrl:function(e){return f.api.getInsertedImageUrl(e)}}}).done(function(t){if(t.show(),i.content=i.content||"",i.content&&!x(i.content)){var n=String(i.content).replace(/[\s\xA0]+$/g,"");i.content=$("<p>").append(t.ln2br(n)).prop("outerHTML")}i.content&&(i.content=v.sanitize(i.content)+""),t.setContent(i.content),e.view.editor=t})}}),e.point("io.ox/mail/settings/signature-dialog/edit").extend({id:"position",index:400,render:function(){var e=this.getSignature();this.$body.append($('<div class="form-group">').append($('<select id="signature-position" class="form-control">').append($('<option value="above">').text(i("Add signature above quoted text")),$('<option value="below">').text(i("Add signature below quoted text"))).val(e.misc.insertion)))}}),e.point("io.ox/mail/settings/signature-dialog/save").extend({id:"default",index:100,perform:function(e){var t=this.getSignature();e.data={id:t.id,type:"signature",module:"io.ox/mail",displayname:this.$("#signature-name").val(),misc:{insertion:e.view.$("#signature-position").val(),"content-type":"text/html"}}}},{id:"wait-for-pending-images",index:100,perform:function(e){var t=e.view.editor.tinymce();if(e.data.content=e.view.editor.getContent({format:"html"}),!t||!t.plugins.oximage)return $.when();var i=$('img[data-pending="true"]',t.getElement()).map(function(){return $(this).attr("data-id")}),n=t.plugins.oximage.getPendingDeferreds(i);return $.when.apply($,n).then(function(){e.data.content=e.view.editor.getContent({format:"html"})})}},{id:"trailing-whitespace",index:100,perform:function(e){e.data&&e.data.content&&(e.data.content=e.data.content.replace(/(<br>)\s+(\S)/g,"$1$2"))}},{id:"save",index:1e3,perform:function(e){return(e.data.id?r.update(e.data):r.create(e.data)).done(function(){r.getAll("signature").done(function(t){1===t.length&&n.set("defaultSignature",t[0].id).save(),e.view.close()})}).fail(function(t){d.yell(t),e.view.idle()})}}),e.point("io.ox/mail/settings/signatures/settings/detail").extend({id:"view",index:100,draw:function(){this.append(new t({point:"io.ox/mail/settings/signatures/detail/view",model:n}).build(function(){this.listenTo(n,"change",function(){n.saveAndYell().done(function(){p.updateViewSettings()})})}).render().$el)}}),e.point("io.ox/mail/settings/signatures/detail/view").extend({id:"header",index:100,render:function(){this.$el.addClass("io-ox-signature-settings").append(a.header(i(_.device("smartphone")?"Signature":"Signatures")))}},{id:"buttons",index:200,render:function(){if(!_.device("smartphone")){var e=$('<div class="form-group buttons">').append($('<button type="button" class="btn btn-primary">').append($('<i class="fa fa-plus" aria-hidden="true">'),$.txt(i("Add new signature"))).on("click",h));l.get("gui.mail.signatures")&&!_.isNull(l.get("gui.mail.signatures"))&&l.get("gui.mail.signatures").length>0&&e.append($('<button type="button" class="btn btn-default">').text(i("Import signatures")+" ...").on("click",w)),this.$el.append(e)}}},{id:"collection",index:300,render:function(){function e(){r.getAll("signature").then(function(e){t.reset(e)})}if(!_.device("smartphone")){var t=this.collection=new Backbone.Collection;e(),r.on("refresh.all",e),this.on("dispose",function(){r.off("refresh.all",e)})}}},{id:"list-view",index:400,render:function(){function e(e){if("click"===e.type||13===e.which){var t=$(e.currentTarget).closest("li").attr("data-id");h(e,this.collection.get(t).toJSON()),e.preventDefault()}}if(!_.device("smartphone")){var t=this,a=_.throttle(function(){var e=c.getDefaultSignature("new"),t=c.getDefaultSignature("reply/forward");this.$(".default").removeClass("default").find(">.default-label").remove(),this.$('[data-id="'+t+'"]').addClass("default").append($('<div class="default-label">').append($('<span class="label label-primary">').text(i(e===t?"Default signature":"Default signature for replies or forwardings")))),e!==t&&this.$('[data-id="'+e+'"]').addClass("default").append($('<div class="default-label">').append($('<span class="label label-default">').text(i("Default signature for new messages"))))}.bind(this),100);this.$el.append(new g({tagName:"ul",collection:this.collection,childOptions:{titleAttribute:"displayname",customize:function(i){var n=b(i.get("content"));this.$(".list-item-controls").append(u.controlsEdit(),u.controlsDelete()),this.$el.append($('<div class="signature-preview">').append($("<div>").on("click",e.bind(t)).append(n))),a()}}}).on("edit",e).on("delete",function(e){var t=$(e.currentTarget).closest("li").attr("data-id");c.getDefaultSignature("new")===t&&n.set("defaultSignature",""),c.getDefaultSignature("reply/forward")===t&&n.set("defaultReplyForwardSignature",""),r.destroy(t).fail(d.yell),e.preventDefault()}).render().$el),this.listenTo(n,"change:defaultSignature change:defaultReplyForwardSignature",a)}}},{id:"selection",index:500,render:function(){function e(e){return $("<option>").attr({value:e.get("id")}).text(e.get("displayname"))}if(!_.device("smartphone")){var t=new s.SelectView({list:[],name:"defaultSignature",model:n,id:"defaultSignature"}),a=new s.SelectView({list:[],name:"defaultReplyForwardSignature",model:n,id:"defaultReplyForwardSignature"});this.collection.on("reset",function(){t.$el.empty().append($('<option value="">').text(i("No signature")),this.map(e)).val(c.getDefaultSignature("new")),a.$el.empty().append($('<option value="">').text(i("No signature")),this.map(e)).val(c.getDefaultSignature("reply/forward"))}),this.$el.append($('<div class="row">').append($('<div class="form-group col-xs-12 col-md-6">').append($('<label for="defaultSignature" class="control-label">').text(i("Default signature for new messages")),$('<div class="controls">').append(t.render().$el)),$('<div class="form-group col-xs-12 col-md-6">').append($('<label for="defaultReplyForwardSignature" class="control-label">').text(i("Default signature for replies or forwards")),$('<div class="controls">').append(a.render().$el)))),this.collection.trigger("reset")}}},{id:"smartphone",index:1e3,render:function(){function e(){var e=t.prop("checked")?"custom":"none";n.set("mobileSignatureType",e)}if(!_.device("!smartphone")){var t,a,o=n.get("mobileSignatureType");"custom"!==o&&(o="none"),this.$el.append($('<div class="form-group">').append($('<div class="radio">').append($("<label>").append($('<input type="radio" name="mobileSignature">').prop("checked","none"===o),i("No signature")).on("change",e)),$('<div class="radio">').append($("<label>").append(t=$('<input type="radio" name="mobileSignature">').prop("checked","custom"===o).on("change",e),a=$('<textarea class="form-control col-xs-12" rows="5">').val(n.get("mobileSignature")).on("change",function(){n.set("mobileSignature",a.val())})))))}}})});