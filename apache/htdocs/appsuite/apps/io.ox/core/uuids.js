define("io.ox/core/uuids",function(){"use strict";function n(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return{randomUUID:function(){return n()+n()+"-"+n()+"-"+n()+"-"+n()+"-"+n()+n()+n()}}});