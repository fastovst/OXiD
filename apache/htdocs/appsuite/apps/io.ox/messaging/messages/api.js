define("io.ox/messaging/messages/api",["io.ox/core/http"],function(e){"use strict";return{all:function(o){return e.GET({module:"messaging/message",params:{action:"all",columns:"folder,from,id,subject,from,receivedDate,body,headers,picture,url",folder:o}})}}});