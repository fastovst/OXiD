define("io.ox/core/tk/draghelper",["io.ox/core/extensions"],function(e){"use strict";e.point("io.ox/core/tk/draghelper").extend({id:"counter",index:100,draw:function(e){this.append($('<span class="drag-counter">').text(e.count))}}).extend({id:"text",index:200,draw:function(e){this.append($("<span>").text(e.source.attr("data-drag-message")||e.dragMessage.call(e.container,e.data,e.source)))}})});