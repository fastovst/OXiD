define("io.ox/core/folder/actions/remove",["io.ox/core/folder/api","io.ox/backbone/views/modal","io.ox/core/notifications","gettext!io.ox/core"],function(e,o,t,i){"use strict";function l(o,l){e.remove(o,l).fail(function(e){e&&"IMAP-2015"===e.code?t.yell("error",i("Could not delete folder. This can be due to insufficient permissions in your trash folder or this might be a special folder that cannot be deleted.")):t.yell(e)})}return function(t,n){var a=e.pool.getModel(t),r="calendar"===a.get("module")?i('Do you really want to delete calendar "%s"?',a.get("title")):i('Do you really want to delete folder "%s"?',a.get("title")),d=i("calendar"===a.get("module")?"This calendar is shared with others. It won't be available for them any more.":"This folder is shared with others. It won't be available for them any more.");new o({title:r,description:a.get("permissions").length>1&&d}).addCancelButton().addButton({label:i("Delete"),action:"delete"}).on("delete",function(){l(t,n)}).open()}});