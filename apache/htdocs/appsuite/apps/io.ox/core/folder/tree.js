define("io.ox/core/folder/tree",["io.ox/backbone/views/disposable","io.ox/backbone/mini-views/dropdown","io.ox/backbone/mini-views/contextmenu-utils","io.ox/core/folder/selection","io.ox/core/folder/api","io.ox/core/extensions","io.ox/core/a11y","settings!io.ox/core","gettext!io.ox/core","io.ox/core/folder/favorites","io.ox/files/favorites","io.ox/core/folder/extensions"],function(e,t,o,n,i,r,s,a,d){"use strict";return e.extend({attributes:{role:"navigation"},className:"folder-tree",events:{"click .contextmenu-control":"onToggleContextMenu",'contextmenu .folder.selectable[aria-haspopup="true"]':"onContextMenu",'keydown .folder.selectable[aria-haspopup="true"]':"onKeydownMenuKeys","keydown .folder.selectable":"onKeydown","click .folder.selectable.selected":"onClick"},initialize:function(e){e=_.extend({context:"app",contextmenu:!1,customize:$.noop,disable:$.noop,abs:!0,icons:a.get("features/folderIcons",!1),root:"default0/INBOX",highlight:_.device("!smartphone"),highlightclass:"visible-selection",hideTrashfolder:!1,realNames:!1},e),this.all=!!e.all,this.app=e.app,this.context=e.context,this.flat=!!e.flat,this.module=e.module,this.open=e.open,this.root=e.root,this.realNames=e.realNames,this.id=_.uniqueId("folder-tree-"),this.$el.data("view",this),this.$container=$('<ul class="tree-container f6-target" role="tree">').attr("id",this.id),this.$el.attr("aria-label",d("Folders")),this.$dropdownMenu=$(),this.options=e,this.$el.toggleClass(e.highlightclass,!!e.highlight),this.$el.append(this.$container),this.selection=new n(this),e.abs&&this.$el.addClass("abs"),e.contextmenu&&_.defer(this.renderContextMenu.bind(this))},appear:function(e){var t=e.folder.replace(/\s/g,"_");this.trigger("appear:"+t,e)},onClick:function(e){$(document.activeElement).is(".folder.selectable.selected")||$(e.currentTarget).focus()},onAppear:function(e,t){var o=this.getNodeView(e);if(o)return t.call(this,o);e=String(e).replace(/\s/g,"_"),this.once("appear:"+e,t)},preselect:function(e){void 0!==e&&this.onAppear(e,function(){_.defer(this.selection.set.bind(this.selection,e)),this.trigger("afterAppear")})},traversePath:function(e,t){var o=this;i.path(e).then(function(e){return _(e).pluck("id").forEach(t.bind(o))})},select:function(e){function t(){var e=o.shift(),i=n.getNodeView(e);if(!o.length)return n.selection.set(e);i&&(i.once("reset",t),i.toggle(!0))}var o=[],n=this;i.path(e).done(function(e){o=_(e).pluck("id"),t()})},getNodeView:function(e){return this.$('.folder[data-id="'+$.escape(e)+'"]').data("view")},filter:function(e,t){if(this.options.hideTrashfolder&&i.is("trash",t.attributes))return!1;var o=this.options.filter,n=_.isFunction(o)?o.apply(this,arguments):void 0;if(void 0!==n)return n;var r=t.get("module");return"event"===r&&(r="calendar"),r===this.module||"mail"===this.module&&/^default\d+(\W|$)/i.test(t.id)},getOpenFolders:function(){return _(this.$el.find(".folder.open")).chain().map(function(e){return($(e).attr("data-namespace")?$(e).attr("data-namespace")+":":"")+$(e).attr("data-id")}).uniq().value().sort()},getTreeNodeOptions:function(e,t){return"default0/INBOX"===t.get("id")&&"virtual/standard"===e.parent.folder&&(e.subfolders=!!i.altnamespace),this.flat&&e.parent!==this&&(e.subfolders=!1),"virtual/standard"===e.parent.folder&&(e.icons=!0),"virtual/favorites/infostore"===e.parent.folder&&(e.inFavorites=!0),e},toggleContextMenu:function(e){this.dropdown.$el.hasClass("open")||_.device("smartphone")||(e.target.is("a.contextmenu-control")||(e.target=e.target.find(".contextmenu-control").first()),_.defer(function(){this.$dropdownMenu.css({top:e.top,left:e.left,bottom:"auto"}).empty().busy(),this.dropdown.$toggle=e.target,this.$dropdownToggle.dropdown("toggle")}.bind(this)))},onToggleContextMenu:function(e){var t=$(e.target).is("a")&&"keydown"===e.type?$(e.target):$(e.currentTarget),o=t.offset(),n=o.top-7,i=o.left+t.outerWidth()+7;this.toggleContextMenu({target:t,top:n,left:i})},onKeydown:function(e){/35|36/.test(e.which)&&(36===e.which?this.$el.find("li.folder.selectable:visible:first").trigger("click"):35===e.which&&this.$el.find("li.folder.selectable:visible:last").trigger("click"))},onKeydownMenuKeys:function(e){if(o.macOSKeyboardHandler(e),"keydown"===e.type){var t=e.shiftKey&&121===e.which,n=93===e.which;(/13|32|38|40/.test(e.which)||t||n)&&(this.focus=/38/.test(e.which)?"li:last > a":"li:first > a"),t&&e.isKeyboardEvent&&this.onContextMenu(e)}},onContextMenu:function(e){e.stopPropagation(),this.toggleContextMenu(o.positionForEvent(e))},getContextMenuId:function(e){return"io.ox/core/foldertree/contextmenu/"+(e||"default")},renderContextMenuItems:function(e){var t=this.selection.get("data-contextmenu-id"),o=this.app,n=this.module,s=this.$dropdownMenu.empty(),a=this.getContextMenuId(e),l=this,c=this.selection.get("data-favorite");i.get(t).done(function(e){var t=new r.Baton({app:o,data:e,view:l,module:n,originFavorites:c});r.point(a).invoke("draw",s,t),_.device("smartphone")&&(s.append($("<li>").append($('<a href="#" class="io-ox-action-link" data-action="close-menu">').text(d("Close")))),0===s.find("[role=menuitem]").length&&s.prepend($("<li>").append($('<div class="custom-dropdown-label">').text(d("No action available"))))),_.device("smartphone")&&s.find(".divider").remove(),s.find(".divider").each(function(){var e=$(this),t=e.next();(0===e.prev().length||t.hasClass("divider")||0===t.length)&&e.remove()}),_.device("smartphone")||l.dropdown.setDropdownOverlay(),l.focus&&s.find(l.focus).focus(),l.focus=!1})},renderContextMenu:function(){function e(e){this.$dropdownMenu.idle(),this.renderContextMenuItems(e)}function o(){var t=this.dropdown.$toggle.attr("data-contextmenu")||this.selection.get("data-contextmenu");require(["io.ox/core/folder/contextmenu"],_.lfo(e.bind(this,t))),this.$dropdownMenu.attr("role","menu")}function n(){this.dropdown.$toggle.parents("li").first().focus()}return function(){this.$dropdownToggle=$('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true">').attr("aria-label",d("Folder options")),this.$dropdownMenu=$('<ul class="dropdown-menu">'),this.dropdown=new t({smart:!1,className:"context-dropdown dropdown",$toggle:this.$dropdownToggle,$ul:this.$dropdownMenu,margin:24}),this.$el.after(this.dropdown.render().$el.on("show.bs.dropdown",o.bind(this)).on("hidden.bs.dropdown",n.bind(this))),this.$dropdownMenu.removeAttr("role")}}(),render:function(){return r.point("io.ox/core/foldertree/"+this.module+"/"+this.context).invoke("draw",this.$container,this),this}})});