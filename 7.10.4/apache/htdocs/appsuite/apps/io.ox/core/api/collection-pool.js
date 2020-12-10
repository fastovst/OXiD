define("io.ox/core/api/collection-pool",["io.ox/core/api/backbone"],function(e){"use strict";function t(e,t){if(!l&&!a)try{_(r[e]).each(function(e){var n=e.collection.get(t.cid);n&&(n.preserve=t.preserve,l=!0,e.collection.remove(n))})}catch(e){ox.debug&&console.warn("error in collection pool propagateRemove",e)}finally{l=!1}}function n(e,t){if(!l)try{_(r[e]).each(function(e){var n,o=t.changed.cid?t.previous("cid"):t.cid,i=e.collection.get(o);i&&(l=!0,delete(n=t.toJSON()).index,i.set(n))})}catch(e){ox.debug&&console.warn("error in collection pool propagateChange",e)}finally{l=!1}}function o(e){var t={};_(e).each(function(n,o){"detail"!==o&&0!==o.indexOf("search")&&(n.collection.expired?(n.collection.reset(),delete e[o]):n.collection.each(function(e){t[e.cid]=!0,_(this.getDependentModels(e.cid)).each(function(e){t[e.cid]=!0})},this))},this);var n=this.get("detail").filter(function(e){return void 0===e["index/virtual/favorites/infostore"]&&(void 0===e["index/virtual/favoriteFiles/infostore"]&&!t[e.cid])});this.get("detail").remove(n,{silent:!0}),n=t=null,_(e).each(function(e,t){"detail"!==t&&!1!==e.collection.gc&&e.collection.expire()})}function i(i,c){var l=r[i]||(r[i]={});c=c||{},this.Collection=c.Collection||s,this.Model=c.Model||e.Model,this.getCollections=function(){return l},this.get=function(e){var o=l[e];if(o)return o.access=_.now(),o.collection;var c=new this.Collection;return l[e]={access:_.now(),collection:c},c.expired=!1,c.complete=!1,c.sorted=!0,c.expire=function(){this.expired=!0,this.trigger("expire")},c.setComplete=function(e){e!==this.complete&&(this.complete=e,this.trigger("complete",e))},c.cid=e,c.on({remove:t.bind(this,i),change:n.bind(this,i)})},this.getModule=function(){return i},this.gc=function(){o.call(this,l)},ox.on("refresh^",_.throttle(o.bind(this,l),5e3))}var c={},r={},l=!1,a=!1,s=e.Collection.extend({_removeModels:function(t,n){return t=_(t).filter(function(e){return!0!==e.preserve}),e.Collection.prototype._removeModels.call(this,t,n)}});return i.create=function(e,t){return c[e]||(c[e]=new i(e,t))},i.inspect=function(){_(c).each(function(e,t){var n=0,o=e.getCollections();_(o).each(function(e){n+=_(e.collection).size()}),console.debug("Pool:",t,"Model count:",n,"Collections:",o)})},i.preserve=function(e){a=!0,e&&e(),a=!1},_.extend(i.prototype,{getDefault:function(){return new this.Collection},propagate:function(e,t){"change"===e&&n.call(this,this.getModule(),new this.Model(t))},map:_.identity,add:function(e,t){1===arguments.length&&(t=e,e="detail");var n=this.get(e);return t=_([].concat(t)).map(this.map,n),n.add(t,{merge:!0,parse:!0}),n},resolve:function(e){var t=this.get("detail"),n=this.Model;return _([].concat(e)).map(function(e){return e instanceof n?e:t.get(_.cid(e))||{}})},getDetailModel:function(e){var t,n=_.cid(e),o=this.get("detail");return(t=o.get(n))?t:(t=new this.Model(e),void 0!==e.folder_id&&void 0===e.parent&&o.add(t),t)},grep:function(){function e(e,t){return e&&this.indexOf(t)>-1}var t=arguments;return _(this.getCollections()).chain().filter(function(n,o){return _(t).reduce(e.bind(o),!0)}).pluck("collection").value()},getByFolder:function(e){return this.grep("folder="+e+"&")},getBySorting:function(e,t){return this.grep("folder="+t+"&","sort="+e)},getDependentModels:function(){return[]},resetFolder:function(e){var t=this,n=_([].concat(e)).chain().map(function(e){return t.getByFolder(e)}).flatten().uniq();return n.invoke("expire"),n},preserveModel:function(e,t){_(this.getCollections()).each(function(n){var o=n.collection.get(e);o&&(o.preserve=!!t)})}}),i});