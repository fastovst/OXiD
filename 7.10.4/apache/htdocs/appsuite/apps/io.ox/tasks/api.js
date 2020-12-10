define("io.ox/tasks/api",["io.ox/core/http","io.ox/core/api/factory","io.ox/core/folder/api"],function(e,t,r){"use strict";var i,n,o,a={},d=function(e,t,r){if(t.folder_id&&t.folder_id!==e.folder_id)i.getTasks(),require(["io.ox/core/api/reminder"],function(e){e.getReminders()});else{if(t.participants){var n=ox.user_id,o=!1;if(_(t.participants).each(function(t){t.id===n&&(o=!0,i.trigger("mark:task:to-be-confirmed",[e]))}),!o)return i.trigger("mark:task:confirmed",[e]),require(["io.ox/core/api/reminder"],function(e){e.getReminders()}),void i.getTasks()}(void 0!==t.alarm||r&&t.alarm)&&require(["io.ox/core/api/reminder"],function(e){e.getReminders()}),(t.status||void 0!==t.end_time)&&(3!==e.status&&e.end_time<_.now()?i.trigger("mark:overdue",[e]):i.trigger("unmark:overdue",[e]))}},l=function(e,t,r){var n=_.copy(e,!0);if(n=n||[],0===(n=_.isArray(n)?n:[n]).length)return $.when();if(t=t.toString(),_(n).each(function(e){e.id=e.id.toString(),e.folder_id=e.folder_id.toString()}),n[0].folder_id&&n[0].folder_id!==t)return i.caches.all.clear();var o=!1,a=i.cid({folder:t,sort:i.options.requests.all.sort,order:i.options.requests.all.order});return i.caches.all.get(a).then(function(e){return e?(_(e).each(function(e){_(n).each(function(i){e.id.toString()===i.id&&e.folder_id.toString()===t&&(_.extend(e,r),o=!0)})}),o?i.caches.all.add(a,e):$.when()):$.when()})},s=function(){return i.search({pattern:"",end:_.now()})},u=function(){n&&o?o.refreshWidget(n,0):require(["io.ox/portal/main"],function(e){o=e.getApp(),(n=o.getWidgetCollection()._byId.tasks_0)&&o.refreshWidget(n,0)})},c=function(e){var t=[];return e&&e.length>0?(_(e).each(function(e){var r={};switch(r.type=e.type,e.type){case 1:r.type=e.type,r.mail=e.email1,r.display_name=e.display_name,r.id=e.id;break;case 5:r.type=e.type,r.mail=e.mail,r.display_name=e.display_name,r.id=0;break;default:r=e}t.push(r)}),t):e};return i=t({module:"tasks",keyGenerator:function(e){var t=null;return e&&(t=e.folder?e.folder:e.folder_id?e.folder_id:r.getDefaultFolder("tasks")),e?t+"."+e.id:""},requests:{all:{folder:r.getDefaultFolder("tasks"),columns:"1,5,20,101,200,203,220,300,301,317,401",extendColumns:"io.ox/tasks/api/all",sort:"317",order:"asc",cache:!0,timezone:"UTC"},list:{action:"list",columns:"1,2,5,20,101,200,203,220,221,300,301,309,316,317,401",extendColumns:"io.ox/tasks/api/list",timezone:"UTC"},get:{action:"get",timezone:"UTC"},search:{action:"search",columns:"1,2,5,20,101,200,203,220,221,300,301,309,317,401",extendColumns:"io.ox/tasks/api/all",sort:"317",order:"asc",timezone:"UTC",getData:function(e){return{pattern:e.pattern,end:e.end,start:e.start}}}}}),i.removeFromCache=function(e){return $.when(i.caches.get.remove(e),i.caches.list.remove(e))},i.create=function(t){t.participants=c(t.participants);var r,n=t.tempAttachmentIndicator;return delete t.tempAttachmentIndicator,null===t.alarm&&delete t.alarm,"null"!==t.priority&&t.priority||delete t.priority,t.status&&(t.status=parseInt(t.status,10)),3===t.status?t.date_completed=t.date_completed||_.now():delete t.date_completed,e.PUT({module:"tasks",params:{action:"new",timezone:"UTC"},data:t,appendColumns:!1}).then(function(e){return t.id=e.id,r=e,i.get({folder:t.folder_id,id:t.id})}).then(function(e){return t=e,$.when(i.caches.all.grepRemove(t.folder_id+i.DELIM),i.caches.list.merge(t))}).then(function(){return n&&i.addToUploadList(_.ecid(t)),d(t,t,!0),i.trigger("create",t),i.trigger("refresh.all"),r})},i.update=function(t,r){var n,o=t.tempAttachmentIndicator,a=t.folder_id,s=!1;delete t.tempAttachmentIndicator,delete t.timezone,t.folder&&(a=t.folder_id=t.folder,delete t.folder),_(t).has("days")&&void 0===t.days&&(t.days=null),_(t).has("day_in_month ")&&void 0===t.day_in_month&&(t.day_in_month=null),_(t).has("month")&&void 0===t.month&&(t.month=null),r&&2===arguments.length&&(t={folder_id:r,id:t.id},s=!0),t.notification=!0,void 0===a&&(a=i.getDefaultFolder()),void 0!==t.status&&(t.status=parseInt(t.status,10),t.date_completed=3===t.status?t.date_completed||_.now():null),0===t.priority&&(t.priority=null);var c=a+"."+t.id;return e.PUT({module:"tasks",params:{action:"update",folder:a,id:t.id,timestamp:t.last_modified||_.then(),timezone:"UTC"},data:_(t).omit("last_modified"),appendColumns:!1}).then(function(){var e=!1,n=$.Deferred();return(t.title||t.end_time||t.status)&&(e=!0),i.removeFromCache(c).then(function(){i.get({id:t.id,folder_id:r||a}).done(n.resolve).fail(function(e){e&&"TSK-0046"===e.code&&n.resolve(),n.reject(arguments)})}),$.when(n,e?i.caches.all.clear():l([t],a,t))}).then(function(e){return n={folder_id:a,id:t.id},e?d(e,t,!0):(require(["io.ox/core/api/reminder"],function(e){e.getReminders()}),i.getTasks()),o&&i.addToUploadList(_.ecid(t)),n}).done(function(){i.trigger("refresh.all"),s?(i.trigger("move",{id:t.id,folder_id:a,newFolder:t.folder_id}),i.trigger("move:"+_.ecid({id:t.id,folder_id:a}),t.folder_id)):(i.trigger("update",{id:t.id,folder_id:a}),i.trigger("update:"+_.ecid({id:t.id,folder_id:a}))),u()})},i.updateMultiple=function(t,r){var n=[];return r.notification=!0,e.pause(),_(t).map(function(t){return t.folder&&(t.folder_id=t.folder,delete t.folder),n.push(t.folder_id+"."+t.id),e.PUT({module:"tasks",params:{action:"update",id:t.id,folder:t.folder_id,timestamp:_.then(),timezone:"UTC"},data:r,appendColumns:!1})}),e.resume().then(function(){return $.when(i.removeFromCache(n),l(t,r.folder_id||t[0].folder_id,r))}).done(function(){i.getTasks(),require(["io.ox/core/api/reminder"],function(e){e.getReminders()}),i.trigger("refresh.all"),u()})},i.move=function(e,t){return i.updateCaches(e).then(function(){return i.trigger("refresh.all"),e.length?1===e.length?i.update(e[0],t):i.updateMultiple(e,{folder_id:t}):i.update(e,t)})},i.confirm=function(t){var r=(t.folder_id||t.folder)+"."+t.id;return e.PUT({module:"tasks",params:{action:"confirm",folder:t.folder_id||t.folder,id:t.id,timezone:"UTC"},data:t.data,appendColumns:!1}).then(function(){return i.trigger("mark:task:confirmed",[{id:t.id,data:t.data}]),i.removeFromCache(r)})},i.getDefaultFolder=function(){return r.getDefaultFolder("tasks")},i.getAllMyTasks=function(){function e(e){return _(e).any(function(e){var t=1===e.type&&e.id===ox.user_id,r=2===e.confirmation;return t&&!r})}function t(t){return t.created_by===ox.user_id&&(!t.participants||0===t.participants.length)||e(t.participants)}return function(){return s().then(function(e){return _(e).filter(t)})}}(),i.getTasks=function(){return i.getDefaultFolder()?e.GET({module:"tasks",params:{action:"all",folder:i.getDefaultFolder(),columns:"1,20,200,203,221,300,309,317",sort:"317",order:"asc",timezone:"UTC"}}).then(function(e){for(var t=new Date,r=ox.user_id,n=[],o=[],a=0;a<e.length;a++){e[a].end_time<t.getTime()&&3!==e[a].status&&null!==e[a].end_time&&n.push(e[a]);for(var d=0;d<e[a].users.length;d++)e[a].users[d].id===r&&0===e[a].users[d].confirmation&&o.push(e[a])}return i.trigger("new-tasks",n),i.trigger("set:tasks:to-be-confirmed",o),e}):$.Deferred().resolve([])},i.addToUploadList=function(e){a[e]=!0},i.removeFromUploadList=function(e){delete a[e],i.trigger("update:"+e)},i.uploadInProgress=function(e){return a[e]||!1},i.refresh=function(){ox.online&&$.when(i.caches.all.clear(),i.caches.list.clear(),i.caches.get.clear(),i.getTasks()).done(function(){i.trigger("refresh.all")})},i.on("create update",function(e,t){i.get(t).then(function(e){e&&_.isArray(e.participants)&&e.participants.length>0&&_(e.participants).some(function(e){return 5===e.type})&&require(["io.ox/contacts/api"],function(e){e.trigger("maybeNewContact")})})}),i});