define("io.ox/core/commons",["io.ox/core/extensions","gettext!io.ox/core","io.ox/core/folder/api","io.ox/core/api/account","io.ox/backbone/mini-views/helplink","settings!io.ox/core","settings!io.ox/contacts","io.ox/backbone/mini-views/upsell","io.ox/backbone/views/actions/util","io.ox/core/capabilities"],function(e,t,i,n,o,r,a,d,l,s){"use strict";var c={showWindow:function(e){return function(){var t=$.Deferred();return e.show(t.resolve),t}},simpleMultiSelection:function(e,i,n){var o=i.length;o<=1||e.idle().empty().append($('<div class="io-ox-center multi-selection-message">').append($('<div class="message" id="'+n.multiselectId+'">').append(t.format(t.ngettext("%1$s item selected","%1$s items selected",o),$('<span class="number">').text(o).prop("outerHTML")))))},wireGridAndSelectionChange:function(e,i,n,o,r){var a,d="";e.selection.on("change",function(i,r){var l=r.length,s=JSON.stringify(_([].concat(r)).map(function(e){return{folder_id:String(e.folder_id||e.folder),id:String(e.id),recurrence_position:String(e.recurrence_position||0)}}));if(s!==d){if(1===l)o.css("height",""),n(r[0]);else if(l>1)n.cancel&&n.cancel(),o.css("height","100%"),c.simpleMultiSelection(o,this.unique(this.unfold()),e);else if(n.cancel&&n.cancel(),o.css("height","100%").idle().empty().append($('<div class="io-ox-center">').append($('<div class="io-ox-multi-selection">').append($('<div class="summary empty">').text(t("No elements selected"))))),_.device("smartphone")){var p=o.closest(".vsplit");p.hasClass("vsplit-reverse")||p.find(".rightside-navbar a>i").last().trigger("click")}!function(){var e=o.parent();l<=1&&a?e.attr("aria-label",_.escape(a)):l>1&&(a=a||e.attr("aria-label"),e.attr("aria-label",t("Selection Details")))}(),d=s}}),r&&r.on("change:id",function(t,i,n){var o=e.selection.get();o.length&&o[0].id===n&&e.selection.set({id:i.id,folder_id:i.folder_id})})},wireGridAndAPI:function(e,t,i,n){e.setAllRequest(function(){return t[i||"getAll"]({folder:this.prop("folder")})}),e.setListRequest(function(e){return t[n||"getList"](e)}),t.on("beforedelete",function(t,i){e.selection.removeFromIndex(i);var n,o=e.selection.get();o.length>0&&(_.device("smartphone")?e.selection.clear(!0):(n=e.selection.getIndex(o[0]),e.selection.clear(!0).selectIndex(n+1),e.getIds().length===o.length&&e.selection.trigger("change",[])))})},wireGridAndWindow:function(e,t){var i=0,n=function(){e.keyboard(!0),e.selection.get().length&&e.selection.retriggerUnlessEmpty()};e.setApp(t.app),t.on("show idle",n).on("hide busy",function(){e.keyboard(!1)}).on("beforeshow",function(){null!==i&&e.scrollTop(i)}).on("beforehide",function(){i=e.scrollTop()}),t.app&&(t.app.getGrid=function(){return e}),t.state.visible&&n()},addGridToolbarFolder:function(n,o){function r(){return n.getWindow&&n.getWindow().state.visible?o.getToolbar().find(".grid-info"):$()}function d(e){e&&(r().empty().attr("data-folder-id",e).append($('<span class="folder-name">'),$.txt(" "),$('<span class="folder-count">')),i.get(e).done(function(t){var n=!i.supports("count_total",t)?o.getIds().length:t.total,r=o.getToolbar().find('[data-folder-id="'+e+'"]');i.is("contacts",t)&&"6"===t.id&&!a.get("showAdmin",!1)&&(n-=1),o.meta={total:n,title:t.title},o.trigger("meta:update"),r.find(".folder-name").text(t.title),n>0&&r.find(".folder-count").text("("+n+")")}))}function l(){var e=o.prop("folder"),i=o.getMode();if("all"===i)d(e);else if("search"===i){var n=r();n.find(".folder-name").text(t("Results")),n.find(".folder-count").text("("+o.getIds().length+")")}}e.point(n.get("name")+"/vgrid/toolbar").extend({id:"info",index:200,draw:function(){this.append($('<div class="grid-info">'))}}),o.on("change:prop:folder change:mode change:ids",l),i.on("after:rename",l),i.on("update:total",function(e){e===n.folder.get()&&d(e)}),e.point(n.get("name")+"/vgrid/toolbar").invoke("draw",o.getToolbar()),$.when(n.folder.initialized,n.getWindow().shown).done(function(e){d(e[0])})},wireFirstRefresh:function(e,t){!1!==ox.serverConfig.persistence&&e.getWindow().on("open",function(){t.needsRefresh(e.folder.get())&&t.trigger("refresh^",e.folder.get())})},wireGridAndRefresh:function(e,t,i){var n=function(){e.refresh(!0),_.device("smartphone")&&e.selection.retrigger()},o=function(){e.repaint(),e.selection.retrigger()},r=function(){e.pending()},a=function(){t.off("refresh.all refresh:all:local",n).off("refresh.pending",r).off("refresh.list",o)},d=function(){a(),t.on("refresh.all refresh:all:local",n).on("refresh.pending",r).on("refresh.list",o).trigger("refresh.all")};i.on({show:d,hide:a}),i.state.visible&&d()},wirePerspectiveEvents:function(e){var t=e.getWindow(),i=null;t.on("show",function(){i=t.currentPerspective,t.currentPerspective&&e.trigger("perspective:"+t.currentPerspective+":show")}),t.on("hide",function(){i=t.currentPerspective,t.currentPerspective&&e.trigger("perspective:"+t.currentPerspective+":hide")}),t.on("change:perspective",function(t,n){i&&e.trigger("perspective:"+i+":hide"),i=n,e.trigger("perspective:"+n+":show")}),t.on("change:initialPerspective",function(t,n){i=n,e.trigger("perspective:"+n+":show")})},addFolderSupport:function(e,t,i,o){function r(t){return e.folder.set(t).then(_.identity,function(){return $.when(e.folder.setDefault())})}return e.folder.updateTitle(e.getWindow()).setType(i),t&&e.folder.updateGrid(t),e.getWindow().on("show",function(){t&&t.selection.retriggerUnlessEmpty(),_.url.hash("folder",e.folder.get())}),void 0!==(o=_.url.hash("folder")||o)?r(o):"mail"===i?n.getUnifiedInbox().then(function(t){return null===t?e.folder.setDefault():r(t)}):e.folder.setDefault()},addPropertyCaching:function(e,t){function i(e,t){var i;e===r.keyprop&&void 0!==t&&t!==o(r.keyprop)&&(i=o(r.keyprop))&&(d.remove(i),_.each(r.props,function(e){d.set(i,e,o(e))}))}var n={},o=(e=e||{prop:$.noop()}).prop,r=$.extend({keyprop:"folder",props:["sort","order"]},t||{}),a={},d={set:function(e,t,i){a[e]=a[e]||{},a[e][t]=i},get:function(e,t){return t?(a[e]||{})[t]:a[e]||{}},remove:function(e){a[e]={}},clear:function(){a={}}};r.props=[].concat(r.props),_.each(r.props,function(e){n[e]=!0}),_.isUndefined(e.propcache)&&(e.propcache=function(e,t,i){return i=i||o(r.keyprop),n[e]?d.get(i,e)||t:t},e.prop=function(t,n){return i(t,n),o.call(e,t,n)})},addGridFolderSupport:function(e,t){e.folder.updateGrid(t),e.getWindow().on("show",function(){t.selection.retriggerUnlessEmpty()})},vsplit:function(){var e=!1,i=function(t){t.preventDefault(),e&&(e=!1),$(this).parent().find(".rightside-inline-actions").empty(),$(this).closest(".vsplit").addClass("vsplit-reverse").removeClass("vsplit-slide"),t.data.app&&t.data.app.getGrid&&(_.device("smartphone")&&t.data.app.getGrid().selection.trigger("changeMobile"),t.data.app.getGrid().selection.clear()),_.device("smartphone")&&$(this).closest(".vsplit").find(".leftside .tree-container").trigger("changeMobile")},n=function(){var t=$(this);e=!0,setTimeout(function(){e&&(t.closest(".vsplit").addClass("vsplit-slide").removeClass("vsplit-reverse"),e=!1)},100)};return function(e,o){var r={};return e.addClass("vsplit").append(r.left=$('<div class="leftside">').attr({role:"complementary","aria-label":t("Item list")}).on("select",n),$('<div class="rightside-navbar">').append($('<div class="rightside-inline-actions">'),$('<a href="#" tabindex="-1">').append($('<i class="fa fa-chevron-left" aria-hidden="true">'),$.txt(" "),$.txt(t("Back"))).on("click",{app:o},i)),r.right=$('<div class="rightside">')),r}}(),help:function(e){if(!_.device("smartphone")){var t=new o({href:function(e){return"io.ox/mail"===e?"ox.appsuite.user.sect.email.gui.foldertree.html":"io.ox/files"===e?"ox.appsuite.user.sect.drive.gui.foldertree.html":"io.ox/contacts"===e?"ox.appsuite.user.sect.contacts.gui.foldertree.html":"io.ox/calendar"===e?"ox.appsuite.user.sect.calendar.gui.foldertree.html":"io.ox/tasks"===e?"ox.appsuite.user.sect.tasks.gui.foldertree.html":"ox.appsuite.user.sect.dataorganisation.folder.html"}(e&&e.app&&e.app.id)});this.find(".generic-toolbar.bottom").append(t.render().$el)}},mediateFolderView:function(i){function n(e){if(e.data.app.folderView.toggle(e.data.state),e.data.state)e.data.app.folderView.tree.getNodeView(e.data.app.folder.get()).$el.focus();else{var t=e.data.app.grid;if(0===t.getIds().length)return t.getContainer().focus();t.selection.focus()}}function o(e){e.getWindow().nodes.sidepanel.show(),e.getWindow().nodes.main.find(".vgrid").removeClass("bottom-toolbar")}function r(e){e.getWindow().nodes.sidepanel.hide(),e.getWindow().nodes.main.find(".vgrid").addClass("bottom-toolbar")}e.point(i.get("name")+"/vgrid/second-toolbar").extend({id:"default",index:100,draw:function(){this.addClass("visual-focus").append($('<button type="button" class="btn btn-link toolbar-item" data-action="open-folder-view">').attr("aria-label",t("Open folder view")).append($('<i class="fa fa-angle-double-right" aria-hidden="true">').attr("title",t("Open folder view"))).on("click",{app:i,state:!0},n))}}),e.point(i.get("name")+"/sidepanel").extend({id:"toggle-folderview",index:1e3,draw:function(){var e=_.uniqueId("control");this.addClass("bottom-toolbar").append($('<div class="generic-toolbar bottom visual-focus" role="region">').attr("aria-labelledby",e).append($('<button type="button" class="btn btn-link toolbar-item" data-action="close-folder-view">').attr({id:e,"aria-label":t("Close folder view")}).append($('<i class="fa fa-angle-double-left" aria-hidden="true">').attr("title",t("Close folder view"))).on("click",{app:i,state:!1},n)))}}),e.point(i.get("name")+"/sidepanel").extend({id:"help",index:1100,draw:c.help}),i.on({"folderview:open":o.bind(null,i),"folderview:close":r.bind(null,i)});var a=i.getGrid(),d=a.getTopbar();e.point(i.get("name")+"/vgrid/second-toolbar").invoke("draw",d,e.Baton({grid:a})),r(i),i.folderViewIsVisible()&&_.defer(o,i)},addFolderViewToggle:function(i){_.device("smartphone")||(i.toggleFolderView=function(e){e.preventDefault(),i.trigger("before:change:folderview"),i.folderView.toggle(e.data.state),e.data.state?i.folderView.tree.getNodeView(i.folder.get()).$el.focus():require("io.ox/core/a11y").getTabbable(i.getWindow().nodes.body.find(".classic-toolbar"))[0].focus()},e.point(i.get("name")+"/sidepanel").extend({id:"toggle-folderview",index:1e3,draw:function(){if(!_.device("smartphone")){var e=_.uniqueId("control");this.addClass("bottom-toolbar").append($('<div class="generic-toolbar bottom visual-focus" role="region">').attr("aria-labelledby",e).append($('<button type="button" class="btn btn-link toolbar-item" data-action="close-folder-view">').attr({id:e,"aria-label":t("Close folder view")}).append($('<i class="fa fa-angle-double-left" aria-hidden="true">').attr("title",t("Close folder view"))).on("click",{state:!1},i.toggleFolderView)))}}}),e.point(i.get("name")+"/sidepanel").extend({id:"help",index:1100,draw:c.help}))},addPremiumFeatures:function(i,n){if(!_.device("smartphone")&&s.has("client-onboarding")&&r.get("upsell/premium/folderView/visible")&&!r.get("upsell/premium/folderView/closedByUser")){var o=$('<div class="premium-toolbar generic-toolbar bottom visual-focus in">').append($('<div class="header">').append(t("Premium features"),$('<a href="#" role="button" class="pull-right">').append($('<i class="fa fa-times" aria-hidden="true">'),$('<span class="sr-only">').text(t("Close premium features"))).on("click",function(e){e.preventDefault(),$(this).closest(".premium-toolbar").collapse("hide"),r.set("upsell/premium/folderView/closedByUser",!0).save()}))),a=l.getBaton([],{app:i,renderActions:function(t,i){return e.point(t).list().map(function(e){return $("<p>").append($('<a href="#" role="button">').attr("data-action",e.action).data({baton:i}).text(e.title))})}});if(e.point(i.get("name")+"/folderview/premium-area").invoke("draw",o,a),0!==o.find("a[data-action]").length){o.on("click","a[data-action]",l.invokeByEvent);var c=new d({id:n.upsellId||"folderview/"+i.get("name")+"/bottom",requires:n.upsellRequires,icon:"",title:t("Try now!"),customize:function(){this.$("a").addClass("btn btn-default")}});return c.visible&&(o.append(c.render().$el),$(".header a",o).remove()),!1!==n.append&&i.getWindow().nodes.sidepanel.append(o),o}}}},p=$.cleanData,f=function(e){$(e).triggerHandler("dispose")};return $.cleanData=function(e){return _(e).map(f),p.call(this,e)},$.createViewContainer=function(t,n,o,r){var a=(r=r||{}).cidGetter||_.ecid,d=t instanceof e.Baton?t.data:t,l=_.cid(d),s=a(d),c="recurrenceID"in d?a({id:d.id,folder:d.folder_id||d.folder}):null,p=$("<div>").attr("data-cid",_([].concat(d)).map(_.cid).join(",")),f=function(i,r){r&&(r.former_id||r.id&&r.id!==d.id)&&(d=r),(o=o||(n?n.get:null))&&(d.id||(d.id=arguments[1].id),o(n.reduce(d)).done(function(i){t instanceof e.Baton?i instanceof Backbone.Model&&t.model instanceof Backbone.Model?(t.model=i,t.data=i.toJSON()):t.data=i:t=i,r&&r.updateData?t.updateData=r.updateData:delete t.updateData,p&&p.triggerHandler("redraw",t)}))},u=function(e,t){d&&(d.folder_id=t),f&&f()},g=_.debounce(function(){p&&p.triggerHandler("redraw",t)},10),v=function(){p&&p.trigger("view:remove").remove()},h=function(e){var t=this;e===t.folder.toString()&&n&&n.trigger("update:"+t.cid)};return _.isArray(d)?(i.on("update",g),n.on("delete update",g)):(i.on("update",h,{cid:l,folder:d.folder_id||d.folder}),n.on("delete:"+s+(c?" delete:"+c:""),v),n.on("create update:"+s+(c?" update:"+c:""),f),n.on("move:"+s,u)),p.one("dispose",function(){_.isArray(d)?(i.off("update",g),n.off("delete update",g)):(i.off("update",h),n.off("delete:"+s,v),n.off("create update:"+s+(c?" update:"+c:""),f),n.off("move:"+s,u)),n=f=d=p=o=l=s=null})},$.fail=function(e,i){var n=$("<div>").addClass("io-ox-fail").append($("<span>").text(e));return i&&n.append($("<span>").text(" ")).append($("<a>",{href:"#"}).text(t("Retry")).on("click",function(e){e.preventDefault(),$(this).closest(".io-ox-center").remove(),i.apply(this,arguments)})),n.center()},c});