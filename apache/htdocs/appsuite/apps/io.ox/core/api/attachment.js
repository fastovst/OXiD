define("io.ox/core/api/attachment",["io.ox/core/http","io.ox/core/event","io.ox/core/util","settings!io.ox/core","gettext!io.ox/core"],function(e,t,o,a,d){"use strict";var r={getAll:function(t){return e.GET({module:"attachment",params:{action:"all",module:t.module,attached:t.id,folder:t.folder||t.folder_id,columns:"1,800,801,802,803,804,805"}}).then(function(e){for(var o=0;o<e.length;o++)e[o].folder=t.folder||t.folder_id;return _(e).reject(function(e){return e.rtf_flag})})},remove:function(t,o){var a=this;return e.PUT({module:"attachment",params:{action:"detach",module:t.module,attached:t.id,folder:t.folder||t.folder_id},data:o}).done(function(){a.trigger("detach",{module:t.module,id:t.id,folder:t.folder||t.folder_id})})},create:function(t,o){var a=this,d={action:"attach",force_json_response:!0},n={module:t.module,attached:t.id,folder:t.folder||t.folder_id},i=new FormData,l=_.ecid(t);o=o||[],o=_.isArray(o)?o:[o];for(var c=0;c<o.length;c++)i.append("json_"+c,JSON.stringify(n)),i.append("file_"+c,o[c]);return e.UPLOAD({module:"attachment",params:d,data:i,fixPost:!0}).progress(function(e){r.trigger("progress:"+l,e)}).done(function(){a.trigger("attach",{module:t.module,id:t.id,folder:t.folder||t.folder_id})})},createOldWay:function(e,t){var o={module:e.module,attached:e.id,folder:e.folder||e.folder_id},a=0,d=this,r=$.Deferred();$(":input.add-attachment",t).each(function(e,d){var r=$(d);"file"===r.attr("type")&&(r.attr("name","file_"+a),$(t).append($("<input>",{type:"hidden",name:"json_"+a,value:JSON.stringify(o)})),a++)});var n="iframe_"+_.now(),i=$("<iframe>",{name:n,id:n,height:1,width:1});return $("#tmp").append(i),window.callback_attach=function(t){$("#"+n).remove(),d.trigger("attach",{module:e.module,id:e.id,folder:e.folder||e.folder_id}),r[t&&t.error?"reject":"resolve"](t),window.callback_attach=null,$("#tmp").trigger("attachmentsSaved")},$(t).attr({method:"post",enctype:"multipart/form-data",action:ox.apiRoot+"/attachment?action=attach&session="+ox.session,target:n}),$(t).submit(),r},getUrl:function(e,t,a){var d="/attachment",r=(a=a||{}).width&&a.height?"&scaleType="+a.scaleType+"&width="+a.width+"&height="+a.height:"";switch(d+=(e.filename?"/"+encodeURIComponent(e.filename):"")+"?"+$.param({session:ox.session,action:"document",folder:e.folder,id:e.id||e.managedId,module:e.module,attached:e.attached,source:"task"}),t){case"view":case"open":return o.getShardingRoot(d+"&delivery=view"+r);case"download":return ox.apiRoot+d+"&delivery=download";default:return o.getShardingRoot(d)}},save:function(t,o){var r={1:d("Saved appointment attachment"),4:d("Saved task attachment"),7:d("Saved contact attachment")};return o=(o||a.get("folder/infostore")).toString(),e.PUT({module:"files",params:{action:"saveAs",folder:t.folder,module:t.module,attached:t.attached,attachment:t.id||t.managedId},data:{folder_id:o,description:r[t.module]||d("Saved attachment")},appendColumns:!1}).done(function(){require(["io.ox/files/api"],function(e){e.pool.resetFolder(o),e.trigger("add:file")})})}};return t.extend(r),r});