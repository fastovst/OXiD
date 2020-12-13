define("io.ox/mail/compose/util",["io.ox/mail/compose/api","io.ox/mail/compose/resize","settings!io.ox/mail"],function(e,t,o){"use strict";return{getGroup:function(e){return"drive"===e.origin?"file":"mail"},uploadAttachment:function(i){function n(){if(s&&!1!==u)return a=e.space.attachments[l.has("id")?"update":"add"](d,s,r,l.get("id")),s=void 0,l.set("uploaded",0),a.progress(function(e){l.set("uploaded",Math.min(e.loaded/e.total,.999))}).then(function(e){e=_({group:"mail",space:d,uploaded:1}).extend(e),l.set(e),l.trigger("upload:complete",e)},function(e){"abort"!==e.error&&(l.trigger("upload:failed",e),require(["io.ox/core/yell"],function(t){t(e)}),l.destroy())}).always(function(){delete l.done,n()})}var a,d=i.model.get("id"),r=(i.contentDisposition||"attachment").toLowerCase(),l=i.attachment,s=i.origin,u=o.get("features/instantAttachmentUpload",!0)||"inline"===r;return l.on("destroy",function(){s=void 0,a&&"pending"===a.state()&&a.abort()}),l.done=a,s.file&&"attachment"===r&&(l.set({group:"localFile",originalFile:s.file}),t.matches("type",s.file)&&t.matches("size",s.file)&&!1!==u)?(l.set("uploaded",0),l.on("image:resized",function(e){a&&"pending"===a.state()&&l.get("uploaded")<1&&a.abort(),s={file:e},a&&a.always(function(){_.defer(n)})}),l.on("force:upload",n),_.delay(n,5e3)):_.defer(n)}}});