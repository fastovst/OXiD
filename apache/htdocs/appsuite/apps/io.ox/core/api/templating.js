define("io.ox/core/api/templating",["io.ox/core/http"],function(t){"use strict";return{getNames:function(){return t.GET({module:"templating",params:{action:"names"}})}}});