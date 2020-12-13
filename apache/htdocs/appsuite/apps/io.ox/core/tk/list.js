define("io.ox/core/tk/list",["io.ox/backbone/views/disposable","io.ox/backbone/mini-views/contextmenu-utils","io.ox/core/tk/list-selection","io.ox/core/tk/list-dnd","io.ox/core/extensions"],function(t,e,i,s,o){"use strict";function n(){return $.when()}var l={13:"enter",27:"escape",32:"space",37:"cursor:left",38:"cursor:up",39:"cursor:right",40:"cursor:down"};return t.extend({tagName:"ul",className:"list-view",scaffold:$('<li class="list-item"><div class="list-item-checkmark"><i class="fa fa-checkmark" aria-hidden="true"></i></div><div class="list-item-content"></div><div class="list-item-swipe-conent"></div></li>'),busyIndicator:$('<li class="busy-indicator" role="presentation"><i class="fa fa-chevron-down" aria-hidden="true"></i></li>'),notification:$('<li class="abs notification hidden" role="presentation"></li>'),pullToRefreshIndicator:$('<div class="pull-to-refresh" style="transform: translate3d(0, -70px,0)"><div class="spinner slight-drop-shadow" style="opacity: 1"><i id="ptr-spinner" class="fa fa-refresh" aria-hidden="true"></i></div></div>'),onItemFocus:function(){this.toggleFocus(!0)},onItemBlur:function(){this.mousedown||this.toggleFocus(!1)},onKeepFocus:function(t){t.target===this.el&&t.pageX&&this.restoreFocus()},onContextMenu:function(){},restoreFocus:function(t){var e=this.getItems(),i=e.filter(".selected");0!==i.length?1===i.length?i.focus():1===i.filter(document.activeElement).length?i.filter(document.activeElement).focus():i.last().focus():t&&this.selection.select(0,e)},onItemKeydown:function(t){l[t.which]&&this.trigger(l[t.which],t),e.macOSKeyboardHandler(t),t.isKeyboardEvent&&this.onContextMenu(t)},onScroll:_.throttle(function(){if(!this.disposed&&!this.isBusy&&this.loader.collection&&!this.collection.complete&&this.$el.is(":visible")){var t=this.$el.outerHeight();(this.el.scrollTop+t)/this.el.scrollHeight<.8||(this.addBusyIndicator(),this.processPaginate())}},20),onLoad:function(){this.idle(),this.isComplete()||this.onScroll()},onComplete:function(t){this.toggleComplete(!1!==t)},processPaginate:function(){!this.options.pagination||this.isBusy||this.isComplete()||this.paginate()},getCompositeKey:function(t){return t.isFolder&&t.isFolder()?"folder."+t.get("id"):t.cid},onModelChange:function(){this.load()},empty:function(){this.idle(),this.toggleComplete(!1),this.getItems().remove(),delete this.currentLabel,this.$(".list-item-label").remove(),this.selection&&this.selection.reset(),this.$el.scrollTop(0)},renderNotification:function(t){var e=o.Baton({app:this.app,options:this.options,listView:this}),i=o.point(this.ref+"/notification/"+t),s=!this.collection.length,n=this.$(".notification").attr("role","error"===t?"alert":"presentation").empty();s&&i.keys().length&&i.invoke("draw",n,e),n.toggleClass("hidden",!s)},renderEmpty:function(){this.renderNotification("empty")},renderError:function(){this.idle(),this.renderNotification("error")},onReset:function(){var t=this;this.empty(),this.collection.each(function(e){t.$el.append(t.renderListItem(e,!0))}),this.trigger("reset",this.collection,this.firstReset),this.firstReset&&(this.trigger("first-reset",this.collection),this.firstReset=!1),this.firstContent&&this.collection.length&&(this.trigger("first-content",this.collection),this.firstContent=!1),this.trigger("listview:reset")},onAdd:function(t){this.queue.add(t).render()},lastElementOfLabel:function(t){var e=t.prev(),i=t.next(),s=t.attr("data-label");return e.attr("data-label")!==s&&i.attr("data-label")!==s},onRemove:function(t){var e=this.getItems(),i=this.getCompositeKey(t),s=e.filter('[data-cid="'+$.escape(i)+'"]'),o=s.hasClass("selected");0!==s.length&&(s[0].offsetTop<this.el.scrollTop&&(this.el.scrollTop-=s.outerHeight(!0)),this.selection&&this.selection.remove(i,s),this.options.labels&&this.lastElementOfLabel(s)&&s.prev().remove(),s.remove(),this.trigger("remove-mobile"),o&&this.selection.triggerChange(),e.length>1&&_.defer(function(){this.$el.trigger("scroll")}.bind(this)),this.trigger("remove",t))},onBatchRemove:function(t){var e={};_(t).each(function(t){if(_.isObject(t)){var i=t.cid||_.cid(t);e[i]=!0}else e[t]=!0});var i=this.getItems();if(0!==i.length){var s=i.filter(".selected")[0];if(i.filter(function(){var t=$(this).attr("data-cid");return!!e[t]}).remove(),this.renderEmpty(),s){var o=$(s).position().top;(o<0||o>this.el.offsetHeight)&&s.scrollIntoView()}}},onSort:function(){function t(t){return t&&parseInt(t.getAttribute("data-index"),10)}return function(){if(!this.queue.list.length){var e,i,s,o,n,l,r,a,h,c={};for(e=this.getItems().toArray(),s=0,o=0,n=(i=_(e).sortBy(t)).length;s<n;s++)if(l=i[s],r=e[o],c[s]=!0,this.options.labels&&(h=this.getLabel(this.collection.get($(l).attr("data-cid"))),$(l).attr("data-label",h)),l===r)do{a=t(e[++o])}while(c[a]);else r&&this.el.insertBefore(l,r);this.options.labels&&_.defer(function(){var t,e,i=this;this.$el.find(".list-item").toArray().forEach(function(s){if($(s).hasClass("list-item-label"))t=$(s).text(),$(s).next().hasClass("appointment")&&$(s).next().attr("data-label")===t&&e!==t?e=t:$(s).remove();else{var o=$(s).attr("data-label");o!==e&&(e=t=o,i.el.insertBefore(i.renderListLabel(o)[0],s))}})}.bind(this))}}}(),onTouchStart:function(t){if(!this.options.noPullToRefresh){var e=0===this.$el.scrollTop(),i=t.originalEvent.touches[0],s=i.pageY,o=i.pageX;e&&(this.pullToRefreshStartY=s,this.pullToRefreshStartX=o)}},onTouchMove:function(t){var e=t.originalEvent.touches[0].pageY,i=e-this.pullToRefreshStartY;if(!this.pullToRefreshStartY||this.isPulling||this.isSwiping||e-this.pullToRefreshStartY>=5&&(t.preventDefault(),t.stopPropagation(),this.selection.isScrolling=!0,this.isPulling=!0,this.$el.prepend(this.pullToRefreshIndicator)),this.isPulling&&i<=300){this.pullToRefreshTriggerd=!1,t.preventDefault(),t.stopPropagation();var s=1.2*i,o=70/150*i-70;this.pullToRefreshIndicator.css("-webkit-transform","translate3d(0,"+o+"px,0)"),$("#ptr-spinner").css("-webkit-transform","rotateZ("+s+"deg)"),this.selection.isScrolling=!0,e-this.pullToRefreshStartY>=150&&(this.pullToRefreshTriggerd=!0)}else this.isPulling&&i>=300&&(t.preventDefault(),t.stopPropagation())},onTouchEnd:function(t){this.pullToRefreshTriggerd?(this.pullToRefreshIndicator.css({transition:"transform 50ms","-webkit-transform":"translate3d(0,0,0)"}),$("#ptr-spinner").addClass("fa-spin"),this.options.app.trigger("pull-to-refresh",this),t.preventDefault(),t.stopPropagation()):this.isPulling&&(this.removePullToRefreshIndicator(!0),t.preventDefault(),t.stopPropagation()),this.selection.isScrolling=!1,this.pullToRefreshStartY=null,this.isPulling=!1,this.pullToRefreshTriggerd=!1,this.pullToRefreshStartY=null},removePullToRefreshIndicator:function(t){var e=this;t?(e.pullToRefreshIndicator.css({transition:"transform 50ms","-webkit-transform":"translate3d(0,-70px,0)"}),setTimeout(function(){e.pullToRefreshIndicator.removeAttr("style").remove()},100)):setTimeout(function(){e.pullToRefreshIndicator.addClass("scale-down"),setTimeout(function(){e.pullToRefreshIndicator.removeAttr("style").removeClass("scale-down"),$("#ptr-spinner").removeClass("fa-spin"),e.pullToRefreshIndicator.remove()},100)},250)},onChange:function(t){var e=this.$el.find('li[data-cid="'+$.escape(this.getCompositeKey(t))+'"]'),i=this.getBaton(t),s=t.changed.index,n=_.keys(t.changed);void 0!==s&&e.attr("data-index",s),(void 0===s||n.length>1)&&o.point(this.ref+"/item").invoke("draw",e.children().eq(1).empty(),i),this.trigger("change",t)},onChangeCID:function(t){var e=t.clone();e.set(t.previousAttributes()),this.$el.find('li[data-cid="'+$.escape(this.getCompositeKey(e))+'"]').attr("data-cid",this.getCompositeKey(t))},initialize:function(t){this.options=_.extend({pagination:!0,draggable:!1,selection:!0,scrollable:!0,swipe:!1,labels:!1},t),this.toggleFocus=_.debounce(function(t){this.disposed||(this.$el.attr("tabindex",t?-1:0),this.$el.toggleClass("has-focus",t))},10);var e={},o=!1,n=this;if(this.options.selection?(this.selection=new i(this,this.options.selection),e={"focus .list-item":"onItemFocus","blur .list-item":"onItemBlur",click:"onKeepFocus",contextmenu:"onContextMenu","keydown .list-item":"onItemKeydown"},_.device("smartphone")&&_.extend(e,{touchstart:"onTouchStart",touchend:"onTouchEnd",touchmove:"onTouchMove"}),_.device("!smartphone")&&this.$el.addClass("visible-selection"),s.enable({draggable:!0,container:this.$el,selection:this.selection}),o=!0,this.$el.addClass("f6-target")):this.toggleCheckboxes(!1),this.options.scrollable&&this.$el.addClass("scrollpane"),this.options.pagination&&(e.scroll="onScroll"),this.options.collection&&(this.setCollection(this.collection),this.collection.length&&this.onReset()),this.options.draggable&&!o&&s.enable({draggable:!0,container:this.$el,selection:this.selection}),this.options.labels&&(this.filter=function(){return!$(this).hasClass("list-item-label")}),this.ref=this.ref||t.ref,this.app=t.app,this.model=new Backbone.Model,this.isBusy=!1,this.firstReset=!0,this.firstContent=!0,this.delegateEvents(e),this.model.on("change",_.debounce(this.onModelChange,10),this),_.bindAll(this,"busy","idle"),_.device("!smartphone")&&this.$el.addClass("visible-selection"),_.device("smartphone")){var l,r=0;this.selection&&(this.selection.isScrolling=!1,this.$el.scroll(function(){n.$el.scrollTop()!==r&&(n.selection.isScrolling=!0,r=n.$el.scrollTop()),l&&clearTimeout(l),l=setTimeout(function(){n.selection.isScrolling=!1},500)}))}this.queue={list:[],add:function(t){return this.list.push(t),this},render:_.debounce(this.renderListItems.bind(this),10),iterate:function(t){try{this.list.forEach(t.bind(n))}catch(t){ox.debug&&console.error("ListView.iterate",t)}finally{this.list=[]}}}},forwardCollectionEvents:function(t){var e=_(arguments).toArray().slice(1);e.unshift("collection:"+t),this.trigger.apply(this,e)},setCollection:function(t){if(t)return this.collection&&this.stopListening(this.collection),this.collection=t,this.toggleComplete(this.collection.complete),this.toggleExpired(!1),this.listenTo(t,{all:this.forwardCollectionEvents,add:this.onAdd,change:this.onChange,"change:cid":this.onChangeCID,remove:this.onRemove,reset:this.onReset,sort:this.onSort,"before:load":this.busy,load:this.onLoad,"load:fail":this.renderError,"before:paginate":this.busy,paginate:this.idle,"paginate:fail":this.idle,complete:this.onComplete,reload:this.idle,expire:this.onExpire}),this.listenTo(t,{add:this.renderEmpty,remove:this.renderEmpty,reset:this.renderEmpty}),this.selection&&this.selection.reset(),this.trigger("collection:set"),this},onExpire:function(){this.toggleExpired(!1)},toggleExpired:function(t){this.collection.expired=t},toggleComplete:function(t){this.options.pagination||(t=!0),this.$el.toggleClass("complete",t)},isComplete:function(){return this.collection&&this.collection.complete},toggleCheckboxes:function(t){this.$el.toggleClass("hide-checkboxes",void 0===t?void 0:!t)},getItems:function(){var t=this.$el.find(".list-item");return this.filter&&(t=t.filter(this.filter)),t},setFilter:function(t){this.filter=t;var e=this.$el.find(".list-item");e.removeClass("hidden"),this.filter?(e.not(this.filter).addClass("hidden"),e.filter(this.filter).each(function(t){$(this).addClass(t%2?"even":"odd")})):e.removeClass("even odd")},connect:function(t){this.collection&&this.stopListening(this.collection),this.collection=t.getDefaultCollection(),this.options.pagination&&!this.loader&&(this.onScroll=this.onScroll.bind(this),this.listenToDOM(window,"resize",this.onScroll)),this.loader=t,this.load=function(e){this.empty(),t.load(_.extend(this.model.toJSON(),e)),this.setCollection(t.collection)},this.paginate=function(e){t.paginate(_.extend(this.model.toJSON(),e))},this.reload=function(e){t.reload(_.extend(this.model.toJSON(),e))}},load:n,paginate:n,reload:n,map:function(t){return t.toJSON()},render:function(){return this.options.selection&&this.$el.attr({"aria-multiselectable":!0,role:"listbox",tabindex:0}),this.$el.attr("data-ref",this.ref),this.addNotification(),_.device("phantomjs")&&this.$el.addClass("no-transition"),this},redraw:function(){var t=o.point(this.ref+"/item"),e=this.collection;this.getItems().each(function(i,s){if(!(i>=e.length)){var o=e.at(i),n=this.getBaton(o);t.invoke("draw",$(s).children().eq(1).empty(),n)}}.bind(this))},createListItem:function(){var t=this.scaffold.clone();return this.options.selection&&t.addClass("selectable").attr({"aria-selected":!1,role:"option",tabindex:"-1"}),t},getPreviousLabel:function(t){for(var e=t;e.length>0&&!e.hasClass("list-item-label");)e=e.prev();return e.text()},renderListLabel:function(t){return $('<li class="list-item list-item-label" role="presentation">').text(t)},renderListItem:function(t,e){var i=this.createListItem(),s=this.getBaton(t),n=i.children().eq(1);if(e&&this.options.labels){var l=this.getLabel(t);this.currentLabel!==l&&(this.$el.append(this.renderListLabel(l)),this.currentLabel=l)}return this.options.useButtonMarkup&&i.children().wrapAll('<button type="button" class="btn-unstyled">'),i.attr({"data-cid":this.getCompositeKey(t),"data-index":t.get("index")}),this.options.labels&&i.attr("data-label",this.getLabel(t)),o.point(this.ref+"/item").invoke("draw",n,s),i},renderListItems:function(){this.idle();var t=this.getItems();this.queue.iterate(function(e){var i,s,o=e.has("index")?e.get("index"):this.collection.indexOf(e),n=this.renderListItem(e,!1);if(o<t.length){var l=t.eq(o);this.options.labels&&(i=this.getLabel(e))!==(s=this.getPreviousLabel(l))&&(l=l.prev()),l.before(n),n[0].offsetTop<=this.el.scrollTop&&(this.el.scrollTop+=n.outerHeight(!0))}else this.$el.append(n);this.options.labels&&(s=this.getPreviousLabel(n),(i=this.getLabel(e))!==s&&n.before(this.renderListLabel(i))),this.trigger("add",e,o),this.trigger("add:"+e.cid,e,o)}),this.onSort()},getBaton:function(t){var e=this.map(t);return o.Baton({data:e,model:t,app:this.app,options:this.options})},getBusyIndicator:function(){return this.$el.find(".busy-indicator")},addNotification:function(){this.notification.clone().appendTo(this.$el)},addBusyIndicator:function(){var t=this.getBusyIndicator();return t.index()<this.$el.children().length&&t.appendTo(this.$el),t.length?t:this.busyIndicator.clone().appendTo(this.$el)},removeBusyIndicator:function(){this.getBusyIndicator().remove()},busy:function(){if(!this.isBusy)return this.$(".notification").css("display","none"),this.addBusyIndicator().addClass("io-ox-busy").find("i").remove(),this.isBusy=!0,this},idle:function(t){if(t&&t.error&&require(["io.ox/core/yell"],function(e){e(t)}),this.isBusy)return this.removeBusyIndicator(),this.isBusy=!1,this.$(".notification").css("display",""),this},getPosition:function(){return this.selection.getPosition()},hasNext:function(){return!!this.collection&&(this.getPosition()+1<this.collection.length||!this.isComplete())},next:function(){this.hasNext()?this.selection.next():this.processPaginate()},hasPrevious:function(){return!!this.collection&&this.getPosition()-1>=0},previous:function(){this.hasPrevious()?this.selection.previous():this.$el.scrollTop(0)},focus:function(){0===this.getItems().filter(".selected").focus().length&&this.$el.focus()}})});