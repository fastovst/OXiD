!function(e){"use strict";function t(e){return e&&1===e.nodeType&&"false"===e.contentEditable}var n,r=function(e){var t=e,n=function(){return t};return{get:n,set:function(e){t=e},clone:function(){return r(n())}}},o=tinymce.util.Tools.resolve("tinymce.PluginManager"),c={hasProPlugin:function(t){return!(!/(^|[ ,])tinymcespellchecker([, ]|$)/.test(t.settings.plugins)||!o.get("tinymcespellchecker")||(void 0!==e.window.console&&e.window.console.log&&e.window.console.log("Spell Checker Pro is incompatible with Spell Checker plugin! Remove 'spellchecker' from the 'plugins' option."),0))}},i={getLanguages:function(e){return e.getParam("spellchecker_languages","English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr_FR,German=de,Italian=it,Polish=pl,Portuguese=pt_BR,Spanish=es,Swedish=sv")},getLanguage:function(e){var t=e.getParam("language","en");return e.getParam("spellchecker_language",t)},getRpcUrl:function(e){return e.getParam("spellchecker_rpc_url")},getSpellcheckerCallback:function(e){return e.getParam("spellchecker_callback")},getSpellcheckerWordcharPattern:function(e){var t=new RegExp('[^\\s!"#$%&()*+,-./:;<=>?@[\\]^_{|}`§©«®±¶·¸»¼½¾¿×÷¤”“„    ]+',"g");return e.getParam("spellchecker_wordchar_pattern",t)}},a=tinymce.util.Tools.resolve("tinymce.util.Tools"),l=tinymce.util.Tools.resolve("tinymce.util.URI"),s=tinymce.util.Tools.resolve("tinymce.util.XHR"),u={fireSpellcheckStart:function(e){return e.fire("SpellcheckStart")},fireSpellcheckEnd:function(e){return e.fire("SpellcheckEnd")}},d=function(e,n){function r(e,t){if(!e[0])throw new Error("findAndReplaceDOMText cannot handle zero-length matches");return{start:e.index,end:e.index+e[0].length,text:e[0],data:t}}function o(e){var n;if(3===e.nodeType)return e.data;if(v[e.nodeName]&&!m[e.nodeName])return"";if(t(e))return"\n";if(n="",(m[e.nodeName]||k[e.nodeName])&&(n+="\n"),e=e.firstChild)do{n+=o(e)}while(e=e.nextSibling);return n}function c(e,n,r){var o,c,i,a,l,s=[],u=0,d=e,f=0;(n=n.slice(0)).sort(function(e,t){return e.start-t.start}),l=n.shift();e:for(;;){if((m[d.nodeName]||k[d.nodeName]||t(d))&&u++,3===d.nodeType&&(!c&&d.length+u>=l.end?(c=d,a=l.end-u):o&&s.push(d),!o&&d.length+u>l.start&&(o=d,i=l.start-u),u+=d.length),o&&c){if(d=r({startNode:o,startNodeIndex:i,endNode:c,endNodeIndex:a,innerNodes:s,match:l.text,matchIndex:f}),u-=c.length-a,o=null,c=null,s=[],l=n.shift(),f++,!l)break}else if(v[d.nodeName]&&!m[d.nodeName]||!d.firstChild){if(d.nextSibling){d=d.nextSibling;continue}}else if(!t(d)){d=d.firstChild;continue}for(;;){if(d.nextSibling){d=d.nextSibling;break}if(d.parentNode===e)break e;d=d.parentNode}}}function i(e){function t(t,n){var r=x[n];r.stencil||(r.stencil=e(r));var o=r.stencil.cloneNode(!1);return o.setAttribute("data-mce-index",n),t&&o.appendChild(N.doc.createTextNode(t)),o}return function(e){var n,r,o,c=e.startNode,i=e.endNode,a=e.matchIndex,l=N.doc;if(c===i){var s=c;o=s.parentNode,e.startNodeIndex>0&&(n=l.createTextNode(s.data.substring(0,e.startNodeIndex)),o.insertBefore(n,s));var u=t(e.match,a);return o.insertBefore(u,s),e.endNodeIndex<s.length&&(r=l.createTextNode(s.data.substring(e.endNodeIndex)),o.insertBefore(r,s)),s.parentNode.removeChild(s),u}n=l.createTextNode(c.data.substring(0,e.startNodeIndex)),r=l.createTextNode(i.data.substring(e.endNodeIndex));for(var d=t(c.data.substring(e.startNodeIndex),a),f=0,g=e.innerNodes.length;f<g;++f){var h=e.innerNodes[f],p=t(h.data,a);h.parentNode.replaceChild(p,h)}var m=t(i.data.substring(0,e.endNodeIndex),a);return(o=c.parentNode).insertBefore(n,c),o.insertBefore(d,c),o.removeChild(c),(o=i.parentNode).insertBefore(m,i),o.insertBefore(r,i),o.removeChild(i),m}}function a(e){e.parentNode.insertBefore(e.firstChild,e),e.parentNode.removeChild(e)}function l(e){return-1!==e.className.indexOf("mce-spellchecker-word")}function s(t){var n=e.getElementsByTagName("*"),r=[];t="number"==typeof t?""+t:null;for(var o=0;o<n.length;o++){var c=n[o],i=c.getAttribute("data-mce-index");null!==i&&i.length&&l(c)&&(i!==t&&null!==t||r.push(c))}return r}function u(e){for(var t=x.length;t--;)if(x[t]===e)return t;return-1}function d(e){for(var t=0,n=x.length;t<n&&!1!==e(x[t],t);t++);return this}function f(e){var t,n=s(e?u(e):null);for(t=n.length;t--;)a(n[t]);return this}function g(e){var t=s(u(e)),r=n.dom.createRng();return r.setStartBefore(t[0]),r.setEndAfter(t[t.length-1]),r}var h,p,m,v,k,x=[],N=n.dom;return m=n.schema.getBlockElements(),v=n.schema.getWhiteSpaceElements(),k=n.schema.getShortEndedElements(),p=o(e),{text:p,matches:x,each:d,filter:function(e){var t=[];return d(function(n,r){e(n,r)&&t.push(n)}),x=t,this},reset:function(){return x.splice(0,x.length),f(),this},matchFromElement:function(e){return x[e.getAttribute("data-mce-index")]},elementFromMatch:function(e){return s(u(e))[0]},find:function(e,t){if(p&&e.global)for(;h=e.exec(p);)x.push(r(h,t));return this},add:function(e,t,n){return x.push({start:e,end:e+t,text:p.substr(e,t),data:n}),this},wrap:function(t){return x.length&&c(e,x,i(t)),this},unwrap:f,replace:function(e,t){var r=g(e);return r.deleteContents(),t.length>0&&r.insertNode(n.dom.doc.createTextNode(t)),r},rangeFromMatch:g,indexOf:u}},f=function(e,t){if(!t.get()){var n=d(e.getBody(),e);t.set(n)}return t.get()},g=function(e){for(var t in e)return!1;return!0},h=function(e,t,n){return function(r,o,c,u){var d={method:r,lang:n.get()},f="";d["addToDictionary"===r?"word":"text"]=o,a.each(d,function(e,t){f&&(f+="&"),f+=t+"="+encodeURIComponent(e)}),s.send({url:new l(t).toAbsolute(i.getRpcUrl(e)),type:"post",content_type:"application/x-www-form-urlencoded",data:f,success:function(t){if(t=JSON.parse(t))t.error?u(t.error):c(t);else{var n=e.translate("Server response wasn't proper JSON.");u(n)}},error:function(){var t=e.translate("The spelling service was not found: (")+i.getRpcUrl(e)+e.translate(")");u(t)}})}},p=function(e,t,n,r,o,c,a){var l=i.getSpellcheckerCallback(e);(l||h(e,t,n)).call(e.plugins.spellchecker,r,o,c,a)},m=function(e,t,n){e.dom.select("span.mce-spellchecker-word").length||v(e,t,n)},v=function(e,t,n){var r=e.selection.getBookmark();if(f(e,n).reset(),e.selection.moveToBookmark(r),n.set(null),t.get())return t.set(!1),u.fireSpellcheckEnd(e),!0},k=function(e){var t=e.getAttribute("data-mce-index");return"number"==typeof t?""+t:t},x=function(e,t,n,r,o){var c,a;if("string"!=typeof o&&o.words?(a=!!o.dictionary,c=o.words):c=o,e.setProgressState(!1),g(c)){var l=e.translate("No misspellings found.");return e.notificationManager.open({text:l,type:"info"}),void t.set(!1)}r.set({suggestions:c,hasDictionarySupport:a});var s=e.selection.getBookmark();f(e,n).find(i.getSpellcheckerWordcharPattern(e)).filter(function(e){return!!c[e.text]}).wrap(function(t){return e.dom.create("span",{class:"mce-spellchecker-word","data-mce-bogus":1,"data-mce-word":t.text})}),e.selection.moveToBookmark(s),t.set(!0),u.fireSpellcheckStart(e)},N={spellcheck:function(e,t,n,r,o,c){v(e,n,r)||(e.setProgressState(!0),p(e,t,c,"spellcheck",f(e,r).text,function(t){x(e,n,r,o,t)},function(t){e.notificationManager.open({text:t,type:"error"}),e.setProgressState(!1),v(e,n,r)}),e.focus())},checkIfFinished:m,addToDictionary:function(e,t,n,r,o,c,i){e.setProgressState(!0),p(e,t,o,"addToDictionary",c,function(){e.setProgressState(!1),e.dom.remove(i,!0),m(e,n,r)},function(t){e.notificationManager.open({text:t,type:"error"}),e.setProgressState(!1)})},ignoreWord:function(e,t,n,r,o,c){e.selection.collapse(),c?a.each(e.dom.select("span.mce-spellchecker-word"),function(t){t.getAttribute("data-mce-word")===r&&e.dom.remove(t,!0)}):e.dom.remove(o,!0),m(e,t,n)},findSpansByIndex:function(e,t){var n,r=[];if((n=a.toArray(e.getBody().getElementsByTagName("span"))).length)for(var o=0;o<n.length;o++){var c=k(n[o]);null!==c&&c.length&&c===t.toString()&&r.push(n[o])}return r},getElmIndex:k,markErrors:x},S={get:function(e,t,n,r,o,c){return{getTextMatcher:function(){return r.get()},getWordCharPattern:function(){return i.getSpellcheckerWordcharPattern(e)},markErrors:function(o){N.markErrors(e,t,r,n,o)},getLanguage:function(){return o.get()}}}},y={register:function(e,t,n,r,o,c){e.addCommand("mceSpellCheck",function(){N.spellcheck(e,t,n,r,o,c)})}},w=function(e,t){var n=[];return a.each(t,function(e){n.push({selectable:!0,text:e.name,data:e.value})}),n},b=function(e,t){return function(e){var n=t.get();e.control.items().each(function(e){e.active(e.settings.data===n)})}},T=function(e){return a.map(i.getLanguages(e).split(","),function(e){return e=e.split("="),{name:e[0],value:e[1]}})},P={register:function(e,t,n,r,o,c){var i=w(0,T(e)),a=function(){N.spellcheck(e,t,n,r,c,o)},l={tooltip:"Spellcheck",onclick:a,onPostRender:function(t){var r=t.control;e.on("SpellcheckStart SpellcheckEnd",function(){r.active(n.get())})}};i.length>1&&(l.type="splitbutton",l.menu=i,l.onshow=b(0,o),l.onselect=function(e){o.set(e.control.settings.data)}),e.addButton("spellchecker",l),e.addMenuItem("spellchecker",{text:"Spellcheck",context:"tools",onclick:a,selectable:!0,onPostRender:function(){var t=this;t.active(n.get()),e.on("SpellcheckStart SpellcheckEnd",function(){t.active(n.get())})}})}},E=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),B=tinymce.util.Tools.resolve("tinymce.ui.Factory"),I=function(t,r,o,c,i,l,s,u){var d=[],f=o.get().suggestions[s];a.each(f,function(e){d.push({text:e,onclick:function(){t.insertContent(t.dom.encode(e)),t.dom.remove(u),N.checkIfFinished(t,c,i)}})}),d.push({text:"-"}),o.get().hasDictionarySupport&&d.push({text:"Add to Dictionary",onclick:function(){N.addToDictionary(t,r,c,i,l,s,u)}}),d.push.apply(d,[{text:"Ignore",onclick:function(){N.ignoreWord(t,c,i,s,u)}},{text:"Ignore all",onclick:function(){N.ignoreWord(t,c,i,s,u,!0)}}]),(n=B.create("menu",{items:d,context:"contextmenu",onautohide:function(e){-1!==e.target.className.indexOf("spellchecker")&&e.preventDefault()},onhide:function(){n.remove(),n=null}})).renderTo(e.document.body);var g=E.DOM.getPos(t.getContentAreaContainer()),h=t.dom.getPos(u[0]),p=t.dom.getRoot();"BODY"===p.nodeName?(h.x-=p.ownerDocument.documentElement.scrollLeft||p.scrollLeft,h.y-=p.ownerDocument.documentElement.scrollTop||p.scrollTop):(h.x-=p.scrollLeft,h.y-=p.scrollTop),g.x+=h.x,g.y+=h.y,n.moveTo(g.x,g.y+u[0].offsetHeight)},C={setup:function(e,t,n,r,o,c){e.on("click",function(i){var a=i.target;if("mce-spellchecker-word"===a.className){i.preventDefault();var l=N.findSpansByIndex(e,N.getElmIndex(a));if(l.length>0){var s=e.dom.createRng();s.setStartBefore(l[0]),s.setEndAfter(l[l.length-1]),e.selection.setRng(s),I(e,t,n,r,o,c,a.getAttribute("data-mce-word"),l)}}})}};o.add("spellchecker",function(e,t){if(!1===c.hasProPlugin(e)){var n=r(!1),o=r(i.getLanguage(e)),a=r(null),l=r(null);return P.register(e,t,n,a,o,l),C.setup(e,t,l,n,a,o),y.register(e,t,n,a,l,o),S.get(e,n,l,a,o,t)}})}(window);