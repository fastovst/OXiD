define("io.ox/calendar/edit/view",["io.ox/backbone/views","io.ox/calendar/edit/extensions"],function(e){"use strict";return e.point("io.ox/calendar/edit/section").createView({tagName:"form",className:"io-ox-calendar-edit container",init:function(){this.collapsed=!1},render:function(){var e=this,n=[],i={};return this.point.each(function(e){var o=null;e.nextTo?(o=i[e.nextTo])||(o=[],n.push(o)):(o=[],n.push(o)),i[e.id]=o,o.push(e)}),_(n).each(function(n){var i=$('<div class="row">').appendTo(e.$el);_(n).each(function(n){i.addClass(n.rowClass||""),n.invoke("draw",i,e.baton)})}),this}})});