define("io.ox/backbone/mini-views/abstract",[],function(){"use strict";return Backbone.View.extend({initialize:function(i){var t=this.options=i||{};void 0===t.validate&&(t.validate=!0),t.id&&!t.name&&(t.name=t.id),this.$el.on("dispose",function(i){this.dispose(i)}.bind(this)),this.$el.data("view",this),this.model&&t.name&&(this.name=t.name,this.listenTo(this.model,"valid:"+t.name,this.valid),this.listenTo(this.model,"invalid:"+t.name,this.invalid)),this.setup&&this.setup(t)},valid:function(){this.$el.trigger("valid")},invalid:function(i,t){this.$el.trigger("invalid",[i,t])},dispose:function(){this.stopListening(),this.model=null}})});