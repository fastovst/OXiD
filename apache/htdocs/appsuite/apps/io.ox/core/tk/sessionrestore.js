define("io.ox/core/tk/sessionrestore",function(){function n(){var n=null;if(window.name)try{n=JSON.parse(window.name)}catch(e){n={}}else n={};return n}function e(){return _.omit(n(),t)}function i(e){var i=n();_.isEmpty(e)?window.name=JSON.stringify(_.pick(i,t)):window.name=JSON.stringify(_.extend(_.pick(i,t),e))}function o(){window.name=JSON.stringify(_.pick(n(),t))}var t=["windowName","windowType","parentName","loggingOut"],r={state:function(n,o){var t=e(),r=t[n];return _.isUndefined(o)||(_.isNull(o)?delete t[n]:t[n]=o,i(t)),_.isUndefined(r)&&(r=null),r}};return require(["io.ox/core/extensions","io.ox/core/extPatterns/stage"]).done(function(n,e){new e("io.ox/core/stages",{id:"documents-session-restore",index:2e3,run:function(){n.point("io.ox/core/logout").extend({id:"sessionrestore",logout:o})}})}),r});