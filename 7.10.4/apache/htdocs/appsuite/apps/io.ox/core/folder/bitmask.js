define("io.ox/core/folder/bitmask",[],function(){"use strict";var r={folder:0,read:7,write:14,modify:14,delete:21,admin:28},e=function(e){if(_.isString(e)){if(e in r)return r[e];console.error("Typo!?",e)}return e||0};return function(r){r=r||0;var n={get:function(n){return 0===arguments.length?r:r>>e(n)&127},set:function(n,t){return n=e(n),t=t||0,r&=536870911^127<<n,r|=t<<n,this}};return n}});