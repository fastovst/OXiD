define("io.ox/chat/events",[],function(){"use strict";var e=_.extend({},Backbone.Events);return $(document).on("click",".ox-chat [data-cmd]",function(t){t.preventDefault();var c=$(t.currentTarget).data();ox.debug&&console.log("cmd",c.cmd,c),e.trigger("cmd cmd:"+c.cmd,c)}),e});