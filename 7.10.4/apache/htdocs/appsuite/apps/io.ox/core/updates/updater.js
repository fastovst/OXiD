define("io.ox/core/updates/updater",["io.ox/core/extensions","settings!io.ox/core/updates"],function(e,t){"use strict";return{runUpdates:function(){function s(){if(o.length)try{var e=o.shift(),t=i[e.id];if(t&&"success"===t)return void s();((e.run||$.noop)()||$.when()).done(function(){i[e.id]="success"}).fail(function(){i[e.id]="failure"}).always(s)}catch(e){console.error(e,e.stack),n.reject()}else n.resolve()}var n=$.Deferred(),o=e.point("io.ox/core/updates").list(),i=t.get("states");return _.isUndefined(i)?$.when():(s(),n.always(function(){t.set("states",i),t.save()}))}}});