define("io.ox/core/tk/list-dnd",["io.ox/core/extensions","io.ox/core/collection","gettext!io.ox/core","io.ox/core/tk/draghelper"],function(e,t,o){"use strict";function n(e,t){return e=e.map(function(){return $.trim($(this).attr("title")||$(this).text())}),$.makeArray(e).join(t||"")}function d(e){return n(this.find(".selected .drag-title"),", ")||o.format(o.ngettext("1 item","%1$d items",e.length),e.length)}var r;return{enable:_.device("touch")?$.noop:function(o){function n(e){S=e.pageX+C,Y=e.pageY+w,(I(M-S)>=5||I(D-Y)>=5)&&(y.left=S+"px",y.top=Y+"px",M=S,D=Y)}function a(){z.trigger("selection:dragstart")}function i(){this.trigger("click")}function s(e){if(!e.isDefaultPrevented()){e.preventDefault();var t=$(this).find(".folder-arrow:first");$(this).addClass("dnd-over"),t.length&&(clearTimeout(r),r=setTimeout(i.bind(t),1500))}}function l(){clearTimeout(r),$(this).removeClass("dnd-over")}function u(t){$("body").addClass("dragging"),$(document).off("mousemove.dnd",u);var d=x.reduce(function(e,t){var o=$(t).find(".drag-count");return e+(o.length?parseInt(o.text(),10):1)},0);k=$('<div class="drag-helper">'),e.point("io.ox/core/tk/draghelper").invoke("draw",k,new e.Baton({container:z,count:d||h.length,data:h,source:b,dragMessage:o.dragMessage})),y=k[0].style,M=D=S=Y=0,n(t),k.appendTo(document.body),T=!0,$(document).one("mousemove.dnd",a).on("mousemove.dnd",n).on("mouseover.dnd",".folder-tree",P.over).on("mouseout.dnd",".folder-tree",P.out).on("mousemove.dnd",".folder-tree",P.move).on("mouseover.dnd",o.dropzoneSelector,s).on("mouseout.dnd",o.dropzoneSelector,l).on("keyup.dnd",f)}function c(){null!==k&&($("body").removeClass("dragging"),k.remove(),k=y=null)}function f(e){27===e.which&&g()}function g(){$("body").removeClass("dragging"),P.out(),$(document).off("mousemove.dnd mouseup.dnd mouseover.dnd mouseout.dnd keyup.dnd"),$(".dropzone").each(function(){var e=$(this),t=e.attr("data-dropzones");if(e.attr("data-delegate")&&t)return e.off("mouseup.dnd",t);(t?e.find(t):e).off("mouseup.dnd")}),$(".dnd-over").removeClass("dnd-over"),z.trigger("selection:dragstop"),null!==k&&c(),b=x=h=null}function p(t){if(!t.isDefaultPrevented()&&($("body").removeClass("dragging"),t.preventDefault(),clearTimeout(r),T)){var n=$(this).attr("data-model")||$(this).attr("data-id")||$(this).attr("data-cid")||$(this).attr("data-obj-id"),d=new e.Baton({data:h,dragType:o.dragType,dropzone:this,target:n});$(this).trigger("selection:drop",[d])}}function m(e){var t=Math.abs(e.pageX-e.data.x),o=Math.abs(e.pageY-e.data.y);(t>15||o>15)&&$(document).off("mousemove.dnd").on("mousemove.dnd",u)}function v(e){return 0===e.indexOf("folder.")?{folder_id:"folder",id:e.replace(/^folder./,"")}:_.cid(e.replace(/^thread./,""))}var h,b,x,y,z=(o=_.extend({container:$(),data:null,delegate:!1,draggable:!1,dragMessage:d,dragType:"",dropzone:!1,dropzoneSelector:".selectable",dropType:"",selection:null,selectable:".selectable",simple:!1},o)).container||$(),T=!1,k=null,C=15,w=15,M=0,D=0,S=0,Y=0,I=Math.abs,P=function(){var e=0,t=null;return{move:function(t){e=t.pageY-$(this).offset().top},out:function(){clearInterval(t),t=null},over:function(){if(!t){var o,n,d,r=this.clientHeight;t=setInterval(function(){o=e<r/2?-1:1,(n=Math.min(e,r-e))>24||(d=n<8?3:1,this.scrollTop+=o*d)}.bind(this),5)}}}}();o.draggable&&z.on("mousedown.dnd",o.selectable,function(e){T=!1,b=$(this),x=_(z.find(".selected")),h=b.attr("data-drag-data")?[b.attr("data-drag-data")]:x.map(function(e){return $(e).attr("data-cid")});var o=new t(_(h).map(v));o.getProperties(),o.isResolved()&&!o.has("delete")||($(".dropzone").each(function(){var e=$(this),t=e.attr("data-dropzones");if(e.attr("data-delegate")&&t)return e.on("mouseup.dnd",t,p);(t?e.find(t):e).on("mouseup.dnd",p)}),$(document).on("mousemove.dnd",{x:e.pageX,y:e.pageY},m).on("mouseup.dnd",g),e.preventDefault())}),o.delegate&&z.attr("data-delegate",!0),o.dropzone&&(null===o.selection&&console.error("list-dnd: Selection required for dropzone!",o),z.addClass("dropzone").attr("data-dropzones",o.dropzoneSelector).on("drop",function(e,t){t.dropType=o.dropType,o.selection.trigger("selection:drop",t)}))}}});