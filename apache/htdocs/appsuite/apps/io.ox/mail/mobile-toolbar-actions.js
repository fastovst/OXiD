define("io.ox/mail/mobile-toolbar-actions",["io.ox/core/extensions","io.ox/backbone/views/toolbar","io.ox/backbone/views/actions/mobile","io.ox/mail/api","io.ox/core/capabilities","gettext!io.ox/mail"],function(o,e,i,a,t,l){"use strict";var r={compose:{prio:"hi",mobile:"hi",title:l("Compose"),icon:"fa fa-pencil",ref:"io.ox/mail/actions/compose",drawDisabled:!0},reply:{prio:"hi",mobile:"hi",icon:"fa fa-reply",title:l("Reply to sender"),ref:"io.ox/mail/actions/reply",drawDisabled:!0},"reply-all":{prio:"hi",mobile:"hi",icon:"fa fa-reply-all",title:l("Reply to all recipients"),ref:"io.ox/mail/actions/reply-all",drawDisabled:!0},forward:{prio:"hi",mobile:"hi",icon:"fa fa-mail-forward",title:l("Forward"),ref:"io.ox/mail/actions/forward",drawDisabled:!0},delete:{prio:"hi",mobile:"hi",icon:"fa fa-trash-o",title:l("Delete"),ref:"io.ox/mail/actions/delete",drawDisabled:!0},move:{prio:"hi",mobile:"lo",title:l("Move"),ref:"io.ox/mail/actions/move",section:"file-op",drawDisabled:!0},"mark-read":{prio:"hi",mobile:"lo",title:l("Mark as read"),ref:"io.ox/mail/actions/mark-read",section:"flags",drawDisabled:!0},"mark-unread":{prio:"hi",mobile:"lo",title:l("Mark as unread"),ref:"io.ox/mail/actions/mark-unread",section:"flags",drawDisabled:!0},copy:{prio:"hi",mobile:"lo",title:l("Copy"),ref:"io.ox/mail/actions/copy",section:"file-op"},archive:{prio:"hi",mobile:"lo",icon:"fa fa-archive",title:l.pgettext("verb","Archive")},spam:{prio:"hi",mobile:"lo",title:l("Mark as spam"),ref:"io.ox/mail/actions/spam"},nospam:{prio:"hi",mobile:"lo",title:l("Not spam"),ref:"io.ox/mail/actions/nospam"},flag:{prio:"hi",mobile:"lo",title:l("Flag"),ref:"io.ox/mail/actions/flag"},unflag:{prio:"hi",mobile:"lo",title:l("Unflag"),ref:"io.ox/mail/actions/unflag"},color:{prio:"hi",mobile:"lo",title:l("Set color..."),ref:"io.ox/mail/actions/triggerFlags"}},n={listView:"io.ox/mail/mobile/toolbar/listView",multiselect:"io.ox/mail/mobile/toolbar/listView/multiselect",threadView:"io.ox/mail/mobile/toolbar/threadView",detailView:"io.ox/mail/mobile/toolbar/detailView"};i.addAction(n.listView,r,["compose"]),i.addAction(n.multiselect,r,["compose","delete","forward","move","archive"]),i.addAction(n.threadView,r,["compose"]),i.addAction(n.detailView,r,["reply","reply-all","delete","forward","mark-read","mark-unread","spam","flag","unflag","nospam","copy","color"]),i.createToolbarExtensions(n);var s=_.debounce(function(e){if(e){var i=this.isThreaded(),t=a.resolve(e,i);0===t.length&&(i=!1),t=1===t.length?t[0]:t;var l=o.Baton({data:t,isThread:i,selection:e,app:this}),r=this.pages.getCurrentPage();r.navbar.setBaton(l),r.toolbar&&r.toolbar.setBaton(l),r.secondaryToolbar&&r.secondaryToolbar.setBaton(l)}},50);o.point(n.multiselect).extend({id:"update-button-states",index:1e4,draw:function(o){0===o.data.length?$("a.mobile-toolbar-action, .mobile-toolbar-action a",this).addClass("ui-disabled"):$("a.mobile-toolbar-action, .mobile-toolbar-action a",this).removeClass("ui-disabled")}}),o.point("io.ox/mail/mediator").extend({id:"toolbar-mobile",index:10100,setup:function(o){_.device("smartphone")&&(o.updateToolbar=s)}}),o.point("io.ox/mail/mediator").extend({id:"update-toolbar-mobile",index:10300,setup:function(e){_.device("smartphone")&&(e.updateToolbar(),e.listView.on("selection:change change selection:action",function(){var o=e.pages.getCurrentPage();"folderTree"!==o.name&&(o.toolbar&&o.toolbar.baton.threadMember||e.updateToolbar(e.listView.selection.get()))}),e.threadView.$el.on("showmail",function(){var i=o.Baton({threadMember:!0,data:e.threadView.mail,isThread:!1,app:e});e.pages.getPageObject("detailView").toolbar.setBaton(i)}))}}),o.point("io.ox/mail/mediator").extend({id:"change-mode-toolbar-mobile",index:10400,setup:function(o){_.device("smartphone")&&o.props.on("change:checkboxes",function(e,i){var a=o.pages.getCurrentPage();o.pages.toggleSecondaryToolbar(a.name,i)})}})});