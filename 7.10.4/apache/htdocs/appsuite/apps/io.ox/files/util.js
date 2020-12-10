define("io.ox/files/util",["io.ox/files/api","io.ox/backbone/views/modal","gettext!io.ox/files","io.ox/core/capabilities","io.ox/core/folder/api","io.ox/core/notifications","io.ox/files/upload/main","settings!io.ox/files"],function(e,t,n,o,i,r,l,a){"use strict";function s(e){return _.isUndefined(e)||!1!==e?$.Deferred().resolve():$.Deferred().reject()}var d={},c=$.Deferred().resolve(),f=$.Deferred().reject();return{conditionChain:function(){var e=_.isArray(arguments[0])?arguments[0]:arguments||[],t=$.when(),n=$.Deferred();return _.each(e,function(e){var n=!!e.then,o=e?c:f;t=t.then(function(){return n?e.then(s):o})}),t.always(function(){return n.resolveWith(void 0,["resolved"===t.state()])}),n.promise()},isFolderType:function(){function e(e){var t=e.app,n=e.data||{};return t?t.folder.getData():n.folder_id?i.get(n.folder_id):$.Deferred().resolveWith(n)}return function(t,n){return e(n).then(function(e){var n,o;return"!"===t[0]&&(t=t.substr(1),n=!0),o=i.is(t,e),(n?!o:o)?c:f})}}(),hasStatus:function(e,t){var n,o,i,r=this,l=_.isArray(t)?t:_.getArray(t.context),a={locked:function(e){return e.locked_until>_.now()},lockedByOthers:function(e){return e.locked_until>_.now()&&e.modified_by!==ox.user_id},lockedByMe:function(e){return e.locked_until>_.now()&&e.modified_by===ox.user_id},createdByMe:function(e){return e.created_by===ox.user_id}};return"!"===e[0]&&(e=e.substr(1),n=!0),i=a[e],_(l).reduce(function(e,t){return o=i.call(r,t),e||(n?!o:o)},!1)},checkMedia:function(t,n){if(!n.collection.has("some")&&!a.get(t+"Enabled"))return!1;var o,i,r=_.copy(n.baton.allIds,!0),l={},s=[],d=$.Deferred();return _.isUndefined(n.baton.allIds)&&(n.baton.allIds=n.baton.data,r=[n.baton.allIds]),!!_.isArray(r)&&(_(r).each(function(e){_.isUndefined(e.filename)&&(l[e.folder_id]=(l[e.folder_id]||[]).concat(e),s.push(e),-1!==(o=r.indexOf(e))&&r.splice(o,1))}),1===(i=Object.keys(l)).length?d=e.getAll(i[0]):i.length>1?d=e.getList(s).then(function(e){return r.concat(e)}):d.resolve(r),d.then(function(e){return require(["io.ox/files/mediasupport"]).then(function(o){return n.baton.allIds=e,_(e).reduce(function(e,n){return e||!(!n||!o.checkFile(t,n.filename))},!1)})}))},confirmDialog:function(e,o,i){var r=i||{};o=String(o||""),e=String(e||"");var l,a=$.Deferred(),s=o.indexOf(".")>=0?_.last(o.split(".")):"",d=_.last(e.split(".")),c=$('<p style="padding-top: 16px;">').append($("<em>").text(n("Please note, changing or removing the file extension will cause problems when viewing or editing.")));return""!==e&&1===e.split(".").length&&""!==s?l=n('Do you really want to remove the extension ".%1$s" from your filename?',s):s!==d&&""!==s&&(l=n('Do you really want to change the file extension from  ".%1$s" to ".%2$s" ?',s,d)),l?new t(_.extend(r,{title:n("Confirmation"),description:[l,c]})).addButton({label:n("Adjust"),action:"change",className:"btn-default"}).addButton({label:n("Yes"),action:"rename"}).on("action",function(e){"rename"===e?a.resolve():a.reject()}).open():""===e?a.reject():a.resolve(),a.promise()},previewMode:function(e){function t(t,n){var o=(n||"")+"."+t;return d[o]?d[o].test(n?e.file_mimetype:e.filename):n?(d[o]=new RegExp("^"+n+"\\/.*"+t+".*$","i")).test(e.file_mimetype):(d[o]=new RegExp("^.*\\."+t+"$","i")).test(e.filename)}var n="(gif|png|jpe?g|bmp|tiff|heic?f?)",i="(mpeg|m4a|m4b|mp3|ogg|oga|opus|x-m4a)";return t(n,"image")||t(n)?"thumbnail":t(i,"audio")||t(i)?"cover":!(!o.has("document_preview")||!(t("(ms-word|ms-excel|ms-powerpoint|msword|msexcel|mspowerpoint|openxmlformats|opendocument|pdf|rtf)","application")||t("(rtf|plain)","text")||t("(csv|xls|xla|xlb|xlt|ppt|pps|doc|dot|xlsx|xlsm|xltx|xltm|xlam|pptx|pptm|ppsx|ppsm|ppa|ppam|pot|potx|potm|docx|docm|dotx|dotm|odc|odb|odf|odg|otg|odi|odp|otp|ods|ots|odt|odm|ott|oth|pdf|rtf)")||t("(mp4|m4v|ogv|ogm|webm)")))&&"preview"},isFileVersionUploading:function(e,t){return l.collection.find(function(n){return!(!n||n.id!==e)&&(t&&r.yell({type:"info",message:t}),!0)})}}});