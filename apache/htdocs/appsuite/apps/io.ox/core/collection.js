define("io.ox/core/collection",["io.ox/core/folder/api","io.ox/core/folder/util","io.ox/core/api/user"],function(e,t,n){"use strict";function r(e){var t=_.compact([].concat(e)),n={},r=!1;this.getProperties=function(){return a(t).always(function(e){_.extend(n,e),r=!0})},this.getPromise=function(){return this.getProperties().pipe(_.identity.bind(null,this))},this.isResolved=function(){return r},this.isLarge=function(){return t.length>=100},this.toJSON=function(){return n},this.has=function(){return this.isResolved()||console.error("Using Collection.has before properties are resolved!",e,arguments),_(arguments).inject(function(e,t){return e&&!0===n[t]},!0)},this.matches=o(n)}function o(e){return _.memoize(function(t){var n=String(t||"").replace(/[a-z:]+/gi,function(t){return!!e[t.toLowerCase()]});try{return new Function("return !!("+n+")")()}catch(e){return console.error("Collection.matches",n,e),!1}})}var i=function(t,n,r){if(!t)return!1;var o=e.bits(t,r);return 0!==o&&(1!==o||n===ox.user_id)},c=function(e){return"standard_folder"in e||"folder"===e.folder_id},d=function(e){if(_.isObject(e))return c(e)?e.id:e.folder_id||e.folder},a=function(r){function o(e,t){return!1===e.group&&e.entity===ox.user_id||!0===e.group&&_(t.groups).contains(e.entity)}var a=r.length||0,l={read:!0,modify:!0,delete:!0,create:!0,"create:folder":!0,"rename:folder":!0,"delete:folder":!0,"change:seen":!0,none:0===a,some:a>0,one:1===a,multiple:a>1,items:!1,folders:!1,mixed:!1,guard:!1},s=_.chain(r).map(d).compact().uniq().value();return l.toplevel=_(r).reduce(function(e,t){return e&&"folder_id"in t&&!("filename"in t)},!0),0===s.length?(l.unknown=!0,"read modify delete create:folder rename:folder delete:folder change:seen".split(" ").forEach(function(e){l[e]=!1}),$.when(l)):$.when(e.multiple(s),n.me()).pipe(function(n,s){for(var u,f=0,h=null,m=null,p=_.toHash(n,"id"),g=!1,y=!1;f<a;f++)if(h=r[f],u=h&&h.object_permissions&&_(h.object_permissions).find(function(e){return o(e,s)}),m=p[d(h)],h.meta&&h.meta.Encrypted&&(l.guard=!0),c(h))void 0===h.own_rights&&(h=p[h.id]),g=!0,l["create:folder"]=l["create:folder"]&&e.can("create:folder",h),l["rename:folder"]=l["rename:folder"]&&e.can("rename:folder",h),l["delete:folder"]=l["delete:folder"]&&e.can("delete:folder",h),l["change:seen"]=l["change:seen"]&&e.can("change:seen",h),l.delete=l.delete&&e.can("delete:folder",h);else{if(!u&&!m){l.unknown=!0,l.read=l.modify=l.delete=l.create=l["change:seen"]=!1;break}y=!0;var v=h.createdBy&&h.createdBy.entity?h.createdBy.entity:h.created_by;l.read=l.read&&(u&&u.bits>=1||i(m,v,7)),l.modify=l.modify&&(u&&u.bits>=2||i(m,v,14)),l.delete=l.delete&&(u&&u.bits>=4||i(m,v,21)),m&&(l.create=l.create&&(127&m.own_rights)>=2),t.is("subscribed",m)&&(l.modify=l.delete=l.create=!1)}return g||"create:folder rename:folder".split(" ").forEach(function(e){l[e]=!1}),y||"create read modify".split(" ").forEach(function(e){l[e]=!1}),l.items=y&&!g,l.folders=g&&!y,l.mixed=g&&y,l})};return r.Simple=function(e){var t=e.length,n={none:0===t,some:t>0,one:1===t,multiple:t>1};this.matches=o(n),this.getPromise=function(){return $.when(this)},this.has=function(){return _(arguments).inject(function(e,t){return e&&!0===n[t]},!0)}},r});