!function(t){"use strict";var n=function(t){var e=t,r=function(){return e};return{get:r,set:function(t){e=t},clone:function(){return n(r())}}},e=tinymce.util.Tools.resolve("tinymce.PluginManager"),r=function(t){return function(){return t}},o=r(!1),a=r(!0),i=function(){return u},u=function(){var t=function(t){return t.isNone()},n=function(t){return t()},e=function(t){return t},u={fold:function(t,n){return t()},is:o,isSome:o,isNone:a,getOr:e,getOrThunk:n,getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:function(){return null},getOrUndefined:function(){},or:e,orThunk:n,map:i,ap:i,each:function(){},bind:i,flatten:i,exists:o,forall:a,filter:i,equals:t,equals_:t,toArray:function(){return[]},toString:r("none()")};return Object.freeze&&Object.freeze(u),u}(),f=function(t){var n=function(){return t},e=function(){return c},r=function(n){return n(t)},c={fold:function(n,e){return e(t)},is:function(n){return t===n},isSome:a,isNone:o,getOr:n,getOrThunk:n,getOrDie:n,getOrNull:n,getOrUndefined:n,or:e,orThunk:e,map:function(n){return f(n(t))},ap:function(n){return n.fold(i,function(n){return f(n(t))})},each:function(n){n(t)},bind:r,flatten:n,exists:r,forall:r,filter:function(n){return n(t)?c:u},equals:function(n){return n.is(t)},equals_:function(n,e){return n.fold(o,function(n){return e(t,n)})},toArray:function(){return[t]},toString:function(){return"some("+t+")"}};return c},c={some:f,none:i,from:function(t){return null===t||void 0===t?u:f(t)}},s=function(t){if(null===t)return"null";var n=typeof t;return"object"===n&&Array.prototype.isPrototypeOf(t)?"array":"object"===n&&String.prototype.isPrototypeOf(t)?"string":n},l=function(t){return function(n){return s(n)===t}}("function"),d=function(t,n){for(var e=[],r=0,o=t.length;r<o;r++){var a=t[r];n(a,r,t)&&e.push(a)}return e},g=Array.prototype.slice,h=function(t,n){var e=g.call(t,0);return e.sort(n),e},m=(l(Array.from)&&Array.from,Object.hasOwnProperty),p=function(t,n){return v(t,n)?c.from(t[n]):c.none()},v=function(t,n){return m.call(t,n)},y=function(t){return v(t,"start")&&v(t,"end")},O=function(t){return!v(t,"end")&&!v(t,"replacement")},P=function(t){return v(t,"replacement")},k=function(t){return h(t,function(t,n){return t.start.length===n.start.length?0:t.start.length>n.start.length?-1:1})},x=function(t){return{inlinePatterns:k(d(t,y)),blockPatterns:k(d(t,O)),replacementPatterns:d(t,P)}},C={get:function(t){return{setPatterns:function(n){t.set(x(n))},getPatterns:function(){return t.get().inlinePatterns.concat(t.get().blockPatterns,t.get().replacementPatterns)}}}},T=[{start:"*",end:"*",format:"italic"},{start:"**",end:"**",format:"bold"},{start:"***",end:"***",format:["bold","italic"]},{start:"#",format:"h1"},{start:"##",format:"h2"},{start:"###",format:"h3"},{start:"####",format:"h4"},{start:"#####",format:"h5"},{start:"######",format:"h6"},{start:"1. ",cmd:"InsertOrderedList"},{start:"* ",cmd:"InsertUnorderedList"},{start:"- ",cmd:"InsertUnorderedList"}],b=function(t){var n=p(t,"textpattern_patterns").getOr(T);return x(n)},D=tinymce.util.Tools.resolve("tinymce.util.Delay"),S=tinymce.util.Tools.resolve("tinymce.util.VK"),I=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),A=tinymce.util.Tools.resolve("tinymce.util.Tools"),N=function(t,n){for(var e=0;e<t.length;e++){var r=t[e];if(0===n.indexOf(r.start)&&(!r.end||n.lastIndexOf(r.end)===n.length-r.end.length))return r}},R=function(t,n,e,r){return n.substr(e-t.end.length-r,t.end.length)===t.end},w=function(t,n,e){return t-n-e.end.length-e.start.length>0},E=function(t,n,e,r){var o,a;for(a=0;a<t.length;a++)if(void 0!==(o=t[a]).end&&R(o,n,e,r)&&w(e,r,o))return o},K=function(n,e,r){if(!1!==e.collapsed){var o=e.startContainer,a=o.data,i=!0===r?1:0;if(3===o.nodeType){var u=E(n,a,e.startOffset,i);if(void 0!==u){var f=a.lastIndexOf(u.end,e.startOffset-i),c=a.lastIndexOf(u.start,f-u.end.length);if(f=a.indexOf(u.end,c+u.start.length),-1!==c){var s=t.document.createRange();s.setStart(o,c),s.setEnd(o,f+u.end.length);var l=N(n,s.toString());if(!(void 0===u||l!==u||o.data.length<=u.start.length+u.end.length))return{pattern:u,startOffset:c,endOffset:f}}}}}},j=function(t,n,e){for(var r=0;r<t.length;r++){var o=e.lastIndexOf(t[r].start,n);if(-1!==o)return c.some({pattern:t[r],startOffset:o})}return c.none()},q=function(t){return t&&3===t.nodeType},L=function(t,n,e){var r=t.dom.createRng();r.setStart(n,e),r.setEnd(n,e),t.selection.setRng(r)},M=function(t,n,e,r){return(t=r>0?t.splitText(r):t).splitText(e-r+n.end.length),t.deleteData(0,n.start.length),t.deleteData(t.data.length-n.end.length,n.end.length),t},U=function(t,n,e,r){var o=A.isArray(e.pattern.format)?e.pattern.format:[e.pattern.format];if(0!==A.grep(o,function(n){var e=t.formatter.get(n);return e&&e[0].inline}).length)return t.undoManager.transact(function(){n=M(n,e.pattern,e.endOffset,e.startOffset),r&&t.selection.setCursorLocation(n.nextSibling,1),o.forEach(function(e){t.formatter.apply(e,{},n)})}),n},_=function(t,n,e){var r=t.selection.getRng();return c.from(K(n,r,e)).map(function(n){return U(t,r.startContainer,n,e)})},z=function(t,n){_(t,n,!0).each(function(n){var e=n.data.slice(-1);if(/[\u00a0 ]/.test(e)){n.deleteData(n.data.length-1,1);var r=t.dom.doc.createTextNode(e);t.dom.insertAfter(r,n.parentNode),L(t,r,1)}})},V=function(t,n){_(t,n,!1).each(function(n){L(t,n,n.data.length)})},W=function(t,n){var e,r,o,a,i,u,f,c,s,l,d;if(e=t.selection,r=t.dom,e.isCollapsed()&&(f=r.getParent(e.getStart(),"p"))){for(s=new I(f,f);i=s.next();)if(q(i)){a=i;break}if(a){if(!(c=N(n,a.data)))return;if(l=e.getRng(!0),o=l.startContainer,d=l.startOffset,a===o&&(d=Math.max(0,d-c.start.length)),A.trim(a.data).length===c.start.length)return;c.format&&(u=t.formatter.get(c.format))&&u[0].block&&(a.deleteData(0,c.start.length),t.formatter.apply(c.format,{},a),l.setStart(o,d),l.collapse(!0),e.setRng(l)),c.cmd&&t.undoManager.transact(function(){a.deleteData(0,c.start.length),t.execCommand(c.cmd)})}}},B=function(t,n){var e=t.selection.getRng(),r=e.startContainer;if(q(r)){var o=e.startOffset;r.insertData(o,n),L(t,r,o+n.length)}else{var a=t.dom.doc.createTextNode(n);e.insertNode(a),L(t,a,a.length)}},F=function(t,n,e){n.deleteData(e.startOffset,e.pattern.start.length),t.insertContent(e.pattern.replacement),c.from(n.nextSibling).filter(q).each(function(e){e.insertData(0,n.data),t.dom.remove(n)})},G=function(t,n){var e=n.startOffset+n.pattern.start.length,r=t.data.slice(e,e+1);return t.deleteData(e,1),r},H=function(t,n,e){var r=t.selection.getRng(),o=r.startContainer;r.collapsed&&q(o)&&j(n,r.startOffset,o.data).each(function(n){var r=e?c.some(G(o,n)):c.none();F(t,o,n),r.each(function(n){return B(t,n)})})},J=function(t,n){H(t,n,!0)},Q=function(t,n){H(t,n,!1)},X=function(t,n,e){for(var r=0;r<t.length;r++)if(e(t[r],n))return!0},Y={handleEnter:function(t,n){Q(t,n.replacementPatterns),V(t,n.inlinePatterns),W(t,n.blockPatterns)},handleInlineKey:function(t,n){J(t,n.replacementPatterns),z(t,n.inlinePatterns)},checkCharCode:function(t,n){return X(t,n,function(t,n){return t.charCodeAt(0)===n.charCode})},checkKeyCode:function(t,n){return X(t,n,function(t,n){return t===n.keyCode&&!1===S.modifierPressed(n)})}},Z={setup:function(t,n){var e=[",",".",";",":","!","?"],r=[32];t.on("keydown",function(e){13!==e.keyCode||S.modifierPressed(e)||Y.handleEnter(t,n.get())},!0),t.on("keyup",function(e){Y.checkKeyCode(r,e)&&Y.handleInlineKey(t,n.get())}),t.on("keypress",function(r){Y.checkCharCode(e,r)&&D.setEditorTimeout(t,function(){Y.handleInlineKey(t,n.get())})})}};e.add("textpattern",function(t){var e=n(b(t.settings));return Z.setup(t,e),C.get(e)})}(window);