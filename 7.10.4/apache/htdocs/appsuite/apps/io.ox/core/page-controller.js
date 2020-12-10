define("io.ox/core/page-controller",[],function(){"use strict";return function(e){function o(e){var o={tag:"<div>",classes:"io-ox-pagecontroller page",container:$()};e=_.extend(o,e),c.container&&(e.container=c.container),r[e.name]={$el:$(e.tag).addClass(e.classes),navbar:e.navbar,toolbar:e.toolbar,secondaryToolbar:e.secondaryToolbar,name:e.name},t.push(e.name),r[e.name].$el.attr("data-page-id",l.options.name+"/"+e.name),$(e.container).append(r[e.name].$el),e.startPage&&s.setCurrentPage(e.name)}var n,a,r={},t=[],i=[],s=this,l={navbar:e.navbar||$(),toolbar:e.toolbar||$(),options:{name:e.appname}},c=e||{};this.showPage=function(e){e!==n&&s.setCurrentPage(e)},this.changePage=function(e,o){if(r[e]){if(e!==n){var a=_.extend({from:n,animation:_.device("smartphone")?"slideleft":"pop",disableAnimations:!1},o||{}),t=r[e].$el,s=r[a.from].$el,c=$.Deferred();if(a.animation=_.device("android")?"pop":a.animation,t.trigger("pagebeforeshow",{frompage:a.from}),s.trigger("pagebeforehide",{topage:a.to}),_.device("smartphone"))try{document.activeElement&&"body"!==document.activeElement.nodeName.toLowerCase()?$(document.activeElement).blur():$("input:focus, textarea:focus, select:focus").blur()}catch(e){}i=n,n=e;var m=$('<div class="taptrap">');return _.device("!smartphone")&&(m=$()),Modernizr.cssanimations&&!a.disableAnimations?(_.defer(function(){t.append(m).addClass("io-ox-core-animation in current "+a.animation).one("webkitAnimationEnd mozAnimationEnd animationend",function(){$(this).removeClass("io-ox-core-animation in "+a.animation),t.trigger("pageshow",{from:a.from,to:a.to}),$(this).find(".taptrap").remove(),c.resolve()}),m=null},1),_.defer(function(){s.removeClass("current").addClass("io-ox-core-animation out inmotion "+a.animation).one("webkitAnimationEnd mozAnimationEnd animationend",function(){$(this).removeClass("io-ox-core-animation out inmotion "+a.animation),s.trigger("pagehide",{from:a.from,to:a.to})})},1)):(t.addClass("current").trigger("pageshow",{from:a.from,to:a.to}),s.removeClass("current").trigger("pagehide",{from:a.from,to:a.to})),d(e),g(e),ox.ui.apps.trigger("layout",l),c}}else console.warn("target page does not exist: ",e)},this.setBackbuttonRules=function(e){a=e},this.goBack=function(e){var o=i,r=_.extend({animation:"slideright"},e||{});a&&a[n]&&(o=a[n]),this.changePage(o,r)},this.addPage=function(e){if(e)return o(e),this},this.getPage=function(e){return r[e]?r[e].$el:(console.error("PageController: Page "+e+" does not exist."),void console.error("PageController: Available pages are "+t.join()))},this.getPageObject=function(e){return r[e]?r[e]:(console.error("PageController: Page "+e+" does not exist."),void console.error("PageController: Available pages are "+t.join()))},this.getNavbar=function(e){if(r[e])return r[e].navbar;console.error("PageController: Page "+e+" does not exist.")},this.getAll=function(){return r},this.getToolbar=function(e){if(r[e])return r[e].toolbar;console.error("PageController: Page "+e+" does not exist.")},this.getSecondaryToolbar=function(e){if(r[e]){if(r[e].secondaryToolbar)return r[e].secondaryToolbar;console.error("PageController: Page "+e+" does not own a secondary toolbar.")}else console.error("PageController: Page "+e+" does not exist.")},this.getCurrentPage=function(){return r[n]},this.setCurrentPage=function(e){n&&r[n].$el.removeClass("current"),r[e].$el.addClass("current"),d(e),g(e),n=e},this.getPages=function(){return r};var d=function(e){var o=r[e].navbar,n=r[i];n&&n.navbar&&n.navbar.toggle(!1),o?(o.rendered||o.render(),l.navbar.append(o.$el),l.navbar.toggle(!0),o.toggle(!0)):(l.navbar.hide(),r[e].$el.addClass("fullscreen"))},g=function(e,o){var n;o&&r[e].secondaryToolbar?n=r[e].secondaryToolbar:r[e].toolbar&&(n=r[e].toolbar),n?(l.toolbar.children().detach(),l.toolbar.append(n.$el).show(),l.toolbar.trigger("show"),o||n.render()):l.toolbar&&(l.toolbar.children().detach(),l.toolbar.hide(),l.toolbar.trigger("hide"))};this.toggleSecondaryToolbar=g}});