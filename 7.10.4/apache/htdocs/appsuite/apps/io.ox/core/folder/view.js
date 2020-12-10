define("io.ox/core/folder/view",["io.ox/core/extensions","io.ox/core/folder/api","settings!io.ox/core","gettext!io.ox/core"],function(e,i,t,o){"use strict";return{initialize:function(n){function r(){u.settings.set("folderview/visible/"+_.display(),h).save()}function s(e){void 0===e?u.settings.remove("folderview/width/"+_.display()):u.settings.set("folderview/width/"+_.display(),e),u.settings.save()}function l(){return u.settings.get("folderview/width/"+_.display(),x)}function d(e){var i=void 0===e?"":e+"px";m.body.css("left",i),m.sidepanel.css("width",i)}function a(){d(l())}function c(){var e=u.getWindow().options.chromeless,i=$(document).width()<=u.folderView.resize.autoHideThreshold;m.body.css("left",e||i?0:50)}function f(e,i,t){if(0!==i)return i!==t.length-1?this.onAppear(e,function(e){e.isOpen()||e.toggle(!0)}):void this.onAppear(e,function(e){e.$el.intoView(this.$el,{ignore:"bottom:partial"})})}var u=(n=_.extend({firstResponder:"listView",autoHideThreshold:700},n)).app,p=n.tree,v=p.options.module,g=u.get("name")+"/folderview",h=!1,w=u.settings.get("folderview/open",{}),m=u.getWindow().nodes,b=m.sidepanel,y=!1,V=!1,x=280;w||(w={},/^(contacts|calendar|event|tasks)$/.test(v)&&(w[_.display()]=["virtual/flat/"+v+"/private","virtual/flat/"+v+"/public"]));var z=function(){$(document).trigger("resize")};if(u.folderView={tree:p,forceOpen:V,isVisible:function(){return h},show:function(){h=!0,y||r(),a(),b.addClass("visible"),u.trigger("folderview:open"),z(),b.css("display","flex")},hide:function(){h=!1,V=!1,y||r(),c(),b.removeClass("visible").css("width",""),u.trigger("folderview:close"),z()},toggle:function(e){void 0===e&&(e=!h),e?this.show():this.hide()},resize:function(){function e(e){var i=e.pageX-o;i>l||i<a||(u.trigger("folderview:resize"),d(r=i),z())}function i(e){$(this).off("mousemove.resize mouseup.resize"),z(),e.pageX-o<.75*a?u.folderView.hide():s(r||x)}function t(t){t.preventDefault(),o=t.pageX-b.width(),l=$(document).width()/2,$(document).on({"mousemove.resize":e,"mouseup.resize":i})}var o,r,l=0,a=240;return{enable:function(){b.append($('<div class="resizebar">').on("mousedown.resize",t))},autoHideThreshold:n.autoHideThreshold}}()},u.folderViewIsVisible=function(){return h},$(window).on("resize",_.throttle(function(){var e=$(document).width();if(m.outer.is(":visible")){var i=u.folderView.resize.autoHideThreshold;!u.folderView.forceOpen&&!y&&h&&e<=i?(u.folderView.hide(),y=!0):y&&e>i&&(u.folderView.show(),y=!1)}},200)),e.point(g+"/options").extend({id:"defaults",index:100,rootFolderId:"1",type:void 0,view:"ApplicationFolderTree",visible:!_.device("smartphone")&&u.settings.get("folderview/visible/"+_.display(),!0)}),v){var k=t.get(["folder/hidden"]);void 0===k&&(k=u.settings.get("folderview/blacklist",{}),_.isObject(k)&&t.set(["folder/hidden"],k).save())}w&&w[_.display()]&&(w=w[_.display()]),w=_.isArray(w)?w:[],p.open=w;var F=u.folder.get();_.device("smartphone")?(p.$el.on("click",".folder",_.debounce(function(e){if("calendar"===p.module){if($(e.target).is(".folder-arrow, .fa, .color-label"))return;if(!t)return void $(e.target).siblings().click()}var i=$(e.target).closest(".folder"),t=u.props.get("mobileFolderSelectMode");if(t){if(!$(e.target).parent().hasClass("folder-label")||!$(e.target).closest(".folder").attr("data-contextmenu"))return;return p.dropdown.$(".dropdown-toggle").trigger("click","foldertree")}i.is(".virtual")&&!0!==p.selection.selectableVirtualFolders[i.data().id]||(n.firstResponder&&u.pages.changePage(n.firstResponder),n.respondCallback&&n.respondCallback())},10)),F&&_.defer(p.selection.preselect.bind(p.selection,F))):F?_.defer(function(){i.path(F).done(function(e){var t=_(e).pluck("id").slice(0,-1),o=_(e).where({id:F})[0],n="6"===o.id?"public":i.getSection(o.type,o.id);if(n&&/(mail|contacts|calendar|tasks|infostore)/.test(p.module)&&p.flat&&"app"===p.context){var r="calendar"===p.module?"event":p.module;t.push("virtual/flat/"+r+"/"+n)}p.open=_(p.open.concat(t)).uniq()}).always(function(){p.onAppear(F,function(){_.defer(function(){p.selection.preselect(F),p.selection.scrollIntoView(F),i.isVirtual(F)&&p.selection.triggerChange()})}),p.render()})}):p.render(),p.$(".tree-container").attr({"aria-label":o("Folders")}),p.$(".tree-container").toggleClass("flat-tree",i.isFlat(p.options.module)),_(e.point(g+"/options").all()).each(function(e){n=_.extend(e,n||{})}),function(){var e=!1;u.on("folder:change",function(i,t,o){e||(p.traversePath(i,f),p.$el.find('[data-id="'+i+'"]').length?p.selection.set(i,o):p.on("appear:"+i,function(){p.selection.set(i,o),p.off("appear:"+i)}))}),p.on("change",function(i){e=!0,u.folder.set(i),e=!1}),p.on("virtual",function(e){u.trigger("folder-virtual:change",e)}),i.on("create",_.debounce(function(e){p.traversePath(e.id,f)},15))}(),i.on("before:remove",function(e){var t=/^(1|2)$/.test(e.folder_id)?i.getDefaultFolder(e.module)||"1":e.folder_id;p.selection.set(t)}),i.on("move",function(e,i){p.traversePath(i,f),p.selection.set(i)}),p.on("open close",function(){var e=this.getOpenFolders();u.settings.set("folderview/open/"+_.display(),e).save()}),window.tree=p,n.visible&&u.folderView.show()}}});