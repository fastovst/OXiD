define("io.ox/core/api/collection-loader",["io.ox/core/api/collection-pool","io.ox/core/http"],function(t,e){"use strict";function i(t){var e={};return _(t).each(function(t){e[t]=!0}),e}function n(e){function n(e,i,n,o,r){var l="load"===i?o.PRIMARY_PAGE_SIZE:o.SECONDARY_PAGE_SIZE;if("paginate"===i&&e.length>0){var s=_(r).first(),h=e.last().toJSON();if(h&&h.head&&(h=h.head),s&&s.head&&(s=s.head),_.cid(s)!==_.cid(h))return ox.debug&&console.warn("paginate compare fail",_.cid(s),_.cid(h),r),n.thread="threadedAll"===n.action,void o.reload(n,l)}t.preserve(function(){var t=a[i];e.preserve&&"reload"===i?e[t](r,{parse:!0,add:!0,remove:!1,sort:!1}):e[t](r,{parse:!0})}),"load"===i?e.setComplete(r.length<l):"paginate"===i&&e.setComplete(r.length<=1),e.trigger(i)}function o(t,e,i){t.trigger(e+":fail",i)}function r(t,e){var i="paginate"===e?Math.max(this.collection.length-1,0):0;this.collection.trigger("before:"+e);var r=_.lfo(n,this.collection,e,t,this),a=_.lfo(o,this.collection,e),l=this;return this.fetch(t).done(function(e){l.addIndex(i,t,e),l.done(),r(e)}).fail(function(t){l.done(),a(t),l.fail(t)})}_.extend(this,{columns:"1,20",module:"mail",ignore:"limit max"},e),this.pool=t.create(this.module),this.ignore=i(String(this.ignore).split(" ")),this.collection=null,this.loading=!1,this.load=function(t){var e;if(!1!==(t=this.getQueryParams(t||{}))){if(t.limit="0,"+this.PRIMARY_PAGE_SIZE,e=this.collection=this.getCollection(t),this.loading=!1,this.isBad(t.folder)||(e.length>0||e.complete)&&!e.expired&&e.sorted&&!e.preserve){var i=e.CUSTOM_PAGE_SIZE||this.PRIMARY_PAGE_SIZE;return e.length>i&&(e.reset(e.first(i),{silent:!0}),e.complete=!1),_.defer(function(){e.trigger(e.complete?"reset load cache complete":"reset load cache")}),e}return this.loading=!0,_.defer(r.bind(this),t,"load"),e}},this.paginate=function(t){var e=this.collection;if(this.loading)return e;var i=Math.max(0,e.length-1);return t=this.getQueryParams(_.extend({offset:i},t)),this.isBad(t.folder)?e:(t.limit=i+","+(e.length+this.SECONDARY_PAGE_SIZE),this.loading=!0,_.defer(r.bind(this),t,"paginate"),e)},this.reload=function(t,e){var i=this.collection;if(this.loading)return i;if(t=this.getQueryParams(_.extend({offset:0},t)),this.isBad(t.folder))return i;var n=Math.ceil((i.length-this.PRIMARY_PAGE_SIZE)/this.SECONDARY_PAGE_SIZE)*this.SECONDARY_PAGE_SIZE+this.PRIMARY_PAGE_SIZE,o=Math.max(i.length+(e||0),n);return t.limit="0,"+(0===o?this.PRIMARY_PAGE_SIZE:o),this.loading=!0,_.defer(r.bind(this),t,"reload"),i}}function o(t){return!this.ignore[t]}function r(t){var e=this[t];return t+"="+(_.isString(e)?e:JSON.stringify(e))}var a={load:"reset",paginate:"add",reload:"set"};return _.extend(n.prototype,{PRIMARY_PAGE_SIZE:50,SECONDARY_PAGE_SIZE:200,cid:function(t){return _(t||{}).chain().keys().filter(o,this).map(r,t).value().sort().join("&")||"default"},getDefaultCollection:function(){return this.pool.getDefault()},getCollection:function(t){var e=this.cid(t);return this.pool.get(e)},before:function(){},each:function(){},after:function(){},addIndex:function(t,e,i){this.before(t,e,i),_(i).each(function(i,n){i.index=t+n,this.each(i,n,t,e)},this),this.after(t,e,i)},noSelect:function(){return!1},virtual:function(){return!1},isBad:function(t){return!t&&0!==t},fetch:function(t){var i=this.module,n=i+"/"+_.cacheKey(_.extend({session:ox.session},t)),o=ox.rampup[n],r=this.noSelect(t),a=this.virtual(t),l=this;return o?(delete ox.rampup[n],$.when(o)):r?$.when([]):a?$.when(a):e.wait().then(function(){return l.httpGet(i,t).then(function(e){return l.filter&&(e=_(e).filter(l.filter)),l.useSlice?Array.prototype.slice.apply(e,t.limit.split(",")):e})})},httpGet:function(t,i){return this.useSlice&&(i=_(i).omit("limit")),e.GET({module:t,params:i})},getQueryParams:function(){return{}},done:function(){this.loading=!1},fail:function(){}}),n});