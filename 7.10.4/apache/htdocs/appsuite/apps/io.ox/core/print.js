define("io.ox/core/print",["io.ox/core/http","io.ox/core/notifications","gettext!io.ox/core"],function(t,e,n){"use strict";function i(t){return(t||"").replace(/[#%&§/$*!`´'"=:@+^\\.+?{}|]/g,"_")}function o(t,e){var o="print_"+_.now();return window[o]=function(o){try{var r=t.selector||"script",a=$(o.body).find('[type="text/template"]').filter(r).html(),s=(t.title||"").trim();$(o.body).html('<div class="print-wrapper">'+$.trim(_.template(a)(e))+"</div>"),t.meta.classes&&$(o.body).addClass(t.meta.classes),o.title=i(ox.serverConfig.pageTitle||"")+i(s.length?" "+s:"")+" "+n("Printout")}catch(t){console.error(t)}},o}function r(){for(var t in s)s[t]&&s[t].closed&&(delete s[t],delete window[t])}var a={mail:"super-mail-template.tmpl",contacts:"super-contacts-template.tmpl",tasks:"super-tasks-template.tmpl"},s={},l={request:function(t,e){function i(){require([t]).then(function(n){_.isFunction(n.open)?n.open(e,o):console.error('Missing function "open" in:',t,n)},function(){console.error("Failed to load print manager")})}var o;return _.device("desktop")?(o=this.openURL(ox.base+"/busy.html"),i()):ox.load(["io.ox/backbone/views/modal"]).done(function(t){var e=$('<iframe frameborder="0" style="width:100%;height:100%;">').attr("src",ox.base+"/busy.html"),r=.9*window.innerHeight;new t({title:n("Print"),width:.9*window.innerWidth,height:r}).addCancelButton().addButton({label:n("Print"),action:"print"}).build(function(){r-=100,this.$body.css({height:r,maxHeight:r}).append(e)}).on("print",function(){o.print()}).open(),o=e[0].contentWindow,i()}),o},smart:function(i){(i=_.extend({get:$.noop,selection:[],i18n:{},file:ox.base+"/print.html",meta:{}},i)).selection=_.chain(i.selection).toArray().compact(),t.pause(),$.when.apply($,_.chain(i.selection).map(function(t){return _.isString(t)?t:_.cid(t)}).uniq().map(function(t,e){return i.get(_.cid(t)).then(function(t){return i.process?i.process(t,e,i):t})}).value()).done(function(){var t=_.chain(arguments).toArray(),e=t.value().length;i.filter&&(t=t.filter(i.filter)),i.sortBy&&(t=t.sortBy(i.sortBy)),t=t.value();var n=o(i,{data:t,i18n:i.i18n,meta:i.meta,length:t.length,filtered:e-t.length}),a=i.file+"?"+n;_.defer(function(){i.window?(i.window.location=a,s[n]=i.window):s[n]=l.openURL(a),r()})}).fail(function(){i.window&&i.window.close(),e.yell({type:"error",headline:n("Error"),message:n.ngettext("Cannot print this item","Cannot print these items",i.selection.length)})}),t.resume()},getWindowOptions:function(){var t={width:750,height:Math.min(screen.availHeight-100,1050),top:40};return t.left=(screen.availWidth-t.width)/2>>0,t.string="width="+t.width+",height="+t.height+",left="+t.left+",top="+t.top+",menubar=no,toolbar=no,location=no,scrollbars=yes,status=no",t},getWindow:function(t){var e="print_"+_.now(),n=this.getWindowOptions(t);return window.open(t,e,n.string)},open:function(t,e,n){var i,o={action:"get"};return"printCalendar"===t&&delete o.action,_.isArray(e)?o.data=JSON.stringify(e):_.isObject(e)&&(o.folder=e.folder_id||e.folder,o.id=e.id),o.format="template",o.template=a[t]||"default.tmpl",o.session=ox.session,i=ox.apiRoot+"/"+t+"?"+$.param(_.extend(o,n)),this.getWindow(i)},openURL:function(t){return this.getWindow(t||ox.base+"/blank.html")},interim:function(t){return console.warn("Temporary solution; replace by open()",t),this.openURL(t)}};return l});