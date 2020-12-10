define("io.ox/core/locale",["io.ox/core/locale/meta","settings!io.ox/core"],function(e,t){"use strict";function a(e){return r(_.extend({},D[e||g],t.get("localeData")))}function n(){return e.CLDRDefinitions[g]}function r(t){var a,n,r=_.extend({},t);return t.date&&(a=e.translateMomentToCLDR(moment.localeData().longDateFormat("LL")),_.extend(r,{dateShort:t.date||"M/d/yy",dateMedium:t.date||"M/d/yyyy",dateLong:a,dateFull:"EEEE, "+a})),t.timeLong&&(n=String(t.timeLong||"h:mm:ss a"),_.extend(r,{time:n.replace(/.ss/,""),timeLong:n})),r}function o(t){var a=e.deriveMomentLocale(t);return D[t]&&e.CLDRDefinitions[t]?(m(t),$.when()):e.loadCLDRData(t).then(function(){return D[t]?(m(t),$.when()):require(["static/3rd.party/moment/locale/"+a+".js"],function(){return require(["moment/locale/"+a],function(){i(t),m(t)})})})}function i(t){if(!D[t]){var a=e.deriveMomentLocale(t),n=moment.localeData(a),r=n.firstDayOfWeek();D[t]={timeLong:e.translateMomentToCLDR(n.longDateFormat("LTS")),date:e.translateMomentToCLDR(n.longDateFormat("L")),number:f(t),firstDayOfWeek:e.weekday.name(r),firstDayOfYear:7+r-n.firstDayOfYear()}}}function m(t){if(d=a(t),!_.isEmpty(d)){var n=e.deriveMomentLocale(t),r=e.translateCLDRToMoment(d.timeLong),o=r.replace(/.ss/,""),i=e.weekday.index(d.firstDayOfWeek),m=d.firstDayOfYear;moment.updateLocale(n,{longDateFormat:{L:e.translateCLDRToMoment(d.date),LLL:e.translateCLDRToMoment(d.date)+" "+o,LT:o,LTS:r},week:{dow:i,doy:7+i-m}}),ox.trigger("change:locale"),ox.trigger("change:locale:"+t),ox.trigger("change:locale:data")}}function l(e){g=e,u(),o(g)}function c(){m(g)}function u(){t.set("localeData",{}).save()}function s(t,a){return isNaN(t)?t:(!1===e.grouping[d.number]&&(a.useGrouping=!1),Number(t).toLocaleString(e.numberFormats[d.number],a))}function f(e){var t=(e||g).toLowerCase().replace(/_/,"-");return Number(1234.56).toLocaleString(t,{minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\u202F/," ")}var g=t.get("language","en_US"),d=t.get("localeData",{}),D={};moment.fn.formatCLDR=function(t){return n().dateTimeFormats.availableFormats[t]&&(t=e.translateCLDRToMoment(n().dateTimeFormats.availableFormats[t])),moment.prototype.format.apply(this,[t])};var L=/(G+|y+|Y+|M+|w+|W+|D+|d+|F+|E+|u+|a+|H+|k+|K+|h+|m+|s+|S+|z+|Z+|v+|V+)|\[((?:[^\[\]]|\[\])+)\]|(\[\])/g;moment.fn.formatInterval=function(a,r,o){var i=this,m=n().dateTimeFormats.intervalFormats;if(o=o||{},!(_.isEmpty(t.get("localeData",{}))||r&&"date"!==r&&"time"!==r))return r=e.translateCLDRToMoment("time"===r?d.time:d.dateShort),m.intervalFormatFallback.replace("{0}",i.format(r)).replace("{1}",a.format(r));if("time"===r&&(r=-1===n().timeFormats.short.indexOf("a")?"Hm":"hm"),r&&"date"!==r||(r="yMd"),!a||this.isSame(a))return this.formatCLDR(r);if(!m[r])return m.intervalFormatFallback.replace("{0}",i.format(r)).replace("{1}",a.format(r));var l,c=_(m[r]).keys();if(o.alwaysFullDate)l=m[r][c[c.length-1]];else{l=m[r][c[0]];for(var u=0;u<c.length&&!i.isSame(a,c[u]);u++)l=m[r][c[u]]}l=e.translateCLDRToMoment(l);var s,f={};for(L.lastIndex=0;s=L.exec(l);)if(s[1]){var g=s[1].charAt(0);if(f[g])break;f[g]=!0}return L.lastIndex?this.format(l.slice(0,s.index))+a.format(l.slice(s.index)):this.format(l)};var F={number:function(e,t,a){return s(e,{minimumFractionDigits:t||0,maximumFractionDigits:a||t||0})},currency:function(e,t){return s(e,{style:"currency",currency:t||"EUR",currencyDisplay:"symbol",minimumFractionDigits:2,maximumFractionDigits:2})},percent:function(e,t){return s(e/100,{style:"percent",minimumFractionDigits:t||0,maximumFractionDigits:t||0})},current:function(){return g},getCLDRData:n,getLocaleData:a,localeDefinitions:D,setLocaleData:function(e){t.set("localeData",void 0,{silent:!0}).set("localeData",r(e)).save()},resetLocaleData:u,getSupportedLocales:e.getSupportedLocales,getNumberFormats:function(){return _(e.numberFormats).keys()},getDefaultNumberFormat:f,getDateFormatOptions:function(){var t=moment().month(0).date(29);return e.dateFormats.map(function(a){return{label:t.format(e.translateCLDRToMoment(a)),value:a}})},getFirstDayOfWeek:function(){return moment().startOf("week").format("dddd")},deriveSupportedLanguageFromLocale:e.deriveSupportedLanguageFromLocale,meta:e};return i("en_US"),d=a(),o(g).always(function(){t.on("change:language",l),t.on("change:localeData",c)}),window.locale=F,F});