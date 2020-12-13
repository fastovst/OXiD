define("io.ox/settings/personalData/api",["io.ox/core/event","io.ox/core/http"],function(e,t){"use strict";var r={},n={downloadFile:function(e,t){return require(["io.ox/core/download"]).then(function(r){r[_.device("ios")?"window":"url"](ox.apiRoot+"/gdpr/dataexport/"+e+"?"+$.param({id:e,number:t,session:ox.session}))})},getAvailableDownloads:function(){return t.GET({url:"api/gdpr/dataexport"})},cancelDownloadRequest:function(){return t.DELETE({url:"api/gdpr/dataexport"}).then(function(e){return n.trigger("updateStatus"),e},function(e){return"GDPR-EXPORT-0009"===e.code&&n.trigger("updateStatus"),e})},requestDownload:function(e,r){return t.POST({url:"api/gdpr/dataexport",data:JSON.stringify(e),contentType:"application/json",params:{deleteOldDataExport:r}}).then(function(e){return n.trigger("updateStatus"),e})},getAvailableModules:function(){return r.availableModules&&$.Deferred().resolve(r.availableModules),t.GET({url:"api/gdpr/dataexport/availableModules"}).then(function(e){return r.availableModules=e,e})},deleteAllFiles:function(){return t.DELETE({url:"api/gdpr/dataexport/delete"}).then(function(e){return n.trigger("updateStatus"),e})}};return e.extend(n),ox.on("refresh^",function(){n.trigger("updateStatus")}),n});