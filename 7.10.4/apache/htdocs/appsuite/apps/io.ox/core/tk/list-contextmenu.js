define("io.ox/core/tk/list-contextmenu",["io.ox/backbone/views/action-dropdown","io.ox/backbone/mini-views/contextmenu-utils","gettext!io.ox/core"],function(t,e,n){"use strict";function o(){return ox.manifests.loadPluginsFor(this.contextMenuRef).done(function(){this.contextMenu.on("ready",function(){this.contextMenu.hasActions()&&(this.contextMenu.$toggle.dropdown("toggle"),this.contextMenu.$toggle.on("keydown",function(t){/^(38|40)$/.test(t.which)&&this.contextMenu.$menu.find("li:"+(38===t.which?"last":"first")+" a").focus()}.bind(this)),this.isKeyboardEvent&&this.contextMenu.$menu.find("li:first a").focus())}.bind(this));var t=this.selection.get();this.contextMenu.setSelection(t.map(_.cid),this.getContextMenuData.bind(this,t))}.bind(this))}return{onContextMenu:function(t){t.stopPropagation(),this.isKeyboardEvent=t.isKeyboardEvent,this.toggleContextMenu(e.positionForEvent(t),t)},toggleContextMenu:function(t){if(!(_.device("smartphone")||this.contextMenu&&this.contextMenu.$el.hasClass("open")))return this.renderContextMenu(),this.contextMenu.$menu.data({top:t.top,left:t.left}),o.call(this)},renderContextMenu:function(){this.contextMenu||(this.contextMenuRef=this.contextMenuRef||this.ref+"/contextmenu",this.contextMenu=new t({point:this.contextMenuRef,title:n("Folder options"),backdrop:!0}),this.contextMenu.$el.addClass("context-dropdown").insertAfter(this.$el))},getContextMenuData:function(t){return{data:t.map(_.cid)}}}});