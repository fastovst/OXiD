!function(){"use strict";var t=tinymce.util.Tools.resolve("tinymce.PluginManager"),e=tinymce.util.Tools.resolve("tinymce.util.Tools"),i=[["cool","cry","embarassed","foot-in-mouth"],["frown","innocent","kiss","laughing"],["money-mouth","sealed","smile","surprised"],["tongue-out","undecided","wink","yell"]],n={getHtml:function(t){var n;return n='<table role="list" class="mce-grid">',e.each(i,function(i){n+="<tr>",e.each(i,function(e){var i=t+"/img/smiley-"+e+".gif";n+='<td><a href="#" data-mce-url="'+i+'" data-mce-alt="'+e+'" tabindex="-1" role="option" aria-label="'+e+'"><img src="'+i+'" style="width: 18px; height: 18px" role="presentation" /></a></td>'}),n+="</tr>"}),n+="</table>"}},o=function(t,e,i){t.insertContent(t.dom.createHTML("img",{src:e,alt:i}))},a={register:function(t,e){var i=n.getHtml(e);t.addButton("emoticons",{type:"panelbutton",panel:{role:"application",autohide:!0,html:i,onclick:function(e){var i=t.dom.getParent(e.target,"a");i&&(o(t,i.getAttribute("data-mce-url"),i.getAttribute("data-mce-alt")),this.hide())}},tooltip:"Emoticons"})}};t.add("emoticons",function(t,e){a.register(t,e)})}();