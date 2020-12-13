define("io.ox/backbone/views",["io.ox/core/extensions","io.ox/core/event"],function(t,i){"use strict";function e(i,e){e=e||{};var n=i.id;delete i.id,i.initialize=i.initialize||function(o){this.options=o,this.update&&this.listenTo(this.model,"change",this.update),this.$el.attr({"data-extension-id":e.id||n,"data-extension-point":i.ref||"","data-composite-id":this.model&&this.model.getCompositeId?this.model.getCompositeId():null}),this.baton=t.Baton(this.options),i.init&&i.init.apply(this,$.makeArray(arguments)),i.customizeNode&&this.customizeNode()},i.close=i.close||function(){this.$el.remove(),this.$el.trigger("dispose")};var o=Backbone.View.extend(i);return o.extId=n,o}function n(t,i,e){return e=e||{},_.extend({},{id:t.extId,index:i.index,draw:function(e){var n=new t(e);i.registerAs&&(e[i.registerAs]=n),n.render(),this.append(n.$el)}},e)}function o(o){this.basicExtend=function(i){return t.point(o).extend(i),this},this.extend=function(t,i){var s=e(_.extend({},t,{ref:o}),i);return this.basicExtend(n(s,t,i))},this.createView=function(e){return e=e||{},delete e.id,e.render=e.render||function(){return this.point.invoke.apply(this.point,["draw",this.$el].concat(this.extensionOptions?this.extensionOptions():[this.baton])),this},e.initialize=e.initialize||function(e){function n(){o.$el.empty(),o.render()}i.extend(this),this.options=e,this.baton=t.Baton(_.extend({},this.options,{parentView:this})),this.init&&this.init.apply(this,$.makeArray(arguments));var o=this;this.point.on("extended",n),o.$el.on("dispose",function(){o.point.off("extended",n)})},e.point=e.point||t.point(o),Backbone.View.extend(e)}}return{point:function(t){return new o(t)}}});