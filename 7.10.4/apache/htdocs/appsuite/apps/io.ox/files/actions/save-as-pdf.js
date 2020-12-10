define("io.ox/files/actions/save-as-pdf",["io.ox/core/folder/api","io.ox/files/api","io.ox/core/extensions","io.ox/backbone/views/modal","io.ox/core/tk/doc-converter-utils","gettext!io.ox/files"],function(e,o,t,i,n,r){"use strict";var a={importError:r("An error occurred loading the document so it cannot be displayed."),filterError:r("An error occurred converting the document so it cannot be displayed."),passwordProtected:r("This document is password protected and cannot be displayed.")};return function(s){function d(e){var t={documentformat:"pdf",saveas_filename:e+".pdf",saveas_folder_id:p?u.get("folder_id"):require("settings!io.ox/files").get("folder/documents")};return n.sendConverterRequest(u,t).done(function(e){"id"in e&&"filename"in e?(o.trigger("add:file",{id:e.id,folder_id:t.saveas_folder_id}),p||c("info",'The PDF has been saved to "/drive/myfiles/documents" due to not having write access for the current folder.')):c("error",f=a[e&&e.cause]||a.importError)})}function c(){var e=this,o=arguments;require(["io.ox/core/notifications"],function(t){t.yell.apply(e,o)})}function l(e){var o;return t.point("io.ox/core/filename").invoke("validate",null,e,"file").find(function(e){if(!0!==e)return c("warning",e),o=!0}),o?$.Deferred().reject():d.call(this,e)}var f,u=s.models[0],p=e.can("create",e.pool.models[u.get("folder_id")].toJSON()),v=u.getDisplayName(),m=v.length,h=v.lastIndexOf(".");v=v.substring(0,h>=0?h:m),new i({title:r("Save as PDF"),enter:"save",async:!0}).build(function(){this.$body.append(this.$input=$('<input type="text" name="name" class="form-control">')),this.$input.focus().val(v).get(0).setSelectionRange(0,v.lastIndexOf("."))}).addCancelButton().addButton({label:r("Save"),action:"save"}).on("save",function(){l(this.$input.val()).then(this.close,this.idle).fail(function(){_.defer(function(){this.$input.focus()})})}).open()}});