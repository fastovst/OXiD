!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),n=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),a=tinymce.util.Tools.resolve("tinymce.util.Tools"),t={enableWhenDirty:function(e){return e.getParam("save_enablewhendirty",!0)},hasOnSaveCallback:function(e){return!!e.getParam("save_onsavecallback")},hasOnCancelCallback:function(e){return!!e.getParam("save_oncancelcallback")}},o=function(e,n){e.notificationManager.open({text:e.translate(n),type:"error"})},c={save:function(e){var a;if(a=n.DOM.getParent(e.id,"form"),!t.enableWhenDirty(e)||e.isDirty()){if(e.save(),t.hasOnSaveCallback(e))return e.execCallback("save_onsavecallback",e),void e.nodeChanged();a?(e.setDirty(!1),a.onsubmit&&!a.onsubmit()||("function"==typeof a.submit?a.submit():o(e,"Error: Form submit field collision.")),e.nodeChanged()):o(e,"Error: No form element found.")}},cancel:function(e){var n=a.trim(e.startContent);t.hasOnCancelCallback(e)?e.execCallback("save_oncancelcallback",e):(e.setContent(n),e.undoManager.clear(),e.nodeChanged())}},i={register:function(e){e.addCommand("mceSave",function(){c.save(e)}),e.addCommand("mceCancel",function(){c.cancel(e)})}},r=function(e){return function(n){var a=n.control;e.on("nodeChange dirty",function(){a.disabled(t.enableWhenDirty(e)&&!e.isDirty())})}},l={register:function(e){e.addButton("save",{icon:"save",text:"Save",cmd:"mceSave",disabled:!0,onPostRender:r(e)}),e.addButton("cancel",{text:"Cancel",icon:!1,cmd:"mceCancel",disabled:!0,onPostRender:r(e)}),e.addShortcut("Meta+S","","mceSave")}};e.add("save",function(e){l.register(e),i.register(e)})}();