define("io.ox/core/tk/list-selection",["settings!io.ox/core"],function(e){"use strict";function t(e,t){switch(t=_.isObject(t)?t:{},this.view=e,this.behavior=t.behavior||r,this._direction="down",this._lastPosition=-1,this.behavior){case"normal":_.extend(this,l);break;case"alternative":_.extend(this,l,h);break;case"simple":_.extend(this,u);break;default:console.error("Unknown selection behavior",this.behavior)}this.registerEvents()}var i,s=".selectable",n=_.device("touch"),o=_.device("android")&&_.browser.android<"4.4",r=e.get("selectionMode","normal"),a=!1,c={get:function(){return _(this.view.$el.find(".selectable.selected")).map(function(e){return $(e).attr("data-cid")})},resolve:function(){var e=this.view;return this.get().map(function(t){return e.collection.get(t)})},getItems:function(e){var t=this.view.$el.find(s);return e?t.filter(e):t},getNode:function(e){return this.getItems().filter('[data-cid="'+e+'"]')},getPosition:function(e){var t=(e=e||this.getItems()).index(e.filter(".precursor"));return t!==this._lastPosition&&(this._direction=t<this._lastPosition?"up":"down"),this._lastPosition=t,t},getDirection:function(){return this._direction},check:function(e){e.addClass("selected").attr("aria-selected",!0),this.triggerSelectEvent("add",e)},uncheck:function(e){e.removeClass("selected no-checkbox").attr({"aria-selected":!1,tabindex:"-1"}),this.triggerSelectEvent("remove",e)},toggle:function(e){e.hasClass("selected")?this.uncheck(e):this.check(e)},triggerSelectEvent:function(e,t){var i=t.map(function(){return $(this).attr("data-cid")}).toArray();this.view.trigger("selection:"+e,i)},set:function(e,t){if(_.isArray(e)){var i=this.getItems(),s={};if(this.clear(),_(e).each(function(e){var t="string"==typeof e?e:_.cid(e);s[t]=!0}),i=i.filter(function(){return $(this).attr("data-cid")in s}),this.check(i),i.length){var n=i.last().attr("tabindex","0");t&&n.focus()}this.triggerChange()}},triggerAction:function(e){var t=$(e.currentTarget).attr("data-cid");this.view.trigger("selection:action",[t])},triggerDouble:function(e){var t=$(e.currentTarget).attr("data-cid");this.view.trigger("selection:doubleclick",[t])},triggerChange:function(e,t){e=e||this.getItems();var i=this.get(),s="selection:change";0===i.length?s+=" selection:empty":1===i.length?s+=" selection:one":i.length>1&&(s+=" selection:multiple"),e&&e.length>0&&e.length===i.length&&(1!==e.length||!$(e[0]).hasClass("no-checkbox"))?s+=" selection:all":s+=" selection:subset",this.view.trigger(s,i,t)},clear:function(e){e=e||this.getItems(),this.resetTabIndex(e),this.resetCheckmark(e),this.reset()},reset:function(){this.triggerChange()},remove:function(e,t){(t=t||this.getNode(e)).is(".selected")&&this.triggerChange()},isRange:function(e){return e&&e.shiftKey},isCheckmark:function(e){return e&&$(e.target).is(".list-item-checkmark, .fa.fa-checkmark")},isMultiple:function(e){return e&&(e.metaKey||e.ctrlKey||/35|36/.test(e.which)||this.isCheckmark(e))},isEmpty:function(){return _.isEmpty(this.get())},resetTabIndex:function(e,t){(e=e.filter('[tabindex="0"]')).not(t).attr("tabindex","-1")},resetCheckmark:function(e){e=e.filter(".selected").removeClass("selected no-checkbox").attr("aria-selected",!1),this.triggerSelectEvent("remove",e)},resetSwipe:function(e){var t=e.filter(".swipe-left");return t.removeClass("swipe-left").find(".swipe-left-content").remove(),!!t.length},focus:function(e,t,i){var s=(t=t||this.getItems()).eq(e).attr("tabindex","0");return!1!==i&&(_.device("ie")?_.defer(function(){s.focus()}):s.focus()),_.device("chrome < 48")&&s.hide(0,function(){$(this).show()}),s},pick:function(e,t,i,s){var n;t=t||this.getItems(),this.isRange(i)?this.pickRange(e,t):(t.removeClass("precursor"),n=this.focus(e,t,s).addClass("precursor"),this.isMultiple(i)?this.pickMultiple(n,t):this.pickSingle(n))},pickRange:function(e,t){var i=this.getPosition(t,e),s=Math.min(e,i),n=Math.max(e,i);$(t.slice(s,n+1)).removeClass("no-checkbox"),this.check(t.slice(s,n+1)),this.focus(e,t)},pickMultiple:function(e,t){e.hasClass("selected no-checkbox")?e.removeClass("no-checkbox"):(t.filter(".no-checkbox").removeClass("selected no-checkbox").attr("aria-selected",!1),this.toggle(e))},pickSingle:function(e){this.check(e)},select:function(e,t,i){e>=(t=t||this.getItems()).length||(this.resetCheckmark(t),this.resetTabIndex(t,t.eq(e)),this.pick(e,t,null,i),this.selectEvents(t))},selectEvents:function(e){this.triggerChange(e)},selectAll:function(e){var t=(e=_.isString(e)?this.getItems(e):e||this.getItems()).slice(0,e.length);t.removeClass("no-checkbox precursor"),t.first().addClass("precursor"),this.check(t),this.focus(0,e),this.triggerChange(e)},selectNone:function(){this.clear(),this.triggerChange()},move:function(e){var t=this.getItems(),i=this.getPosition()+e;i<0?i=0:i>=t.length&&(i=t.length-1),this.select(i,t)},previous:function(){this.move(-1),this.view.trigger("selection:action",this.get())},next:function(){this.move(1),this.view.trigger("selection:action",this.get())},dodge:function(){var e=this.getItems(),t=e.filter(".selected"),i=t.length,s=e.index(t.first()),n=e.index(t.last()),o=e.length-1,r=this.select.bind(this),a=this.getDirection(),c=$.contains(this.view.el,document.activeElement);return e.length===i?this.clear():"up"===a&&s>0?r(s-1,e,c):"down"===a&&n<o?r(n+1,e,c):void e.slice(s).each(function(t){if(!$(this).hasClass("selected"))return r(s+t,e,c),!1})},onCursor:function(e){var t=this.view.$el.hasClass("grid-layout"),i=/37|39/.test(e.which);if(t||!i){var s=this.getItems(),n=$(document.activeElement),o=s.index(n)||0,r=parseInt(this.view.$el.attr("grid-count")||1,10),a=o%r,c=/38|40|35|36/.test(e.which),l=/37|38|36/.test(e.which),h=t&&c?r:1;if(o+=l?-h:+h,h>1&&/40|35/.test(e.which)&&o>=s.length&&a>=s.length%r&&(o=s.length-1),!1!==(o=this.outOfBounds(o,s))){e.preventDefault(),this.isMultiple(e)&&(o=/38|36/.test(e.which)?0:-1);var u=s.eq(o);this.resetTabIndex(s,u),this.resetCheckmark(s),this.pick(o,s,e),this.getPosition(),this.isMultiple(e)||this.isRange(e)?this.triggerChange(s,u.attr("data-cid")):this.selectEvents(s)}}},outOfBounds:function(e,t){return!(e<0)&&(e>=t.length?(this.view.$el.scrollTop(16777215),!1):e)},onPageUpDown:function(e){e.preventDefault();var t,i=this.getItems().first().outerHeight();i&&(t=Math.floor(this.view.$el.height()/i),33===e.which?this.move(-t):this.move(t))},onKeydown:function(e){switch(e.which){case 13:case 32:this.triggerAction(e);break;case 65:case 97:e.ctrlKey||e.metaKey||a?(e.preventDefault(),this.selectAll()):65!==e.which||e.shiftKey||e.altKey||this.view.trigger("selection:archive",this.get());break;case 91:a=!0,setTimeout(function(){a=!1},2e3);break;case 8:case 46:if(e.ctrlKey||e.metaKey||e.altKey)return;e.preventDefault(),this.view.trigger("selection:delete",this.get(),e.shiftKey);break;case 35:case 36:case 37:case 38:case 39:case 40:this.onCursor(e);break;case 33:case 34:this.onPageUpDown(e)}},onMousedown:function(){this.view.mousedown=!0},onMouseup:function(){this.view.mousedown=!1},onClick:function(e,t){if(t=t||{},"tap"===e.type&&(e.preventDefault(),e.stopPropagation()),("mousedown"!==e.type||this.isMultiple(e)||!$(e.currentTarget).is(".selected"))&&("click"!==e.type||!this.isMultiple(e)||n)){var i=this.getItems(),s=$(e.currentTarget),o=i.index(s)||0,r=this.get();n&&this.resetSwipe(i)||e.isDefaultPrevented()&&"tap"!==e.type||(this.isMultiple(e)||this.resetCheckmark(i),this.resetTabIndex(i,i.eq(o)),this.pick(o,i,e),t.customEvents||_.isEqual(r,this.get())||this.triggerChange(i,$(e.currentTarget).attr("data-cid")))}},onSwipeDelete:function(e){e.preventDefault();var t=$(this.currentSelection).closest(s),i=t.attr("data-cid"),n=t.nextAll(),o=this,r=function(){this.removeAttr("style"),_(this).each(function(e){var t=$(e).data("velocity");t.transformCache={},$(e).data("velocity",t)}),o.view.off("remove-mobile",r)};n.length>0?n.velocity({translateY:"-84px"},{duration:200,complete:function(){o.view.on("remove-mobile",r,n),o.view.trigger("selection:delete",[i]),o.currentSelection.swipeCell.remove(),o.currentSelection.swipeCell=null,$(o.view).removeClass("unfolded"),o.currentSelection.unfolded=o.unfold=!1}}):(o.view.on("remove-mobile",r,n),o.view.trigger("selection:delete",[i]),o.currentSelection.swipeCell.remove(),o.currentSelection.swipeCell=null,$(o.view).removeClass("unfolded"),o.currentSelection.unfolded=o.unfold=!1)},onSwipeMore:function(e){e.preventDefault();var t=$(this.currentSelection).closest(s).attr("data-cid"),i=this;this.view.trigger("selection:more",[t],$(this.currentSelection.btnMore)),_.delay(function(){i.resetSwipeCell.call(i.currentSelection,i)},250)},isAnyCellUnfolded:function(){return!!this.unfold},resetSwipeCell:function(e,t,i){var s=this;try{e.startX=0,e.startY=0,e.unfold=!1,e.target=null,e.otherUnfolded=!1,i?($(s).removeAttr("style"),$(s).removeClass("unfolded"),s.swipeCell&&s.swipeCell.remove(),s.swipeCell=null):$(s).velocity({translateX:[0,t]},{duration:100,complete:function(){$(s).removeAttr("style"),$(s).removeClass("unfolded"),s.swipeCell&&s.swipeCell.remove(),s.swipeCell=null}})}catch(e){console.warn("something went wrong during reset",e)}},onTouchStart:function(e){var t=e.originalEvent.touches[0],i=t.pageX,s=t.pageY,n=$(this).css("transition","");this.startX=i,this.startY=s,this.distanceX=0,this.unfold=this.remove=this.scrolling=this.isMoving=!1,this.unfolded=n.hasClass("unfolded"),this.otherUnfolded=n.siblings().hasClass("unfolded"),!this.unfolded&&this.otherUnfolded&&e.data.resetSwipeCell.call(e.data.currentSelection,e.data,-190)},onTouchMove:function(e){var t=e.originalEvent.touches[0].pageX;if(!(e.originalEvent.touches.length>1||(this.distanceX=-1*(this.startX-t),this.scrolling=!1,t>this.startX&&!this.unfolded&&this.distanceX<=20)))if(e.data.isScrolling)this.scrolling=!0;else if(this.unfolded&&(this.distanceX+=-190),Math.abs(this.distanceX)>20||this.isMoving){if(e.preventDefault(),this.isMoving=!0,e.data.view.isSwiping=!0,this.target||(this.target=$(e.currentTarget)),this.swipeCell||(this.swipeCell=$('<div class="swipe-option-cell">').append(this.btnDelete=$('<div class="swipe-button delete">').append($('<i class="fa fa-trash" aria-hidden="true">')),this.btnMore=$('<div class="swipe-button more">').append(this.faBars=$('<i class="fa fa-bars" aria-hidden="true">'))).css("height",this.target.outerHeight()+"px"),this.target.before(this.swipeCell)),this.distanceX+20<=0||this.unfolded&&this.distanceX<=0){var i=this.unfolded?this.distanceX:this.distanceX+20;this.target.css({"-webkit-transform":"translate3d("+i+"px,0,0)",transform:"translate3d("+i+"px,0,0)"})}Math.abs(this.distanceX)>=250&&!this.expandDelete?(this.expandDelete=!0,this.btnDelete.css("width","100%"),this.btnMore.css("width",0),this.faBars.css("opacity",0)):this.expandDelete&&Math.abs(this.distanceX)<=250&&(this.expandDelete=!1,this.btnDelete.css("width","95px"),this.faBars.css("opacity",1),this.btnMore.removeAttr("style"))}},onTouchEnd:function(e){if(!this.scrolling)if(this.remove=this.unfold=e.data.view.isSwiping=!1,this.isMoving=!1,this.distanceX>0&&!this.unfolded)e.data.resetSwipeCell.call(this,e.data,0,!0);else{if(this.unfolded&&this.distanceX<=10)return e.data.resetSwipeCell.call(e.data.currentSelection,e.data,0===this.distanceX?-190:this.distanceX),!1;if(this.otherUnfolded&&Math.abs(this.distanceX)<=10)return!1;if(Math.abs(this.distanceX)>=40&&(this.unfold=!0),this.expandDelete&&(this.remove=!0,this.unfold=!1),i=$(this),this.unfold)this.expandDelete=!1,i.velocity({translateX:[-190,this.distanceX]},{duration:100,complete:function(){i.addClass("unfolded")}}),e.data.unfold=!0,e.data.currentSelection=this;else if(this.remove){var t=this,n=e.data.view,o=function(){this.removeAttr("style"),_(this).each(function(e){var t=$(e).data("velocity");t&&(t.transformCache={})}),n.off("remove-mobile",o)};$(this).velocity({translateX:["-100%",this.distanceX]},{duration:50,complete:function(){t.btnMore.remove(),t.startX=t.startY=0,i.data("velocity").transformCache={};var e=$(t).nextAll();if(e.length>0)e.velocity({translateY:"-84px"},{duration:200,complete:function(){var i=$(t).closest(s).attr("data-cid");n.on("remove-mobile",o,e),n.trigger("selection:delete",[i]),t.swipeCell.remove(),t.swipeCell=null,$(t).removeClass("unfolded"),t.unfolded=t.unfold=!1}});else{var r=$(t).closest(s).attr("data-cid");n.on("remove-mobile",o,e),n.trigger("selection:delete",[r]),t.swipeCell.remove(),t.swipeCell=null,$(t).removeClass("unfolded"),t.unfolded=t.unfold=!1}}})}else if(this.distanceX)return e.data.resetSwipeCell.call(this,e.data,Math.abs(this.distanceX)),!1;ox.off("delete:canceled").on("delete:canceled",function(){i.removeAttr("style"),i.nextAll().velocity({translateY:NaN})})}},onSwipeLeft:function(e){var t=$(e.currentTarget);t.hasClass("swipe-left")||(this.resetSwipe(this.getItems()),this.renderInplaceRemove(t),t.addClass("swipe-left"))},onSwipeRight:function(e){this.resetSwipe($(e.currentTarget))},inplaceRemoveScaffold:$('<div class="swipe-left-content"><i class="fa fa-trash-o" aria-hidden="true"></i></div>'),renderInplaceRemove:function(e){e.append(this.inplaceRemoveScaffold.clone())},onTapRemove:function(e){e.preventDefault(),e.stopImmediatePropagation();var t=$(e.currentTarget).closest(s).attr("data-cid");this.view.trigger("selection:delete",[t])},onFocus:function(){var e=this.getItems(),t=e.filter('[tabindex="0"]:first'),i=e.index(t);i=i<0?0:i,this.focus(i,e)},getBehavior:function(){return this.behavior}},l={registerEvents:function(){this.view.$el.on("mousedown",$.proxy(this.onMousedown,this)).on("mouseup",$.proxy(this.onMouseup,this)).on("keydown",s,$.proxy(this.onKeydown,this)).on(n?"tap":"mousedown click",s,$.proxy(this.onClick,this)).on("focus",$.proxy(function(){this.view.mousedown||this.onFocus()},this)).on(n?"tap":"click",s,$.proxy(function(e){this.isMultiple(e)||this.triggerAction(e)},this)).on("dblclick",s,$.proxy(function(e){e.ctrlKey||e.metaKey||this.triggerDouble(e)},this)).on("contextmenu",function(e){e.preventDefault()}),this.view.options.swipe&&(n&&_.device("android || ios")&&_.device("smartphone")&&!o?this.view.$el.on("touchstart",s,this,this.onTouchStart).on("touchmove",s,this,this.onTouchMove).on("touchend",s,this,this.onTouchEnd).on("tap",".swipe-button.delete",$.proxy(function(e){this.onSwipeDelete(e)},this)).on("tap",".swipe-button.more",$.proxy(function(e){this.onSwipeMore(e)},this)):n&&this.view.$el.on("swipeleft",s,$.proxy(this.onSwipeLeft,this)).on("swiperight",s,$.proxy(this.onSwipeRight,this)).on("tap",".swipe-left-content",$.proxy(this.onTapRemove,this)))}},h={pickSingle:function(e){e.addClass("selected no-checkbox").attr("aria-selected",!0),this.view.trigger("selection:subset")},onKeydown:function(e){if(32===e.which){e.preventDefault();var t=this.getItems().filter(".selected");1===t.length?t.find(".list-item-checkmark").trigger("mousedown"):0===t.length&&(t=$(this.getItems()[this.getItems().index($(document.activeElement))])).find(".list-item-checkmark").trigger("mousedown")}else c.onKeydown.call(this,e)},outOfBounds:function(e,t){return e<0?0:(e>=t.length&&(e=t.length-1,this.view.$el.scrollTop(16777215)),e)},onClick:function(e){var t=this.get(),i=$(e.currentTarget),s="mousedown"===e.type&&!this.isMultiple(e)&&!i.is(".selected");c.onClick.call(this,e,{customEvents:s}),s&&this.selectEvents(),_.isEqual(t,this.get())&&"mousedown"===e.type&&this.isMultiple(e)&&this.triggerChange(this.getItems(),i.attr("data-cid"))},selectEvents:function(e){if(e=e||this.getItems(),"list"===(this.view.app&&this.view.app.props.get("layout")||"list"))this.triggerChange(e);else{var t=this.get(),i="selection:change selection:action";e&&e.length>0&&e.length===t.length&&(1!==e.length||!$(e[0]).hasClass("no-checkbox"))?i+=" selection:all":i+=" selection:subset",t.length>1&&(i+=" selection:multiple"),this.view.trigger(i,t)}}},u={registerEvents:function(){this.view.$el.addClass("focus-indicator"),this.view.$el.on("click",s,$.proxy(this.onClick,this)).on("keydown",s,$.proxy(this.onKeydown,this)).on("focus",$.proxy(this.onFocus,this)).on("mousedown",$.proxy(this.onMousedown,this)).on("mouseup",$.proxy(this.onMouseup,this)),this.view.on("selection:empty",$.proxy(this.onSelectionEmpty,this))},isMultiple:function(){return!0},onSelectionEmpty:function(){this.getItems().parent().find("li:focus").length>0||(this._lastposition=-1)},onFocus:function(){if(!this.view.mousedown){var e=this.getItems(),t=e.filter('[tabindex="0"]:first'),i=e.index(t);this.focus(i>-1?i:0,e)}},onClick:function(e){var t=this.getItems(),i=$(e.currentTarget),s=t.index(i);this.resetTabIndex(t,t.eq(s)),this.pick(s,t,e),this.triggerChange(t,i.attr("data-cid")),this.setPosition(e)},onKeydown:function(e){switch(e.which){case 13:case 32:this.onSpace(e);break;case 38:case 40:this.onCursor(e);break;case 65:case 97:(e.ctrlKey||e.metaKey)&&(e.preventDefault(),this.selectAll());break;case 68:case 100:(e.ctrlKey||e.metaKey)&&(e.preventDefault(),this.selectNone(),this.focus(0))}},onSpace:function(e){this.onClick(e),e.preventDefault()},setPosition:function(e,t){this._lastposition=_.isUndefined(t)?this.getItems().index($(e.target).closest("li"))||0:t},getPosition:function(e,t){return this._lastposition>-1?this._lastposition:t},onCursor:function(e){var t=this.getItems(),i=$(document.activeElement),s=t.index(i)||0,n=40===e.which;if(e.preventDefault(),/^(40|38)$/.test(e.which)){if(s+=n?1:-1,s=this.outOfBounds(s,t),this.isRange(e))return this.setPosition(e),this.pickRange(s,t);this.triggerChange(t,i.attr("data-cid")),this.setPosition(e,s),this.focus(s,t)}}};return _.extend(t.prototype,c),t});