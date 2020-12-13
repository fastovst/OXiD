!function(){"use strict";var e={isValidId:function(e){return/^[A-Za-z][A-Za-z0-9\-:._]*$/.test(e)},getId:function(e){var t=e.selection.getNode();return"A"===t.tagName&&""===e.dom.getAttrib(t,"href")?t.id||t.name:""},insert:function(e,t){var n=e.selection.getNode();"A"===n.tagName&&""===e.dom.getAttrib(n,"href")?(n.removeAttribute("name"),n.id=t,e.undoManager.add()):(e.focus(),e.selection.collapse(!0),e.execCommand("mceInsertContent",!1,e.dom.createHTML("a",{id:t})))}},t=function(t,n){return e.isValidId(n)?(e.insert(t,n),!1):(t.windowManager.alert("Id should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores."),!0)},n={open:function(n){var r=e.getId(n);n.windowManager.open({title:"Anchor",body:{type:"textbox",name:"id",size:40,label:"Id",value:r},onsubmit:function(e){var r=e.data.id;t(n,r)&&e.preventDefault()}})}},r={register:function(e){e.addCommand("mceAnchor",function(){n.open(e)})}},o=function(e){return!e.attr("href")&&(e.attr("id")||e.attr("name"))&&!e.firstChild},a=function(e){return function(t){for(var n=0;n<t.length;n++)o(t[n])&&t[n].attr("contenteditable",e)}},i={setup:function(e){e.on("PreInit",function(){e.parser.addNodeFilter("a",a("false")),e.serializer.addNodeFilter("a",a(null))})}},d={register:function(e){e.addButton("anchor",{icon:"anchor",tooltip:"Anchor",cmd:"mceAnchor",stateSelector:"a:not([href])"}),e.addMenuItem("anchor",{icon:"anchor",text:"Anchor",context:"insert",cmd:"mceAnchor"})}};tinymce.util.Tools.resolve("tinymce.PluginManager").add("anchor",function(e){i.setup(e),r.register(e),d.register(e)})}();