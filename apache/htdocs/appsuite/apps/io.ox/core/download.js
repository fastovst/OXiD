define("io.ox/core/download",["io.ox/files/api","io.ox/mail/api","io.ox/core/capabilities","io.ox/backbone/views/modal","gettext!io.ox/core","io.ox/core/extensions"],function(e,n,i,a,o,t){"use strict";function r(e){return{id:e.id,folder_id:e.folder||e.folder_id}}function d(e){return JSON.stringify(_.map(e,function(e){return e.managedId?e.managedId:e.id}))}function l(e){e+=(-1===e.indexOf("?")?"?":"&")+"callback=antivirus",i.has("antivirus")&&(e+="&scan=true"),$("#tmp").append($("<iframe>",{src:e,class:"hidden download-frame"}))}function s(e){e=e||{},i.has("antivirus")&&(e.url+="&scan=true");var n=_.uniqueId("iframe"),a=$("<iframe>",{src:"blank.html",name:n,class:"hidden download-frame"}),o=$("<form>",{iframeName:n,action:e.url,method:"post",target:n}).append($('<input type="hidden" name="body" value="">').val(e.body));_.device("ios")||$("#tmp").append(a),$("#tmp").append(o),o.submit()}function c(e){e&&(0===e.code.indexOf("ANTI-VIRUS-SERVICE")?(_($("#tmp iframe.hidden.download-frame")).each(function(n){-1!==n.contentDocument.head.innerHTML.indexOf(e.error_id)&&(e.dlFrame=n)}),new a({title:o(e.code.match(/0011/)?"Malicious file detected":"Anti-Virus warning"),point:"io.ox/core/download/antiviruspopup",model:new Backbone.Model(e)}).on("ignore",function(){if(e.url){var n=blankshield.open("blank.html","_blank");return n.callback_antivirus=function(e){c(e),n.close()},void(n.location=e.url.replace("&scan=true",""))}if(-1!==e.dlFrame.src.indexOf("blank.html")){var i=$('#tmp form[iframeName="'+e.dlFrame.name+'"]');if(!i.length)return;return i[0].action=i[0].action.replace("&scan=true",""),void i.submit()}_.device("safari")||(e.dlFrame.src=e.dlFrame.src.replace("&scan=true",""))}).on("cancel",function(){e.dlFrame&&$(e.dlFrame).remove()}).open()):require(["io.ox/core/yell"],function(n){n(e)}))}window.callback_antivirus=c;var u=_(["0008","0009","0011"]).map(function(e){return"ANTI-VIRUS-SERVICE-"+e});return t.point("io.ox/core/download/antiviruspopup").extend({index:100,id:"buttonThreatFound",render:function(e){if("ANTI-VIRUS-SERVICE-0011"===e.model.get("code")){var n={action:"ignore",label:o("Download infected file"),className:"btn-default"};_.device("!ios && safari")?this.addDownloadButton(_.extend(n,{href:e.model.get("dlFrame").src.replace("&scan=true","")})):(this.addButton(n),this.addButton({action:"cancel",label:o("Cancel"),className:"btn-primary"}))}}}),t.point("io.ox/core/download/antiviruspopup").extend({index:200,id:"buttonNotScanned",render:function(e){if("ANTI-VIRUS-SERVICE-0011"!==e.model.get("code")){var n={action:"ignore",label:o("Download unscanned file"),className:"btn-default"};_.device("!ios && safari")?this.addDownloadButton(_.extend(n,{href:e.model.get("dlFrame").src.replace("&scan=true","")})):(this.addButton({action:"cancel",label:o("Cancel"),className:"btn-default"}),this.addButton(n))}}}),t.point("io.ox/core/download/antiviruspopup").extend({index:300,id:"message",render:function(e){var n=e.model.get("error"),i="ANTI-VIRUS-SERVICE-0011"===e.model.get("code")?"av-danger":"av-warning";-1===u.indexOf(e.model.get("code"))&&(n=o("Unable to perform Anti-Virus check for the requested file(s)")),this.$body.addClass("av-dialog").addClass(i).append($('<i class="fa fa-warning" aria-hidden="true">'),$("<div>").text(n))}}),{url:l,multiple:s,window:function(e,n){if((n=n||{}).antivirus){e+=(-1===e.indexOf("?")?"?":"&")+"callback=antivirus",i.has("antivirus")&&(e+="&scan=true");var a=blankshield.open(e,"_blank");return a.callback_antivirus=function(n){n.url=e,c(n),a.close()},a}return blankshield.open(e,"_blank")},file:function(n){var a=_.device("ios")&&this.window("blank.html");e.get(n).done(function(o){n.version&&(o=_.extend({},o,{version:n.version})),n.filename&&(o=_.extend(o,{filename:n.filename}));var t=e.getUrl(o,"download",{params:n.params});_.device("ios")?(t+=(-1===t.indexOf("?")?"?":"&")+"callback=antivirus",i.has("antivirus")&&(t+="&scan=true"),a.callback_antivirus=function(e){e.url=t,c(e),a.close()},a.location=t):l(t)})},exported:function(e){if(/^(VCARD|ICAL|CSV)$/i.test(e.format)){var n=_.extend({include:!0},e),i=!n.folder&&n.list;s({url:ox.apiRoot+"/export?action="+n.format.toUpperCase()+(i?"":"&folder="+n.folder)+"&export_dlists="+(n.include?"true":"false")+"&content_disposition=attachment"+(n.columns&&"CSV"===n.format.toUpperCase()?"&columns="+n.columns:"")+"&session="+ox.session,body:i?JSON.stringify(_.map(n.list,r)):""})}},files:function(e){s({url:ox.apiRoot+"/files?action=zipdocuments&callback=antivirus&session="+ox.session,body:JSON.stringify(_.map(e,r))})},pimAttachments:function(e,n){s({url:ox.apiRoot+"/attachment?action=zipDocuments&callback=antivirus&session="+ox.session+"&folder="+n.folder+"&attached="+n.attached+"&module="+n.module,body:d(e)})},mail:function(e){l(n.getUrl(e,"eml"))},composeAttachment:function(e){var n=e.space,i=e.id;l(ox.apiRoot+"/mail/compose/"+n+"/attachments/"+i+"?session="+ox.session)},mails:function(e){s({url:ox.apiRoot+"/mail?action=zip_messages&session="+ox.session,body:JSON.stringify(_.map(e,n.reduce))})}}});