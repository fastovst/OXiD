define("io.ox/core/viewer/views/types/contactview",["io.ox/core/extensions","io.ox/core/viewer/views/types/baseview","io.ox/contacts/view-detail"],function(e,i,t){"use strict";return i.extend({initialize:function(){this.isPrefetched=!1},render:function(){return this.$el.empty().css("display","block"),this},prefetch:function(){return this.isPrefetched=!0,this},show:function(){var i=new e.Baton({data:this.model.toJSON()});return i.disable("io.ox/contacts/detail","inline-actions"),this.$el.append($('<div class="white-page">').append(t.draw(i))),this},unload:function(){return this.isPrefetched=!1,this}})});