define("io.ox/search/apiproxy",["io.ox/core/extensions","gettext!io.ox/core","io.ox/search/api","io.ox/core/notifications"],function(t,e,n,i){"use strict";return{init:function(e){function r(n,i){var r=t.Baton.ensure({app:e,data:i.facets,args:n});return u.invoke("customize",this,r),r.data}function a(){var t=[{}].concat(Array.prototype.slice.call(arguments)),e=$.extend.apply(void 0,[!0].concat(t));return n.autocomplete(e).then(r.bind(this,t))}function o(t){var e=_.findWhere(t.data.facets,{facet:"folder"}),n=$.Deferred();return e&&e.value&&c.isMandatory("account")?(require(["io.ox/core/folder/api"],function(i){i.get(e.value).then(function(e){t.data.facets.push({facet:"account",filter:null,value:e.account_id}),n.resolve()})}),n):n.resolve()}var u=t.point("io.ox/search/api/autocomplete");u.extend({id:"filter",index:100,customize:function(t){t.data=_.filter(t.data,function(t){return"simple"===t.style||["contacts","contact","participant","task_participants"].indexOf(t.id)>-1})}}),u.extend({id:"contact-all-option",index:100,customize:function(t){t.data=_.each(t.data,function(t){["contacts","contact","participant","task_participants"].indexOf(t.id)<0||_.each(t.values,function(t){(t.options||[]).reverse()})})}}),u.extend({id:"folder",index:350,customize:function(t){t.data=t.data.concat(_.copy(t.app.view.model.getOptions().sticky,!0))}});var c=e.getModel();return{search:function(t,e){var n={params:{module:c.getModule()},data:{prefix:t}},r=_.partial(o,n);return c.getFacets().then(function(t){n.data.facets=t}).then(r).then(function(){return a(n,e)}).then(void 0,function(t){if(t&&"SVL-0010"===t.code){var i=c.getApp();return c.defaults.options.mapping[i]=c.defaults.options.defaultApp,a(n,e,{params:{module:c.getModule()}})}throw t}).then(function(e){return c.set({query:t,autocomplete:e},{silent:!0}),{list:e,hits:0}},function(t){throw i.yell(t),t})},query:function(){function t(t,e,n){e.trigger("query:running"),t.data.facets=_.filter(n,function(t){return!("value"in t)||"custom"!==t.value})}function r(t){return!t.data.facets.length||1===t.data.facets.length&&"folder"===t.data.facets[0].facet?$.Deferred().resolve(void 0):n.query(t)}function a(t,e){return e&&(e.request=t),e}function u(t){var n=Date.now();return t&&(c.setItems(t,n),e.view.trigger("query:result",t),e.view.model.trigger("query:result",t)),e.view.trigger("query:stop"),e.view.model.trigger("query:stop"),t}function s(t){throw i.yell(t),e.view.model.trigger("query:fail"),e.view.model.trigger("query:stop"),e.view.trigger("query:stop"),e.view.trigger("query:fail"),t}return function(n,i){var d={params:_.extend({module:c.getModule()},i),data:{start:c.get("start"),size:c.get("size")+c.get("extra")}};return e.view.trigger("query:start"),e.view.model.trigger("query:start"),c.getFacets().done(t.bind(this,d,e.view)).then(o.bind(this,d,e.view)).then(r.bind(this,d)).then(a.bind(this,d)).then(n?u:_.lfo(u),n?s:_.lfo(s))}}()}}}});