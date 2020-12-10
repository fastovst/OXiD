define("plugins/notifications/mail/register",["io.ox/mail/api","io.ox/core/extensions","gettext!plugins/notifications","io.ox/mail/util","io.ox/core/settings/util","io.ox/core/folder/api","io.ox/core/api/account","io.ox/core/capabilities","io.ox/backbone/mini-views","io.ox/core/desktopNotifications","io.ox/contacts/api","settings!io.ox/mail","io.ox/core/tk/sounds-util"],function(e,i,o,t,n,a,r,l,c,s,u,d,f){"use strict";function m(e){return!(!e.get("subscribed")||/^default0\/virtual/.test(e.id))&&(/^default0\D/.test(e.id)&&!r.is("spam|confirmed_spam|trash|unseen",e.id)&&"private"===a.getSection(e.get("type")))}function p(e){var i=e.subject||o("No subject");e.teaser&&(i+="\n\n"+e.teaser);var t=e.email?u.pictureHalo(null,{email:e.email},{urlOnly:!0,width:120,height:120,scaleType:"containforcedimension"}):w;$(new Image).one("load error",function(n){1!==this.width&&"error"!==n.type||(t=w),s.show({title:e.displayname||e.email||o("New mail"),body:i,icon:t,duration:b,onclick:function(){window.focus(),ox.launch("io.ox/mail/main",{folder:e.folder})}})}).attr("src",t)}function g(e){var i=_.compact(_(y.models).map(function(i){if(i.attributes.folder_id===e)return i.attributes.id}));i.length>0&&y.remove(i)}function x(i){var n=_(i).map(function(e){return e.folder_id+"."+e.id}),a=_(y.models).map(function(e){return e.get("folder_id")+"."+e.get("id")}),r=_.difference(n,a);r.length&&!l.has("websocket")&&(r.length>1?s.show({title:o("New mails"),body:o("You have new mail"),icon:w}):e.get(_.extend({},_.cid(r[0]),{unseen:!0})).then(function(e){var i=e.from||[["",""]],n=o("Mail from %1$s, %2$s",t.getDisplayName(i[0]),e.subject||o("No subject"));s.show({title:o("New mail"),body:n,icon:w})}))}var h=-1,b=5e3,w=ox.base+"/apps/themes/default/fallback-image-contact.png",v=_.debounce(function(){var i=ox.ui.apps.get("io.ox/mail")||ox.ui.apps.get("io.ox/mail/placeholder");if(i){var t=_(a.pool.models).chain().filter(m).reduce(function(e,i){return e+(i&&i.get("unread"))||0},0).value();t!==h&&(e.trigger("all-unseen",t),h=t),i.set("hasBadge",t>0),t>0?i.set("tooltip",o("%1$d unread",t)):i.unset("tooltip")}},100);i.point("io.ox/core/notifications/badge").extend({id:"mail",index:100,register:function(){a.on("change:unread",v),a.on("pool:add",v),v()}});var y=new Backbone.Collection;return e.on("new-mail",function(i,o,t){var n=_(t).map(function(e){return e.id}),a=_(y.models).map(function(e){return e.attributes.id}),r=_.difference(a,n);r.length>0&&y.remove(r),x(o),y.add(o),0===y.models.length&&e.newMailTitle(!1)}),e.on("deleted-mails update:set-seen",function(i,o){_.isArray(o)?y.remove(o):g(o),0===y.length&&e.newMailTitle(!1)}),e.checkInbox(),ox.on("socket:mail:new",function(e){v(),d.get("playSound")&&f.playSound(),p(e)}),!0});