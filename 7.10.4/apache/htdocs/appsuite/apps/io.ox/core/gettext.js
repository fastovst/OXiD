define("io.ox/core/gettext",function(){"use strict";function t(t,n){e(t)||$(n).closest(".noI18n").length||(console.error(r(t)?"Double translated string":"Untranslated string",t,encodeURIComponent(t),n),$(n).css("backgroundColor","rgba(255, 192, 0, 0.5)"))}function n(t){return"​"+t+"‌"}function e(t){return/^(\u200b[^\u200b\u200c]*\u200c|\s*)$/.test(t)}function r(t){return/^\u200b\u200b.+\u200c\u200c$/.test(t)}function o(t,r){function o(t){var e=u(t)||t;return e=_.url.hash("debug-i18n")?n(e):e,s(e,arguments,1)}function u(n){return assert(i,"Early gettext call: "+JSON.stringify(n)+". This string cannot be replaced by custom translations."),n in a["*"]?a["*"][n]:t in a&&n in a[t]?a[t][n]:r.dictionary[n]}function c(t,n){return s(u(t?t+"\0"+n:n)||n,arguments,2)}function l(t,n,e,o){var a,i=u((t?t+"\0":"")+n+""+e);return a=i?i[Number(r.plural(Number(o)))]:1!==Number(o)?e:n,s(a,arguments,4)}function s(t,n,e){return(n=Array.prototype.slice.call(n,e||0)).length?_.printf(t,n):t}return r.plural=new Function("n","return "+r.plural+";"),_.url.hash("debug-i18n")?(o.format=function(t,r){for(var o=_.isArray(r)?[t].concat(r):Array.prototype.slice.call(arguments),a=0;a<o.length;a++){var i=String(o[a]);e(i)?i=i.slice(1,-1):(console.error("Untranslated printf parameter",a,i),console.trace()),o[a]=i}return n(_.printf.apply(this,o))},o.noI18n=n,o.pgettext=_.compose(n,c),o.npgettext=_.compose(n,l)):(o.format=_.printf,o.noI18n=_.identity,o.pgettext=c,o.npgettext=l),o.gettext=function(){return o.apply(null,arguments)},o.ngettext=function(){var t=Array.prototype.concat.apply([""],arguments);return l.apply(null,t)},o.ngettextf=function(){var t=this.ngettext.apply(this,arguments);return this.format(t,arguments[2])},o.getDictionary=function(){return r.dictionary},o}var a={"*":{}},i=ox.signin,u=$.Deferred();if(i&&u.resolve(),_.url.hash("debug-i18n"))try{$(document).on("DOMAttrModified",function(n){n.originalEvent.attrName in{title:1,value:1}&&t(n.originalEvent.newValue,n.target)}).on("DOMCharacterDataModified",function(n){t(n.originalEvent.newValue,n.target)}).on("DOMNodeInserted",function(n){function e(n){3===n.nodeType?t(n.data,n.parentNode):1===n.nodeType&&_.each(n.childNodes,e)}n.target.tagName in{SCRIPT:1,STYLE:1}||e(n.target)})}catch(t){console.error(t)}var c=new $.Deferred;return o.setLanguage=function(t){o.setLanguage=function(n){if(n!==t)throw new Error("Multiple setLanguage calls")},c.resolve(t)},o.language=c.promise(),o.addTranslation=function(t,n,e){return a[t]||(a[t]={}),_.isString(n)?a[t][n]=e:_(n).each(function(n,e){a[t][e]=n}),this},o.enable=function(){i=!0,u.resolve()},o.enabled=u.promise(),o});