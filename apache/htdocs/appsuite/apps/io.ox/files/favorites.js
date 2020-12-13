define("io.ox/files/favorites",["io.ox/core/folder/node","io.ox/core/folder/api","io.ox/files/api","io.ox/core/extensions","io.ox/core/upsell","settings!io.ox/core","gettext!io.ox/core"],function(e,t,i,o,r,n,d){"use strict";function a(e){n.set(m,e)}function f(e){n.set(F,e)}function s(e){var t=new i.Model(e.toJSON());return t.set("index/"+M,!0,{silent:!0}),t}function l(e,i){u([i=i||t.pool.getModel(e)])}function u(e){if(e&&0!==e.length){var t=n.get(m,[]),i=n.get(F,[]),o=!1,r=!1,d=[];e.forEach(function(e){if(e&&e.attributes&&e.attributes.id)if(e.attributes.folder_name)t.indexOf(e.attributes.id)<0&&(t.push(e.attributes.id),d.push(s(e)),o=!0);else{var n={id:e.attributes.id,folder_id:e.attributes.folder_id};v(i,n)||(i.push(n),d.push(s(e)),r=!0)}}),o&&a(t),r&&f(i),d.length>0&&(n.save(),D.add(d),p())}}function c(e){if(e&&0!==e.length){var o=[],r=[];e.forEach(function(e){var n=e;if("object"==typeof e&&e.attributes&&e.attributes.id)e.attributes.folder_name?o.push(e.id):e.attributes.folder_id&&r.push({id:e.attributes.id,folder_id:e.attributes.folder_id});else if("object"==typeof e&&e.id)e.folder_name?o.push(e.id):e.folder_id&&r.push({id:e.id,folder_id:e.folder_id});else{var d=i.pool.get("detail").get(n);d&&d.attributes&&d.attributes.folder_id?r.push({id:d.attributes.id,folder_id:d.attributes.folder_id}):(d=t.pool.getModel(n))&&d.attributes&&d.attributes.folder_name&&o.push(n)}});var d=!1;if(o.length>0){var s=n.get(m,[]),l=s.filter(function(e){return o.indexOf(e)<0});s.length!==l.length&&(d=!0,a(l))}if(r.length>0){var u=n.get(F,[]),c=u.filter(function(e){return!v(r,e)});u.length!==c.length&&(d=!0,f(c))}d&&(n.save(),D.remove(e),p())}}function v(e,t){return _.find(e,function(e){return e.id===t.id&&e.folder_id===t.folder_id})}function p(){D.trigger("update:collection")}function h(){var e=!D.expired&&D.fetched,o=n.get(m,[]),r=n.get(F,[]),d=$.Deferred(),s=$.Deferred();return t.multiple(o,{errors:!0,cache:e}).then(function(e){var t=_(e).filter(function(e){return e.error&&/^(FLD-0008|FLD-0003|ACC-0002|FLD-1004|IMAP-1002|FILE_STORAGE-0004)$/.test(e.code)?(L[e.id]=!0,!1):(delete L[e.id],!0)});d.resolve(t)}),i.getList(r,{errors:!0,cache:e,fullModels:!0}).then(function(e){s.resolve(e)}),$.when(d,s).then(function(e,o){var r=[],d=[],s=[];return _.each(e,function(e){if(e){t.injectIndex.bind(t,e);var o=t.pool.getModel(e.id);o=new i.Model(o.toJSON()),i.pool.add("detail",o.toJSON()),r.push(o),d.push(e.id)}}),_.each(o,function(e){e&&(t.injectIndex.bind(t,e),r.push(e),s.push({id:e.attributes.id,folder_id:e.attributes.folder_id}))}),a(d),f(s),n.save(),D.reset(r),D.fetched=!0,D.expired=!1,w.set("subscr_subflds",e.length>0),p(),r})}function g(e,t){if("infostore"===t.data.module){var i=$('<a href="#" role="menuitem">').attr("data-action",t.action).text(t.text).on("click",$.preventDefault);t.enabled?i.on("click",t.data,t.handler):i.attr("aria-disabled",!0).removeAttr("tabindex").addClass("disabled"),e.append($('<li role="presentation">').append(i))}}function b(e){l(e.data.id)}function x(e){c([e.data.id])}var m="favorites/infostore",F="favoriteFiles/infostore";if(r.has("infostore")){var M="virtual/favorites/infostore",w=t.pool.getModel(M),D=t.pool.getCollection(M),L={};w.set("title",d("Favorites")),w.set("folder_id","9"),w.set("own_rights",1),w.set("standard_folder",!0),t.virtual.add(M,function(){return h()}),t.on("rename",function(e,t){var i=D.get(_.cid(t));i&&(i.set("title",t.title),p())}),t.on("error:FLD-1004 remove move collection:remove",function(e,t){c([t])}),i.on("rename description add:version remove:version change:version",function(e){var t=e;"object"==typeof e?t=void 0!==e.folder_id?_.cid(e):e.id:e=_.cid(e),i.get(e).done(function(e){var i=D.get(t);i&&(i.set("com.openexchange.file.sanitizedFilename",e["com.openexchange.file.sanitizedFilename"]),i.set("title",e.filename),p())})}),i.on("remove:file favorites:remove move",function(e){c(e)}),i.on("favorites:add",function(e){u(e)});var O={id:"favorites",index:1,draw:function(i){this.append(new e({empty:!1,folder:M,indent:!t.isFlat("infostore"),open:!1,parent:i,sortable:!0,title:d("Favorites"),tree:i,icons:i.options.icons}).render().$el.addClass("favorites"))}};return o.point("io.ox/core/foldertree/infostore/app").extend(_.extend({},O)),o.point("io.ox/core/foldertree/infostore/popup").extend(_.extend({},O)),o.point("io.ox/core/foldertree/contextmenu/default").extend({id:"toggle-infostore-favorite",index:1010,draw:function(e){var i=e.data.id,o=e.module,r=n.get(m,[]),a=n.get(F,[]);_.each(a,function(e){r.push(e.id)});var f=_.find(r,function(e){if(e===i)return!0});t.is("trash",e.data)||g(this,{action:"toggle-infostore-favorite",data:{id:i,module:o},enabled:!0,handler:f?x:b,text:d(f?"Remove from favorites":"Add to favorites")})}}),{add:l,remove:c}}});