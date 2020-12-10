define("io.ox/files/upload/dropzone",["io.ox/core/extensions","io.ox/core/dropzone","io.ox/core/folder/api","gettext!io.ox/files"],function(e,o,n,i){"use strict";e.point("io.ox/files/dropzone").extend({id:"default",index:100,getDropZones:function(e){var n=e.app,t=new o.Inplace({caption:i("Drop files here to upload")});t.on({show:function(){n.listView.$el.stop().hide()},hide:function(){n.listView.$el.fadeIn("fast")},drop:function(e){require(["io.ox/files/upload/main"],function(o){o.setWindowNode(n.getWindowNode()),o.create.offer(e,{folder:n.folder.get()})})}}),e.dropZones.push(t)}}),e.point("io.ox/files/mediator").extend({id:"files-dropzone",index:1e12,setup:function(o){if(_.device("desktop")){var i=new e.Baton({app:o,dropZones:[]});e.point("io.ox/files/dropzone").invoke("getDropZones",this,i);var t=100/i.dropZones.length;o.getWindowNode().find(".list-view-control").append(i.dropZones.map(function(e,i){return _.isFunction(e.isEnabled)||(e.isEnabled=function(){var e=o.folder.get();return n.pool.getModel(e).can("create")}),e.render().$el.addClass("abs").css({top:i*t+"%",height:t+"%"})}))}}})});