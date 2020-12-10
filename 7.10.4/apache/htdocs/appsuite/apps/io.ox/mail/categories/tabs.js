define("io.ox/mail/categories/tabs",["io.ox/mail/categories/api","io.ox/mail/api","io.ox/backbone/mini-views/helplink","io.ox/core/yell","io.ox/core/tk/list-dnd","gettext!io.ox/mail"],function(e,t,o,a,n,i){"use strict";return Backbone.View.extend({tagName:"ul",className:"classic-toolbar categories",events:{"click .category button":"onChangeTab",contextmenu:"onConfigureCategories",dblclick:"onConfigureCategories","selection:drop":"onMove","mousedown .category button":"respondToNonKeyboardFocus","blur .category button":"respondToNonKeyboardFocus"},initialize:function(t){this.props=t.props,this.collection=e.collection,this.$el.attr({role:"toolbar","aria-label":i("Inbox categories")}),n.enable({draggable:!0,container:this.$el,selection:this.selection,delegate:!0,dropzone:!0,dropzoneSelector:".category"}),this.listenTo(e,"move",this.openTrainNotification),this.listenTo(this.collection,"update reset change",_.debounce(this.render,200)),this.listenTo(this.props,"change:category_id",this.onCategoryChange)},respondToNonKeyboardFocus:function(e){if("focusout"===e.type)return $(e.currentTarget).removeAttr("style");this.$(".category button").removeAttr("style"),$(e.currentTarget).css({"border-bottom":"1px solid white",background:"white"})},render:function(){var e=this.props.get("category_id");return this.$el.empty().append(this.collection.map(function(t){return $('<li class="category" role="presentation">').append($('<button type="button" class="btn btn-link" draggable="false" tabindex="-1">').append($('<span class="category-name">').text(t.get("name")),$('<span class="category-counter">').append($('<span class="counter">').text(t.getCount()),$('<span class="sr-only">').text(i("Unread messages")))),$('<div class="category-drop-helper" aria-hidden="true">').text(i("Drop here!"))).toggle(t.isEnabled()).toggleClass("selected",t.get("id")===e).attr({"data-id":t.get("id")})}),$('<li class="free-space" aria-hidden="true">'),this.getHelpViewIcon()),this.$el.find("li:first > button").removeAttr("tabindex"),this},getHelpViewIcon:function(){return $('<li class="help" aria-hidden="true">').append(new o({href:"ox.appsuite.user.sect.email.manage.categories.html"}).render().$el)},onChangeTab:function(e){var t=$(e.currentTarget).parent().attr("data-id");this.props.set("category_id",t)},onCategoryChange:function(e,t){this.$(".category.selected").removeClass("selected"),this.$('.category[data-id="'+t+'"]').addClass("selected")},onConfigureCategories:function(e){e.preventDefault(),require(["io.ox/mail/categories/edit"],function(e){e.open()})},onMove:function(o,n){o.stopPropagation();var i=this.props.get("category_id"),r=n.target,s={data:t.resolve(n.data),source:i,sourcename:this.collection.get(i).get("name"),target:r,targetname:this.collection.get(r).get("name")};e.move(s).fail(a)},openTrainNotification:function(e){require(["io.ox/mail/categories/train"],function(t){t.open(e)})}})});