define("io.ox/mail/settings/compose/settings/pane",["io.ox/core/extensions","io.ox/backbone/views/extensible","io.ox/core/api/account","io.ox/core/settings/util","io.ox/backbone/mini-views","io.ox/backbone/mini-views/dropdown","io.ox/backbone/mini-views/colorpicker","io.ox/core/capabilities","io.ox/core/api/user","io.ox/contacts/api","io.ox/mail/util","settings!io.ox/mail","gettext!io.ox/mail"],function(e,t,n,a,o,i,l,s,r,d,c,u,f){"use strict";function p(e){return u.isConfigurable(e)}var m=0;e.point("io.ox/mail/settings/compose/settings/detail").extend({index:100,id:"view",draw:function(){this.append(new t({point:"io.ox/mail/settings/compose/settings/detail/view",model:u}).inject({getForwardOptions:function(){return[{label:f("Inline"),value:"Inline"},{label:f("Attachment"),value:"Attachment"}]},getFormatOptions:function(){return[{label:f("HTML"),value:"html"},{label:f("Plain text"),value:"text"},{label:f("HTML and plain text"),value:"alternative"}]},getFontNameOptions:function(){return[{label:f("Use browser default"),value:"browser-default"}].concat(c.getFontFormats().split(";").filter(function(e){return!/^(Web|Wing)dings/.test(e)}).map(function(e){return e=e.split("="),{label:e[0],value:e[1]}}))},getFontSizeOptions:function(){return[{label:f("Use browser default"),value:"browser-default"},{label:"8pt",value:"8pt"},{label:"10pt",value:"10pt"},{label:"11pt",value:"11pt"},{label:"12pt",value:"12pt"},{label:"13pt",value:"13pt"},{label:"14pt",value:"14pt"},{label:"16pt",value:"16pt"}]},fetchAccounts:function(){return n.getSenderAddresses(0).then(function(e){return _(e).map(function(e){return{value:e[1],label:e[1]}})})},render:function(){return this.fetchAccounts().done(function(e){this.getSenderOptions=function(){return e},t.prototype.render.apply(this)}.bind(this)),this}}).build(function(){this.listenTo(u,"change",function(){u.saveAndYell()})}).render().$el)}}),e.point("io.ox/mail/settings/compose/settings/detail/view").extend({id:"header",index:m+=100,render:function(){this.$el.append(a.header(f.pgettext("settings","Mail Compose")))}},{id:"format",index:m+=100,render:function(){p("messageFormat")&&(_.device("smartphone")||this.$el.append(a.fieldset(f("Format emails as"),new o.CustomRadioView({list:this.getFormatOptions(),name:"messageFormat",model:u}).render().$el)))}},{id:"defaultStyle",index:m+=100,render:function(){function e(){var e=this.$ul.find('[data-name="'+this.options.name+'"]'),t=this;e.children("i").attr("class","fa fa-fw fa-none"),e.each(function(){var e=$(this);e.filter("[role=menuitemcheckbox][aria-checked]").attr({"aria-checked":_.isEqual(e.data("value"),t.model.get(t.options.name))}),_.isEqual(e.data("value"),t.model.get(t.options.name))&&e.children("i").attr("class","fa fa-fw fa-check")}),this.label()}function t(){var e={"font-size":u.get("defaultFontStyle/size","browser-default"),"font-family":u.get("defaultFontStyle/family","browser-default"),color:u.get("defaultFontStyle/color","transparent")};return"browser-default"===e["font-size"]&&(e["font-size"]=""),"browser-default"===e["font-family"]&&(e["font-family"]=""),"transparent"===e.color&&(e.color=""),e}if(!_.device("smartphone")){var n,o=new i({caret:!0,model:u,label:f("Font"),tagName:"div",className:"dropdown fontnameSelectbox",update:e,name:"defaultFontStyle/family"}),s=new i({caret:!0,model:u,label:f("Size"),tagName:"div",className:"dropdown fontsizeSelectbox",update:e,name:"defaultFontStyle/size"});_(this.getFontNameOptions()).each(function(e,t){1===t&&o.divider(),o.option("defaultFontStyle/family",e.value,e.label,{radio:!0})}),_(this.getFontSizeOptions()).each(function(e,t){1===t&&s.divider(),s.option("defaultFontStyle/size",e.value,e.label,{radio:!0})}),u.on("change:defaultFontStyle/size change:defaultFontStyle/family change:defaultFontStyle/color",function(){n.css(t()),u.save()}),_(o.$ul.find("a")).each(function(e,t){0!==t&&$(e).css("font-family",$(e).data("value"))}),_(void 0).each(function(e){e.toggle("text"!==u.get("messageFormat"))}),u.on("change:messageFormat",function(e){_(void 0).each(function(t){t.toggle("text"!==e)})}),this.$el.append(a.fieldset(f("Default font style"),$("<div>").css("margin","8px 0").append(o.render().$el,s.render().$el,$('<div class="fontcolorButton">').append(new l({name:"defaultFontStyle/color",model:u,className:"dropdown",label:f("Color"),caret:!0}).render().$el)),n=$('<div class="example-text">').text(f("This is how your message text will look like.")).css(t())))}}},{id:"forward",index:m+=100,render:function(){p("forwardMessageAs")&&this.$el.append(a.fieldset(f("Forward emails as"),new o.CustomRadioView({list:this.getForwardOptions(),name:"forwardMessageAs",model:u}).render().$el))}},{id:"advanced",index:m+=100,render:function(){s.has("guest")||this.$el.append(a.fieldset(f("Advanced settings"),$('<div class="form-group">').append(a.checkbox("appendVcard",f("Append vCard"),u),a.checkbox("appendMailTextOnReply",f("Insert the original email text to a reply"),u),a.checkbox("confirmReplyToMailingLists",f("Confirm recipients when replying to a mailing list"),u)),a.compactSelect("defaultSendAddress",f("Default sender address"),u,this.getSenderOptions()),$('<div class="form-group row">').append($('<div class="col-md-9">').append($('<label for="autobcc">').text(f("Always add the following recipient to blind carbon copy (BCC)")),new o.InputView({name:"autobcc",model:u,className:"form-control",id:"autobcc"}).render().$el))))}})});