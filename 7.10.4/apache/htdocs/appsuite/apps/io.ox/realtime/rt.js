define.async("io.ox/realtime/rt",["io.ox/core/extensions","io.ox/core/capabilities"],function(e,o){"use strict";var n=e.point("io.ox/realtime/transport"),i=null;return n.extend({id:"polling",index:100,enabled:!0,getModule:function(){return require(["io.ox/realtime/polling_transport"])}}),n.extend({id:"noop",index:0,enabled:!o.has("rt"),getModule:function(){return console.error("Backend does not support realtime communication."),require(["io.ox/realtime/noop_transport"])}}),e.point("io.ox/realtime/transport").each(function(e){!i&&n.isEnabled(e.id)&&(i=e.getModule())}),i});