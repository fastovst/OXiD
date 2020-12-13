define("io.ox/core/dropzone",[],function(){"use strict";var e="dragenter dragover dragleave drop",t=_.throttle(function(t){if($("html").hasClass("dndmask-enabled")!==t){if($("html").toggleClass("dndmask-enabled",t),!t)return $(".dndmask").remove();$("iframe:visible").each(function(){var t=_.uniqueId("overlay-"),i=$(this).attr("data-overlay",t).before($('<div id="'+t+'" class="dndmask">').on(e,function(e){var t=$.Event(e.type,{offsetX:e.offsetX,offsetY:e.offsetY});$("body",i.contents()).trigger(t)}))})}},100);ox.on("drag:start",_.partial(t,!0)),ox.on("drag:stop",_.partial(t,!1));var i=Backbone.View.extend({className:"inplace-dropzone",events:{drop:"onDrop","dragenter .dropzone-overlay":"onDragenter","dragover .dropzone-overlay":"onDragover","dragleave .dropzone-overlay":"onDragleave"},onLeave:function(e){this.leaving&&(ox.trigger("drag:stop",this.cid),this.hide(e))},onDrag:function(e){if(this.$el.parent().is(":visible")&&this.isSupported())switch(e.type){case"dragenter":case"dragover":if(ox.trigger("drag:start",this.cid),this.stop(e),this.leaving=!1,this.checked)return;if(this.checked=!0,!this.isValid(e))return;return this.visible||this.show(),!1;case"dragleave":this.leaving=!0,clearTimeout(this.timeout),this.timeout=setTimeout(this.onLeave.bind(this),100,e);break;case"drop":return ox.trigger("drag:stop",this.cid),this.stop(e),this.hide(),!1}},isSupported:_.constant(!0),stop:function(e){e.preventDefault(),e.stopPropagation()},show:function(){this.visible=!0,this.$el.show(),this.trigger("show"),$(window).trigger("resize")},hide:function(){this.visible=this.checked=!1,this.$el.hide().removeClass("dragover"),this.trigger("hide")},initialize:function(t){this.options=t,this.checked=!1,this.visible=!1,this.leaving=!1,this.timeout=-1,this.eventTarget=t.eventTarget,this.onDrag=this.onDrag.bind(this),$(document).on(e,this.onDrag),_.device("firefox")&&(this.onMouseenter=this.onMouseenter.bind(this),$(document).on("mouseenter",this.onMouseenter)),this.eventTarget&&(this.eventTargetDocument="#document"===this.eventTarget.prop("nodeName")?this.eventTarget.get(0):this.eventTarget.prop("ownerDocument"),this.eventTargetDocument!==document&&$(this.eventTargetDocument).on(e,this.onDrag),this.onDrop=this.onDrop.bind(this),this.onDragenter=this.onDragenter.bind(this),this.onDragover=this.onDragover.bind(this),this.onDragleave=this.onDragleave.bind(this),this.eventTarget.on("drop",this.onDrop).on("dragenter",this.onDragenter).on("dragover",this.onDragover).on("dragleave",this.onDragleave)),this.$el.on("dispose",function(e){this.dispose(e)}.bind(this))},isValid:function(e){return _.isFunction(this.isEnabled)?this.isEnabled(e)&&this.isFile(e):this.isFile(e)},isEnabled:!0,isFile:function(e){var t=e.originalEvent.dataTransfer;return _(t.types).contains("Files")||_(t.types).contains("application/x-moz-file")},filterDirectories:function(e){var t=new $.Deferred,i=_(e.files).toArray();if(_.browser.Chrome&&_.browser.Chrome>21||_.browser.firefox&&_.browser.firefox>=50||_.browser.edge){var r=e.items;t.resolve(_(i).filter(function(e,t){return!r[t].webkitGetAsEntry().isDirectory}))}else $.when.apply(this,_(i).map(function(e){if(!e.type&&e.size<=16384){var t=new $.Deferred,i=new FileReader;return i.onloadend=function(){t.resolve(i.error)},i.readAsDataURL(e),t}return $.when()})).done(function(){var e=arguments;t.resolve(_(i).filter(function(t,i){return!e[i]}))});return t},getFiles:function(e){var t=e.originalEvent.dataTransfer,i=t.files.length,r=this.options.filter;return this.filterDirectories(t).then(function(e){return e.length&&i===e.length||0===i||require(["io.ox/core/yell","gettext!io.ox/core"],function(e,t){e("error",t("Uploading folders is not supported."))}),_.isRegExp(r)?_(e).filter(function(e){return r.test(e.name)}):e})},onDragenter:function(e){$(e.currentTarget).parent().addClass("dragover")},onDragover:function(e){e.originalEvent.dataTransfer.dropEffect="copy"},onDragleave:function(e){$(e.currentTarget).parent().removeClass("dragover")},onMouseenter:function(e){this.visible&&(e.relatedTarget||e.toElement||_.delay(function(){this.leaving=!0,clearTimeout(this.timeout),this.onLeave(e)}.bind(this),50))},onDrop:function(e){var t=this;this.getFiles(e).then(function(i){t.trigger(i.length>0?"drop":"invalid",i,e)},function(){t.trigger("invalid",[],e)})},render:function(){return this.$el.hide().append($('<div class="abs dropzone-caption">').text(this.options.caption||""),$('<div class="abs dropzone-dragover"><i class="fa fa-check" aria-hidden="true"></i></div>'),$('<div class="abs dropzone-overlay">')),this},dispose:function(){this.stopListening(),$(document).off(e,this.onDrag),_.device("firefox")&&$(document).off("mouseenter",this.onMouseenter),this.eventTarget&&(this.eventTargetDocument!==document&&$(this.eventTargetDocument).off(e,this.onDrag),this.eventTarget.off("drop",this.onDrop).off("dragenter",this.onDragenter).off("dragover",this.onDragover).off("dragleave",this.onDragleave))}});return $(document).on("dragover drop",!1),{Inplace:i}});