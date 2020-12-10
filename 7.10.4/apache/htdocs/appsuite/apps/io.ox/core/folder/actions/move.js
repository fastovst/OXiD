define("io.ox/core/folder/actions/move",["io.ox/core/folder/api","io.ox/core/folder/picker","io.ox/core/notifications","gettext!io.ox/core","io.ox/mail/api"],function(e,o,t,r,i){"use strict";function l(o,t){var r="ok";return _.all(t,function(t){var i=o;if("folder"!==t.folder_id)return!0;if(i===t.id)return r="error:self",!1;for(;i;){if("1"===String(i))return!0;if(i===t.id)return r="error:subfld",!1;i=e.pool.getModel(i).get("folder_id")}}),r}var n={"virtual/myfolders":e.altnamespace?"default0":"default0"+i.separator+"INBOX"};return{item:function(i){function n(){t.yell("success",p?i.success.multiple:i.success.single),i.api.refresh&&i.api.refresh()}function s(o){if(f&&i.vgrid&&i.vgrid.busy(),/^virtual/.test(o)||!u&&!e.pool.getModel(o).can("create"))return t.yell("error",r("You cannot move items to this folder"));if("move"===a&&"infostore"===i.module)switch(l(o,c)){case"ok":break;case"error:self":return t.yell("error",r("A folder cannot be moved into itself"));case"error:subfld":return t.yell("error",r("A folder cannot be moved to one of its subfolders"))}i.api[a](c,o,i.all).then(function(r){!i.fullResponse&&_.isArray(r)&&(r=_(r).compact()[0]),i.successCallback?i.successCallback(r,{input:c,target:o,options:i.all}):_.isObject(r)&&r.error?t.yell(r):("copy"===a&&n(),e.reload(c,o),f&&i.vgrid&&i.vgrid.idle())},function(e){"UI_CONSREJECT"===e.code?t.yell("warning",r("Please wait for the previous operation to finish")):t.yell("error",e.error||e)})}var a=i.type||"move",d=i.settings,c=i.source||i.list,f=/^move/.test(a),u=!1,p="moveAll"===a||i.list.length>1,m=String(i.source||i.list[0].folder_id);"moveAll"!==a&&(u=!0,_(i.list).each(function(e){u&&(u="folder"===e.folder_id)})),i.target?m!==i.target&&s(i.target):o({async:!0,button:i.button,filter:i.filter,flat:!!i.flat,indent:void 0===i.indent||i.indent,module:i.module,persistent:"folderpopup",root:i.root,open:i.open,settings:d,title:i.title,type:i.type,initialize:i.pickerInit||$.noop,close:i.pickerClose||$.noop,done:function(e,o){"copy"!==a&&e===m||s(e),o&&o.close()},disable:i.disable||function(o,t){var r=f&&o.id===m,i=u?e.can("create:folder",o):e.can("create",o);return r||!i||t&&/^virtual/.test(t.folder)}})},all:function(e){this.item(_.extend({api:i,module:"mail",type:"moveAll",title:r("Move all messages")},e))},folder:function(i,l){var s=e.pool.getModel(i),a=s.get("module"),d=e.isFlat(a);o({async:!0,addClass:"zero-padding",done:function(o,r,l){r.busy(!0),n[o]&&(o=n[o]),e.move(i,o,{enqueue:!0}).done(r.close).fail([r.idle,function(){l.preselect(o)},t.yell])},customize:function(o){var t=o.data,r=t.id===i,l=e.can("move:folder",s.toJSON(),t);"mail"===a&&"system"===t.module||!r&&l||this.addClass("disabled")},disable:function(e){return(i===e.id||/^virtual\//.test(e.id))&&!n[e.id]},flat:d,indent:!d,module:a,root:"infostore"===a?"9":"1",title:r("Move folder")+": "+s.get("title"),context:"popup",persistent:"folderpopup",settings:l})}}});