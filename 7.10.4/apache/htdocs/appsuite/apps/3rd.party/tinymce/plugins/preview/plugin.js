!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),t=tinymce.util.Tools.resolve("tinymce.Env"),n={getPreviewDialogWidth:function(e){return parseInt(e.getParam("plugin_preview_width","650"),10)},getPreviewDialogHeight:function(e){return parseInt(e.getParam("plugin_preview_height","500"),10)},getContentStyle:function(e){return e.getParam("content_style","")}},i=tinymce.util.Tools.resolve("tinymce.util.Tools"),o=function(e){var t="",o=e.dom.encode,r=n.getContentStyle(e);t+='<base href="'+o(e.documentBaseURI.getURI())+'">',r&&(t+='<style type="text/css">'+r+"</style>"),i.each(e.contentCSS,function(n){t+='<link type="text/css" rel="stylesheet" href="'+o(e.documentBaseURI.toAbsolute(n))+'">'});var a=e.settings.body_id||"tinymce";-1!==a.indexOf("=")&&(a=(a=e.getParam("body_id","","hash"))[e.id]||a);var c=e.settings.body_class||"";-1!==c.indexOf("=")&&(c=(c=e.getParam("body_class","","hash"))[e.id]||"");var s=e.settings.directionality?' dir="'+e.settings.directionality+'"':"";return"<!DOCTYPE html><html><head>"+t+'</head><body id="'+o(a)+'" class="mce-content-body '+o(c)+'"'+o(s)+">"+e.getContent()+'<script>document.addEventListener && document.addEventListener("click", function(e) {for (var elm = e.target; elm; elm = elm.parentNode) {if (elm.nodeName === "A") {e.preventDefault();}}}, false);<\/script> </body></html>'},r={getPreviewHtml:o,injectIframeContent:function(e,t,n){var i=o(e);if(n)t.src="data:text/html;charset=utf-8,"+encodeURIComponent(i);else{var r=t.contentWindow.document;r.open(),r.write(i),r.close()}}},a={open:function(e){var i=!t.ie,o='<iframe src="" frameborder="0"'+(i?' sandbox="allow-scripts"':"")+"></iframe>",a=n.getPreviewDialogWidth(e),c=n.getPreviewDialogHeight(e);e.windowManager.open({title:"Preview",width:a,height:c,html:o,buttons:{text:"Close",onclick:function(e){e.control.parent().parent().close()}},onPostRender:function(t){var n=t.control.getEl("body").firstChild;r.injectIframeContent(e,n,i)}})}},c={register:function(e){e.addCommand("mcePreview",function(){a.open(e)})}},s={register:function(e){e.addButton("preview",{title:"Preview",cmd:"mcePreview"}),e.addMenuItem("preview",{text:"Preview",cmd:"mcePreview",context:"view"})}};e.add("preview",function(e){c.register(e),s.register(e)})}();