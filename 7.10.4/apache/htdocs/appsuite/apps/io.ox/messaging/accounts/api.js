define("io.ox/messaging/accounts/api",["io.ox/core/http"],function(n){"use strict";return{all:function(e){return n.GET({module:"messaging/account",params:{action:"all",messagingService:e}})},get:$.noop}});