define("io.ox/search/items/view",["io.ox/core/extensions"],function(e){"use strict";return Backbone.View.extend({render:function(i){require(["io.ox/search/items/view-template"],function(){e.point("io.ox/search/view/items").invoke("draw",i.$,i)})}})});