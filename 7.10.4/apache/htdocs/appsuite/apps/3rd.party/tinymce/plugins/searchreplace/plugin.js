!function(){"use strict";function e(e){return e&&1===e.nodeType&&"false"===e.contentEditable}var t=function(e){var n=e,r=function(){return n};return{get:r,set:function(e){n=e},clone:function(){return t(r())}}},n=tinymce.util.Tools.resolve("tinymce.PluginManager"),r=tinymce.util.Tools.resolve("tinymce.util.Tools"),a={findAndReplaceDOMText:function(t,n,r,a,i){function o(e,t){if(t=t||0,!e[0])throw new Error("findAndReplaceDOMText cannot handle zero-length matches");var n=e.index;if(t>0){var r=e[t];if(!r)throw new Error("Invalid capture group");n+=e[0].indexOf(r),e[0]=r}return[n,n+e[0].length,[e[0]]]}function d(t){var n;if(3===t.nodeType)return t.data;if(f[t.nodeName]&&!u[t.nodeName])return"";if(n="",e(t))return"\n";if((u[t.nodeName]||g[t.nodeName])&&(n+="\n"),t=t.firstChild)do{n+=d(t)}while(t=t.nextSibling);return n}var c,l,s,u,f,g,p=[],h=0;if(s=n.ownerDocument,u=i.getBlockElements(),f=i.getWhiteSpaceElements(),g=i.getShortEndedElements(),l=d(n)){if(t.global)for(;c=t.exec(l);)p.push(o(c,a));else c=l.match(t),p.push(o(c,a));return p.length&&(h=p.length,function(t,n,r){var a,i,o,d,c=[],l=0,s=t,p=n.shift(),h=0;e:for(;;){if((u[s.nodeName]||g[s.nodeName]||e(s))&&l++,3===s.nodeType&&(!i&&s.length+l>=p[1]?(i=s,d=p[1]-l):a&&c.push(s),!a&&s.length+l>p[0]&&(a=s,o=p[0]-l),l+=s.length),a&&i){if(s=r({startNode:a,startNodeIndex:o,endNode:i,endNodeIndex:d,innerNodes:c,match:p[2],matchIndex:h}),l-=i.length-d,a=null,i=null,c=[],p=n.shift(),h++,!p)break}else if(f[s.nodeName]&&!u[s.nodeName]||!s.firstChild){if(s.nextSibling){s=s.nextSibling;continue}}else if(!e(s)){s=s.firstChild;continue}for(;;){if(s.nextSibling){s=s.nextSibling;break}if(s.parentNode===t)break e;s=s.parentNode}}}(n,p,function(e){var t;if("function"!=typeof e){var n=e.nodeType?e:s.createElement(e);t=function(e,t){var r=n.cloneNode(!1);return r.setAttribute("data-mce-index",t),e&&r.appendChild(s.createTextNode(e)),r}}else t=e;return function(e){var n,r,a,i=e.startNode,o=e.endNode,d=e.matchIndex;if(i===o){var c=i;a=c.parentNode,e.startNodeIndex>0&&(n=s.createTextNode(c.data.substring(0,e.startNodeIndex)),a.insertBefore(n,c));var l=t(e.match[0],d);return a.insertBefore(l,c),e.endNodeIndex<c.length&&(r=s.createTextNode(c.data.substring(e.endNodeIndex)),a.insertBefore(r,c)),c.parentNode.removeChild(c),l}n=s.createTextNode(i.data.substring(0,e.startNodeIndex)),r=s.createTextNode(o.data.substring(e.endNodeIndex));for(var u=t(i.data.substring(e.startNodeIndex),d),f=0,g=e.innerNodes.length;f<g;++f){var p=e.innerNodes[f],h=t(p.data,d);p.parentNode.replaceChild(h,p)}var m=t(o.data.substring(0,e.endNodeIndex),d);return(a=i.parentNode).insertBefore(n,i),a.insertBefore(u,i),a.removeChild(i),(a=o.parentNode).insertBefore(m,o),a.insertBefore(r,o),a.removeChild(o),m}}(r))),h}}},i=function(e){var t=e.getAttribute("data-mce-index");return"number"==typeof t?""+t:t},o=function(e,t,n){var r,i;return i=e.dom.create("span",{"data-mce-bogus":1}),i.className="mce-match-marker",r=e.getBody(),p(e,t,!1),a.findAndReplaceDOMText(n,r,i,!1,e.schema)},d=function(e){var t=e.parentNode;e.firstChild&&t.insertBefore(e.firstChild,e),e.parentNode.removeChild(e)},c=function(e,t){var n,a=[];if((n=r.toArray(e.getBody().getElementsByTagName("span"))).length)for(var o=0;o<n.length;o++){var d=i(n[o]);null!==d&&d.length&&(d===t.toString()&&a.push(n[o]))}return a},l=function(e,t,n){var r=t.get(),a=e.dom;(n=!1!==n)?r++:r--,a.removeClass(c(e,t.get()),"mce-match-marker-selected");var i=c(e,r);return i.length?(a.addClass(c(e,r),"mce-match-marker-selected"),e.selection.scrollIntoView(i[0]),r):-1},s=function(e,t){var n=t.parentNode;e.remove(t),e.isEmpty(n)&&e.remove(n)},u=function(e,t){var n=l(e,t,!0);-1!==n&&t.set(n)},f=function(e,t){var n=l(e,t,!1);-1!==n&&t.set(n)},g=function(e){var t=i(e);return null!==t&&t.length>0},p=function(e,t,n){var a,o,c,l;for(o=r.toArray(e.getBody().getElementsByTagName("span")),a=0;a<o.length;a++){var s=i(o[a]);null!==s&&s.length&&(s===t.get().toString()&&(c||(c=o[a].firstChild),l=o[a].firstChild),d(o[a]))}if(c&&l){var u=e.dom.createRng();return u.setStart(c,0),u.setEnd(l,l.data.length),!1!==n&&e.selection.setRng(u),u}},h=function(e,t){return c(e,t.get()+1).length>0},m=function(e,t){return c(e,t.get()-1).length>0},v={done:p,find:function(e,t,n,r,a){n=(n=n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")).replace(/\s/g,"[^\\S\\r\\n]"),n=a?"\\b"+n+"\\b":n;var i=o(e,t,new RegExp(n,r?"g":"gi"));return i&&(t.set(-1),t.set(l(e,t,!0))),i},next:u,prev:f,replace:function(e,t,n,a,o){var c,l,p,v,x,b,N=t.get();for(a=!1!==a,p=e.getBody(),l=r.grep(r.toArray(p.getElementsByTagName("span")),g),c=0;c<l.length;c++){var y=i(l[c]);if(v=x=parseInt(y,10),o||v===t.get()){for(n.length?(l[c].firstChild.nodeValue=n,d(l[c])):s(e.dom,l[c]);l[++c];){if((v=parseInt(i(l[c]),10))!==x){c--;break}s(e.dom,l[c])}a&&N--}else x>t.get()&&l[c].setAttribute("data-mce-index",x-1)}return t.set(N),a?(b=h(e,t),u(e,t)):(b=m(e,t),f(e,t)),!o&&b},hasNext:h,hasPrev:m},x={get:function(e,t){return{done:function(n){return v.done(e,t,n)},find:function(n,r,a){return v.find(e,t,n,r,a)},next:function(){return v.next(e,t)},prev:function(){return v.prev(e,t)},replace:function(n,r,a){return v.replace(e,t,n,r,a)}}}},b={open:function(e,t){function n(){d.statusbar.find("#next").disabled(!1===v.hasNext(e,t)),d.statusbar.find("#prev").disabled(!1===v.hasPrev(e,t))}function a(){e.windowManager.alert("Could not find the specified string.",function(){d.find("#find")[0].focus()})}var i,o={};e.undoManager.add(),i=r.trim(e.selection.getContent({format:"text"}));var d=e.windowManager.open({layout:"flex",pack:"center",align:"center",onClose:function(){e.focus(),v.done(e,t),e.undoManager.add()},onSubmit:function(r){var i,c,l,s;return r.preventDefault(),c=d.find("#case").checked(),s=d.find("#words").checked(),(l=d.find("#find").value()).length?o.text===l&&o.caseState===c&&o.wholeWord===s?v.hasNext(e,t)?(v.next(e,t),void n()):void a():((i=v.find(e,t,l,c,s))||a(),d.statusbar.items().slice(1).disabled(0===i),n(),void(o={text:l,caseState:c,wholeWord:s})):(v.done(e,t,!1),void d.statusbar.items().slice(1).disabled(!0))},buttons:[{text:"Find",subtype:"primary",onclick:function(){d.submit()}},{text:"Replace",disabled:!0,onclick:function(){v.replace(e,t,d.find("#replace").value())||(d.statusbar.items().slice(1).disabled(!0),t.set(-1),o={})}},{text:"Replace all",disabled:!0,onclick:function(){v.replace(e,t,d.find("#replace").value(),!0,!0),d.statusbar.items().slice(1).disabled(!0),o={}}},{type:"spacer",flex:1},{text:"Prev",name:"prev",disabled:!0,onclick:function(){v.prev(e,t),n()}},{text:"Next",name:"next",disabled:!0,onclick:function(){v.next(e,t),n()}}],title:"Find and replace",items:{type:"form",padding:20,labelGap:30,spacing:10,items:[{type:"textbox",name:"find",size:40,label:"Find",value:i},{type:"textbox",name:"replace",size:40,label:"Replace with"},{type:"checkbox",name:"case",text:"Match case",label:" "},{type:"checkbox",name:"words",text:"Whole words",label:" "}]}})}},N={register:function(e,t){e.addCommand("SearchReplace",function(){b.open(e,t)})}},y=function(e,t){return function(){b.open(e,t)}},k={register:function(e,t){e.addMenuItem("searchreplace",{text:"Find and replace",shortcut:"Meta+F",onclick:y(e,t),separator:"before",context:"edit"}),e.addButton("searchreplace",{tooltip:"Find and replace",onclick:y(e,t)}),e.shortcuts.add("Meta+F","",y(e,t))}};n.add("searchreplace",function(e){var n=t(-1);return N.register(e,n),k.register(e,n),x.get(e,n)})}();