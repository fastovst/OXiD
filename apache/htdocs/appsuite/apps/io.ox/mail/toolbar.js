define.async("io.ox/mail/toolbar",["io.ox/core/extensions","io.ox/backbone/views/actions/util","io.ox/core/tk/flag-picker","io.ox/mail/api","io.ox/core/capabilities","io.ox/backbone/mini-views/dropdown","io.ox/backbone/views/toolbar","io.ox/core/api/mailfilter","settings!io.ox/core","settings!io.ox/mail","gettext!io.ox/mail","io.ox/mail/actions","less!io.ox/mail/style","io.ox/mail/folderview-extensions"],function(o,i,e,t,a,n,l,r,s,c,p){"use strict";function d(){if(this.model){var o=this.$el.find('[data-name="contactPictures"]').parent(),i=this.model.get("layout");"vertical"===i||"compact"===i?o.show():o.hide()}}function m(o,i){i.preventDefault(),require(["io.ox/mail/statistics"]).done(function(i){i.open(o)})}function f(o,i){i.preventDefault();var e=s.get("folder/mailattachments",{});ox.launch("io.ox/files/main",{folder:e.all}).done(function(){this.folder.set(e.all)})}function u(o){require(["io.ox/mail/categories/edit"],function(i){i.open(o)})}function x(o){o.preventDefault(),require(["io.ox/mail/mailfilter/vacationnotice/view"],function(o){o.open()})}var h=o.point("io.ox/mail/toolbar/links"),g=$.when(),b={compose:{prio:"hi",mobile:"hi",title:p("Compose"),tooltip:p("Compose new email"),drawDisabled:!0,ref:"io.ox/mail/actions/compose"},edit:{prio:"hi",mobile:"lo",title:p("Edit draft"),ref:"io.ox/mail/actions/edit"},"edit-copy":{prio:"hi",mobile:"lo",title:p("Edit copy"),ref:"io.ox/mail/actions/edit-copy"},reply:{prio:"hi",mobile:"lo",icon:"fa fa-reply",title:p("Reply to sender"),drawDisabled:!0,ref:"io.ox/mail/actions/reply"},"reply-all":{prio:"hi",mobile:"lo",icon:"fa fa-reply-all",title:p("Reply to all recipients"),drawDisabled:!0,ref:"io.ox/mail/actions/reply-all"},forward:{prio:"hi",mobile:"lo",icon:"fa fa-mail-forward",title:p("Forward"),drawDisabled:!0,ref:"io.ox/mail/actions/forward"},delete:{prio:"hi",mobile:"lo",icon:"fa fa-trash-o",title:p("Delete"),drawDisabled:!0,ref:"io.ox/mail/actions/delete"},spam:{prio:"hi",mobile:"lo",icon:"fa fa-ban",title:p("Mark as spam"),ref:"io.ox/mail/actions/spam"},nospam:{prio:"hi",mobile:"lo",icon:"fa fa-thumbs-up",title:p("Not spam"),ref:"io.ox/mail/actions/nospam"},category:{prio:"hi",mobile:"none",icon:"fa fa-folder-open-o",title:p("Set category"),ref:"io.ox/mail/actions/category",customize:function(o){c.get("categories/enabled")&&require(["io.ox/mail/categories/picker"],function(i){i.attach(this,{props:o.app.props,data:o.data})}.bind(this))}},color:{prio:"hi",mobile:"none",icon:"fa fa-bookmark-o",title:p("Set color"),ref:"io.ox/mail/actions/color",customize:function(o){c.get("features/flag/color")&&e.attach(this,{data:o.data})}},flag:{prio:"hi",mobile:"lo",icon:"fa fa-star",title:p.pgettext("verb","Flag"),ref:"io.ox/mail/actions/flag"},unflag:{prio:"hi",mobile:"lo",icon:"fa fa-star-o",title:p.pgettext("verb","Unflag"),ref:"io.ox/mail/actions/unflag"},archive:{prio:"hi",mobile:"lo",icon:"fa fa-archive",title:p.pgettext("verb","Archive"),ref:"io.ox/mail/actions/archive"},"mark-read":{prio:"lo",mobile:"lo",title:p("Mark as read"),ref:"io.ox/mail/actions/mark-read",section:"flags"},"mark-unread":{prio:"lo",mobile:"lo",title:p("Mark as unread"),ref:"io.ox/mail/actions/mark-unread",section:"flags"},move:{prio:"lo",mobile:"lo",title:p("Move"),ref:"io.ox/mail/actions/move",section:"file-op"},copy:{prio:"lo",mobile:"lo",title:p("Copy"),ref:"io.ox/mail/actions/copy",section:"file-op"},print:{prio:"lo",mobile:"lo",title:p("Print"),ref:"io.ox/mail/actions/print",section:"export"},"save-as-eml":{prio:"lo",mobile:"lo",title:p("Save as file"),ref:"io.ox/mail/actions/save",section:"export"},source:{prio:"lo",mobile:"none",title:p("View source"),ref:"io.ox/mail/actions/source",section:"export"},reminder:{prio:"lo",mobile:"none",title:p("Reminder"),ref:"io.ox/mail/actions/reminder",section:"keep"},"add-to-portal":{prio:"lo",mobile:"none",title:p("Add to portal"),ref:"io.ox/mail/actions/add-to-portal",section:"keep"}},v=0;_(b).each(function(o,i){h.extend(_.extend({id:i,index:v+=100},o))});var w=i.Action;return new w("io.ox/mail/actions/category",{capabilities:"mail_categories",collection:"some",matches:function(o){return!!o.app.props.get("categories")},action:$.noop}),new w("io.ox/mail/actions/color",{toggle:c.get("features/flag/color"),collection:"some",action:$.noop}),o.point("io.ox/mail/toolbar/links").extend({id:"view-dropdown",index:1e4,custom:!0,draw:function(i){if(!_.device("smartphone")){var e=new n({el:this,caret:!0,model:i.app.props,label:p("View")});e.render().$el.addClass("dropdown pull-right").attr("data-dropdown","view"),o.point("io.ox/mail/toolbar/links/view-dropdown").invoke("draw",e,i)}}}),o.point("io.ox/mail/toolbar/links/view-dropdown").extend({id:"layout",index:100,draw:function(){this.group(p("Layout")).option("layout","vertical",p("Vertical"),{radio:!0,group:!0}),_.device("desktop")&&this.option("layout","compact",p("Compact"),{radio:!0,group:!0}),this.option("layout","horizontal",p("Horizontal"),{radio:!0,group:!0}).option("layout","list",p("List"),{radio:!0,group:!0}).divider()}}),o.point("io.ox/mail/toolbar/links/view-dropdown").extend({id:"categories",index:200,draw:function(o){a.has("mail_categories")&&!_.device("smartphone")&&this.group(p("Inbox")).option("categories",!0,p("Use categories"),{group:!0}).link("categories-config",p("Configure")+" …",_.bind(u,this,o.app.props),{icon:!0,group:!0}).divider()}}),o.point("io.ox/mail/toolbar/links/view-dropdown").extend({id:"options",index:300,draw:function(o){function i(){e.$('[data-name="textPreview"]').toggle(o.app.supportsTextPreviewConfiguration())}var e=this;e.group(p("Options")).option("folderview",!0,p("Folder view"),{group:!0}),"alternative"!==s.get("selectionMode")&&e.option("checkboxes",!0,p("Checkboxes"),{group:!0}),o.app.supportsTextPreview()&&e.option("textPreview",!0,p("Text preview"),{group:!0}),e.option("contactPictures",!0,p("Contact pictures"),{group:!0}).option("exactDates",!0,p("Exact dates"),{group:!0}).option("alwaysShowSize",!0,p("Message size"),{group:!0}).divider(),e.listenTo(o.app.props,"change:layout",d),i(),o.app.on("folder:change",i),d.call(e)}}),o.point("io.ox/mail/toolbar/links/view-dropdown").extend({id:"vacation-notice",index:400,draw:function(){var o,i=r.getConfig().then(function(i){o=!!_(i.actioncmds).findWhere({id:"vacation"})},function(){o=!1});return g=g.then(function(){return i}),function(){a.has("mailfilter_v2")&&o&&this.link("vacation-notice",p("Vacation notice"),x)}}()}),o.point("io.ox/mail/toolbar/links/view-dropdown").extend({id:"mail-attachments",index:500,draw:function(o){s.get("folder/mailattachments",{}).all&&this.link("attachments",p("All attachments"),f.bind(null,o.app))}}),o.point("io.ox/mail/toolbar/links/view-dropdown").extend({id:"statistics",index:600,draw:function(o){this.link("statistics",p("Statistics"),m.bind(null,o.app))}}),o.point("io.ox/mail/mediator").extend({id:"toolbar",index:1e4,setup:function(o){if(!_.device("smartphone")){var i=new l({point:"io.ox/mail/toolbar/links",title:o.getTitle()});o.getWindow().nodes.body.addClass("classic-toolbar-visible").prepend(i.$el),o.updateToolbar=function(o){var e={data:[],folder_id:this.folder.get(),app:this,isThread:this.isThreaded()};i.setSelection(o.map(_.cid),function(){return e.data=t.resolve(o,e.isThread),e})},o.forceUpdateToolbar=function(o){i.selection=null,this.updateToolbar(o)}}}}),o.point("io.ox/mail/mediator").extend({id:"update-toolbar",index:10200,setup:function(o){_.device("smartphone")||(o.updateToolbar([]),o.listView.on("selection:change",function(){o.updateToolbar(o.listView.selection.get())}),o.listView.on("change",function(i){"flags"in i.changed&&o.forceUpdateToolbar(o.listView.selection.get())}))}}),g});