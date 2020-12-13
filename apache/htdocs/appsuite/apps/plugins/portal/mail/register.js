define("plugins/portal/mail/register",["io.ox/core/extensions","io.ox/mail/api","io.ox/mail/util","io.ox/core/api/account","io.ox/portal/widgets","io.ox/backbone/views/modal","gettext!plugins/portal","io.ox/backbone/views/disposable","io.ox/core/api/collection-loader","io.ox/core/capabilities","io.ox/core/http","settings!io.ox/mail","less!plugins/portal/mail/style"],function(e,t,i,o,n,a,l,r,s,d,c,u){"use strict";function p(e){var i=this.busy();require(["io.ox/mail/detail/view"],function(o){var n=t.reduce(e.item);t.get(n).done(function(e){var t=new o.View({data:e,disable:{"io.ox/mail/detail/header/row3":"different-subject"}});i.idle().empty().append(t.render().expand().$el.addClass("no-padding")),e=null,t.listenTo(t.model,"remove",function(){i.trigger("close")})})})}function m(e){var i=e.model.get("props",{});return i.id?$.when("default"+i.id+"/INBOX"):o.getUnifiedMailboxName().then(function(e){return e?e+"/INBOX":t.getDefaultFolder()})}function f(e){require(["io.ox/portal/main"],function(t){e.collection.expired=!0,t.getApp().refreshWidget(e.model,0)})}var h=r.extend({tagName:"li",className:"item",initialize:function(){this.listenTo(this.model,"change",this.render)},render:function(t){var o=this,n=this.model.get("subject")?_.ellipsis(this.model.get("subject"),{max:50}):l("No subject"),a=moment(this.model.get("received_date")).format("l");return this.$el.empty().data("item",this.model.attributes).append($('<div class="row1">').append(function(){if(0==(32&o.model.get("flags")))return $('<i class="fa fa-circle new-item accent">')}(),$('<div class="from">').attr("title",this.model.get("from")[0][1]).append($('<span class="flags">'),$('<div class="person">').text(_.noI18n(i.getDisplayName(this.model.get("from")[0]))),$.txt(" ")),$('<div class="date accent">').text(_.noI18n(a))),$('<div class="row2">').append($('<div class="subject ellipsis">').text(n),$.txt(" "))),e.point("io.ox/mail/portal/list/item").invoke("customize",this.$el,this.model.toJSON(),t,this.$el),this}}),g=r.extend({tagName:"ul",className:"mailwidget content list-unstyled",initialize:function(){this.listenTo(this.collection,"add remove set",this.render),this.listenTo(this.collection,"expire",this.onExpire)},onExpire:function(){this.collection.expired=!1},render:function(e){return this.collection.length>0?this.$el.empty().append(_(this.collection.first(10)).map(function(t){return new h({model:t}).render(e).$el})):this.$el.empty().append($("<li>").text(l("No mails in your inbox"))),this}});e.point("io.ox/portal/widget/mail").extend({title:l("Inbox"),initialize:function(e){return e.collectionLoader=new s({module:"mail",getQueryParams:function(e){return{action:"all",folder:e.folder,columns:c.defaultColumns.mail.all,sort:e.sort||"610",order:e.order||"desc",timezone:"utc",deleted:!u.get("features/ignoreDeleted",!1)}}}),e.collectionLoader.each=function(e){t.pool.add("detail",e)},e.loadCollection=function(e){var t=new $.Deferred;return this.collectionLoader.load({folder:e}).once("load",function(){t.resolve(),this.off("load:fail")}).once("load:fail",function(e){t.reject(e),this.off("load")}),t},$.when(m(e)).done(function(i){t.on("refresh.all",_.partial(f,e)),t.on("update",function(t,o,n){n===i&&f(e)})})},load:function(e){return $.when(m(e)).then(function(i){var o=e.collectionLoader,n=o.getQueryParams({folder:i});return e.folder=i,e.collection=o.getCollection(n),i?0===e.collection.length||e.collection.expired?e.loadCollection(i):$.when():$.Deferred().reject({error:t.mailServerDownMessage,retry:!1})})},summary:function(e){function t(e){var t=e.get("unread");if(!t)return i.text(l("You have no unread messages"));i.text(l.format(l.ngettext("You have %1$d unread message","You have %1$d unread messages",t),t))}if(!this.find(".summary").length){var i=$('<div class="summary">');require(["io.ox/core/folder/api"],function(o){var n=o.pool.getModel(e.folder);t(n),this.append(i).addClass("with-summary show-summary"),n.on("change:unread",t)}.bind(this)),this.on("tap","h2, .summary",function(e){return $(e.delegateTarget).toggleClass("show-summary"),!1})}},preview:function(e){this.append(new g({collection:e.collection}).render(e).$el)},draw:p}),e.point("io.ox/portal/widget/mail/settings").extend({title:l("Inbox"),type:"mail",editable:!0,edit:function(e,t){e.set("candidate",!0,{silent:!0,validate:!0});var i=new a({title:l("Inbox"),async:!0}),n=e.get("props")||{};o.all().then(function(o){var a,r,s=_(o).map(function(e){return $("<option>").val(e.id).text(e.name).prop("selected",n.id&&n.id===String(e.id))});i.build(function(){var e=_.uniqueId("form-control-label-"),t=_.uniqueId("form-control-label-");this.$body.append(d.has("multiple_mail_accounts")?$('<div class="form-group">').append($("<label>").attr("for",e).text(l("Account")),a=$('<select class="form-control">').attr("id",e).prop("disabled",s.length<=1).append(s)):$(),$('<div class="form-group">').append($("<label>").attr("for",t).text(l("Description")),r=$('<input type="text" class="form-control">').attr("id",t).val(n.name||l("Inbox")),$('<div class="alert alert-danger">').css("margin-top","15px").hide()))}).addCancelButton().addButton({label:l("Save"),action:"save"}).on("show",function(){s.length>1?(n.name||a.on("change",function(){r.val(l("Inbox")+" ("+$("option:selected",this).text()+")")}).change(),a.focus()):r.focus()}).open(),i.on("save",function(){var t=$.trim(r.val()),o={name:t};s.length>1&&(o.id=a.val()),e.set({title:t,props:o}).unset("candidate"),i.close()}).on("cancel",function(){e.has("candidate")&&_.isEmpty(e.attributes.props)&&t.removeWidget()})})},unique:!d.has("multiple_mail_accounts")}),e.point("io.ox/portal/widget/stickymail").extend({type:"mail",load:function(e){var i=e.model.get("props")||{},o=function(a,l){_(l).chain().map(_.cid).contains(_.cid(i)).value()&&(t.off("deleted-mails",o),n.getCollection().remove(e.model))};return t.get({folder:i.folder_id,id:i.id,view:"text",unseen:!0},{cache:!1}).then(function(i){e.data=i,t.on("deleted-mails",o)},function(e){throw"MSG-0032"===e.code?"remove":e})},preview:function(e){var t=e.data,o=moment(t.received_date).format("l"),n=_(t.attachments).reduce(function(e,t){return e+("text/plain"===t.content_type?t.content:"")},"");this.append($('<div class="content">').append($('<div class="item">').data("item",t).append($('<span class="bold">').text(i.getDisplayName(t.from[0])),$.txt(" "),$('<span class="normal">').text(_.ellipsis(t.subject,{max:100})),$.txt(" "),$('<span class="accent">').text(o),$.txt(" "),$('<span class="gray">').text(_.ellipsis(n,{max:600})))))},draw:p})});