define("io.ox/rss/api",["io.ox/core/http"],function(e){"use strict";return{get:function(r){return e.GET({module:"rss",params:{feedUrl:r}})},getMany:function(r,t){t=t||{};var n={sort:"date",order:"desc",limit:100};return e.PUT({module:"rss",params:$.extend({},n,t),data:{feedUrl:r}})}}});