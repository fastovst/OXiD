define("io.ox/multifactor/settings/views/printBackupString",["io.ox/core/print","gettext!io.ox/core/boot"],function(e,o){"use strict";function t(e){return{code:e.id.trim()}}return{open:function(i,n){e.smart({get:function(e){return $.when(e)},i18n:{code:o("Recovery Code")},title:o("Recovery Code"),process:t,selection:i,window:n,selector:".recovery"})}}});