define("io.ox/mail/categories/api",["io.ox/core/http","io.ox/mail/api","settings!io.ox/mail"],function(e,t,n){"use strict";function i(e){var n=new RegExp("categoryid="+e.target);_.each(t.pool.getCollections(),function(e,t){n.test(t)&&e.collection&&e.collection.expire&&e.collection.expire()}),t.pool.gc()}function r(e){return _.chain(e).map(function(e){return e.from[0][1]}).uniq().value()}var a=Backbone.Model.extend({defaults:function(){return{unread:0,enabled:!0,permissions:[]}},constructor:function(){Backbone.Model.apply(this,arguments),this.attributes.enabled=this.attributes.active},toJSON:function(){return{id:this.get("id"),name:this.get("name"),active:this.get("enabled")}},getCount:function(){return 0===this.get("unread")?"":this.get("unread")},can:function(e){return this.get("permissions").indexOf(e)>-1},isEnabled:function(){return this.get("enabled")}}),o=Backbone.Collection.extend({model:a,initializeRefresh:function(){t.on("after:refresh.unseen after:refresh.seen after:all-seen refresh.all delete move",_.debounce(this.refresh.bind(this),200)),this.refresh(),this.initializeRefresh=_.noop},refresh:function(){var e=$.Deferred(),t=this;return _.defer(function(){s.getUnread().then(function(n){n=_.map(n,function(e,t){return{id:t,unread:e}}),t.add(n,{merge:!0}),e.resolve()})}),e},update:function(e){return this.set(e),this.save()},save:function(){return n.set("categories/list",this.toJSON()).save(void 0,{force:!0}).done(function(){this.trigger("save"),this.refresh(),i.bind(this,{target:"general"})}.bind(this))}}),s=_.extend({},Backbone.Events,{collection:new o(n.get("categories/list",[])),getUnread:function(){return e.GET({module:"mail/categories",params:{action:"unread"}})},move:function(t){if(!t.data||!t.data.length)return $.when();var n=_.map(t.data,function(e){return _.pick(e,"id","folder_id")});return e.PUT({module:"mail/categories",params:{action:"move",category_id:t.target},data:n}).then(function(){s.trigger("move",t),i(t),s.collection.refresh()})},train:function(t){var n=_.extend({past:!0,future:!0},t);return n.target&&n.data?e.PUT({module:"mail/categories",params:{action:"train",category_id:n.target,"apply-for-existing":n.past,"apply-for-future-ones":n.future},data:{from:r(t.data)}}).then(function(){s.trigger("train",t),i(t),s.collection.refresh()}):$.when()}});return s});