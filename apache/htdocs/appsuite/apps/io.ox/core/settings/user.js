define("io.ox/core/settings/user",["io.ox/core/api/user","io.ox/contacts/model"],function(e,o){"use strict";function t(){return n.realm("default").get({})}var n=o.protectedMethods.buildFactory("io.ox/core/user/model",e);return{getCurrentUser:t,openModalDialog:function(){t().done(function(e){ox.load(["io.ox/contacts/edit/main"]).done(function(o){o.reuse("edit",e.attributes)||o.getApp(e.attributes).launch()})})}}});