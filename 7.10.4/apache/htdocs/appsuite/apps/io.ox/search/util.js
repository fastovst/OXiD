define("io.ox/search/util",["io.ox/core/http","io.ox/core/folder/api","io.ox/core/api/account"],function(t,e,i){"use strict";var n=function(t,e){return e=e||$.Deferred(),$.when.apply($,t).then(function(){e.resolve.apply(this,arguments)},function(){var i=_.filter(t,function(t){return"rejected"!==t.state()});n(i,e)}),e};return{addTooltip:function(t,e){return _.device("touch")||t.attr({"data-toggle":"tooltip","data-placement":"bottom","data-animation":"false","data-container":"body","data-original-title":e}).tooltip().on("click",function(){t.tooltip&&t.tooltip("hide")}),t},getOptionLabel:function(t,e){return(_.find(t,function(t){return t.id===e})||{}).name},getFolders:function(o){var r,a,l={},u=[],c={},d=o.getModule(),s={};d="files"===d?"infostore":d,t.pause();var f=o.get("pool").folder;return f&&f.values.custom.custom&&(c[f.values.custom.custom]="current"),"mail"===d&&(_(i.getStandardFolders()).each(function(t){/^default0/.test(t)&&(c[t]="standard")}),u.push(i.all())),(a=e.getDefaultFolder(d))&&(c[a]="default"),r=o.getApp(!0)+"/main",require.defined(r)&&(a=require(r).getApp().folder.get()||void 0)&&(c[a]="current"),_(c).chain().keys().each(function(t){t&&!l[t]&&(l[t]=!0,u.push(e.get(t)))}),t.resume(),n(u).then(function(){var t=Array.prototype.slice.apply(arguments);if(_.isArray(t[0])){var e=t.shift();_.each(e,function(t){i.isPrimary(t.sent_fullname)&&(s[t.id]=t)})}return _.map(t,function(t){return{id:t.id,title:t.title||t.id,type:c[t.id],data:t}})}).then(function(t){var e,n={};return _.each(t,function(t){e=i.parseAccountId(t.id),n[e]=n[e]||{list:[]},n[e].list.push(t),n[e].name=(s[e]||{}).name}),n})},getFirstChoice:function(t){function i(t,e){({all:a.resolve.bind(this,{}),selected:a.resolve.bind(this,{custom:e.id||r,name:e.title||r}),invalid:a.reject})[t]()}var n,o=t.getModule(),r=t.getFolder(),a=$.Deferred(),l=t.isMandatory("folder")||t.isMandatory("account");return o="files"===o?"infostore":o,n=(e.getDefaultFolder(o)||"").toString(),r=r||n,e.get(r).then(function(t){var r=(t=t||{}).id===n,a="mail"===o&&!e.can("read",t);l?a?i("invalid",t):i("selected",t):r||a?i("all",t):i("selected",t)}),a.promise()}}});