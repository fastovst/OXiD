define("io.ox/core/api/import",["io.ox/core/http"],function(r){"use strict";function e(e){if("FormData"in window){var o=new FormData;return o.append("file",e.file),r.UPLOAD({module:"import",params:{action:e.type,folder:e.folder,ignoreUIDs:e.ignoreUIDs},data:o,fixPost:!0})}return r.FORM({module:"import",action:e.type,form:e.form,params:{folder:e.folder,ignoreUIDs:e.ignoreUIDs}})}var o={};return o.importFile=function(r){return e(r).then(function(r){var e=r.data||[r];return _.reduce(r.data,function(r,e){return r+(e&&e.error?1:0)},0)===e.length?$.Deferred().reject(e):e})},o});