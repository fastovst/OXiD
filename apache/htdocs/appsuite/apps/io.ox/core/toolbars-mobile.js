define("io.ox/core/toolbars-mobile",["io.ox/core/extensions"],function(t){"use strict";var e=Backbone.View.extend({show:function(){return this.$el.show(),this},hide:function(){return this.$el.hide(),this}});return{BarView:e,NavbarView:e.extend({tagName:"div",className:"toolbar-content",events:{"touchstart .navbar-action":"cantTouchThis","touchend .navbar-action":"cantTouchThis","tap .navbar-action.right:not(.custom)":"onRightAction","tap .navbar-action.left:not(.custom)":"onLeftAction"},initialize:function(t){this.title=t.title?t.title:"",this.left=!!t.left&&t.left,this.right=!!t.right&&t.right,this.baton=t.baton,this.extension=t.extension,this.hiddenElements=[],this.rendered=!1},render:function(){return this.$el.empty(),this.rendered=!0,t.point(this.extension).invoke("draw",this,{left:this.left,right:this.right,title:this.title,baton:this.baton}),this.$el.find(this.hiddenElements.join()).hide(),this},cantTouchThis:function(t){"touchstart"===t.type&&$(t.currentTarget).addClass("tapped"),"touchend"===t.type&&$(t.currentTarget).removeClass("tapped")},setLeft:function(t){return this.left=t,this.render(),this},setTitle:function(t){return this.title=t,this.render(),this},setRight:function(t){return this.right=t,this.render(),this},onRightAction:function(t){t.preventDefault(),t.stopImmediatePropagation(),this.trigger("rightAction")},onLeftAction:function(t){t.preventDefault(),t.stopImmediatePropagation(),this.trigger("leftAction")},hide:function(t){return this.hiddenElements.push(t),this.hiddenElements=_.uniq(this.hiddenElements),this.render(),this},show:function(t){return this.hiddenElements=_.without(this.hiddenElements,t),this.render(),this},setBaton:function(t){return this.baton=t,this.render(),this},toggle:function(t){this.$el.toggle(t)}}),ToolbarView:e.extend({initialize:function(t){this.page=t.page,this.baton=t.baton,this.extension=t.extension},render:function(){return this.$el.empty(),t.point(this.extension+"/"+this.page).invoke("draw",this.$el,this.baton),this},setBaton:function(t){return this.baton=t,this.render(),this}})}});