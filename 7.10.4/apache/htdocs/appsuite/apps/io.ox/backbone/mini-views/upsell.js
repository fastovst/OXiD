define("io.ox/backbone/mini-views/upsell",["io.ox/core/upsell","settings!io.ox/core"],function(t,e){"use strict";return Backbone.View.extend({tagName:"div",events:{"click a":"onClick"},onClick:function(e){e.preventDefault(),t.trigger({type:"custom",id:this.opt.id,missing:t.missing(this.opt.requires)})},initialize:function(i){this.opt=_.extend({icon:e.get("upsell/defaultIcon","fa-star"),enabled:!0},i,e.get("features/upsell/"+i.id),e.get("features/upsell/"+i.id+"/i18n/"+ox.language)),/^folderview\//.test(i.id)&&(this.setElement('<li role="presentation">'),this.$el.addClass(this.className)),this.$el.addClass("io-ox-upsell-link"),this.customize=this.opt.customize,this.icon=this.opt.icon,this.visible=this.opt.enabled&&!t.has(this.opt.requires)&&t.enabled(this.opt.requires)},render:function(){if(this.visible){var t=this,e=$('<a href="#">').css("color",this.opt.color).text(this.opt.title).append(_(this.icon.split(/ /)).map(function(e,i){if(""!==e)return $('<i class="fa" aria-hidden="true">').addClass(e).css({"margin-left":0===i&&t.opt.title&&t.opt.title.length>0?"0.5em":"",color:t.opt.color})}));/^folderview\//.test(this.opt.id)&&e.attr("role","treeitem"),this.$el.append(e),this.customize&&_.isFunction(this.customize)&&this.customize()}else this.$el.hide();return this}})});