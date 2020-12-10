!function(){"use strict";var e=function(t){var n=t,i=function(){return n};return{get:i,set:function(e){n=e},clone:function(){return e(i())}}},t=tinymce.util.Tools.resolve("tinymce.PluginManager"),n=tinymce.util.Tools.resolve("tinymce.Env"),i=tinymce.util.Tools.resolve("tinymce.util.Delay"),o={getAutoResizeMinHeight:function(e){return parseInt(e.getParam("autoresize_min_height",e.getElement().offsetHeight),10)},getAutoResizeMaxHeight:function(e){return parseInt(e.getParam("autoresize_max_height",0),10)},getAutoResizeOverflowPadding:function(e){return e.getParam("autoresize_overflow_padding",1)},getAutoResizeBottomMargin:function(e){return e.getParam("autoresize_bottom_margin",50)},shouldAutoResizeOnInit:function(e){return e.getParam("autoresize_on_init",!0)}},r=function(e){return e.plugins.fullscreen&&e.plugins.fullscreen.isFullscreen()},u=function(e,t,n,o,r){i.setEditorTimeout(e,function(){g(e,t),n--?u(e,t,n,o,r):r&&r()},o)},s=function(e,t){var n=e.getBody();n&&(n.style.overflowY=t?"":"hidden",t||(n.scrollTop=0))},g=function(e,t){var i,u,a,l,c,f,d,m,h,p,y,z=e.dom;if(u=e.getDoc())if(r(e))s(e,!0);else{a=u.body,l=o.getAutoResizeMinHeight(e),f=z.getStyle(a,"margin-top",!0),d=z.getStyle(a,"margin-bottom",!0),m=z.getStyle(a,"padding-top",!0),h=z.getStyle(a,"padding-bottom",!0),p=z.getStyle(a,"border-top-width",!0),y=z.getStyle(a,"border-bottom-width",!0),c=a.offsetHeight+parseInt(f,10)+parseInt(d,10)+parseInt(m,10)+parseInt(h,10)+parseInt(p,10)+parseInt(y,10),(isNaN(c)||c<=0)&&(c=n.ie?a.scrollHeight:n.webkit&&0===a.clientHeight?0:a.offsetHeight),c>o.getAutoResizeMinHeight(e)&&(l=c);var v=o.getAutoResizeMaxHeight(e);v&&c>v?(l=v,s(e,!0)):s(e,!1),l!==t.get()&&(i=l-t.get(),z.setStyle(e.iframeElement,"height",l+"px"),t.set(l),n.webkit&&i<0&&g(e,t))}},a={setup:function(e,t){e.on("init",function(){var t,n,i=e.dom;t=o.getAutoResizeOverflowPadding(e),n=o.getAutoResizeBottomMargin(e),!1!==t&&i.setStyles(e.getBody(),{paddingLeft:t,paddingRight:t}),!1!==n&&i.setStyles(e.getBody(),{paddingBottom:n})}),e.on("nodechange setcontent keyup FullscreenStateChanged",function(n){g(e,t)}),o.shouldAutoResizeOnInit(e)&&e.on("init",function(){u(e,t,20,100,function(){u(e,t,5,1e3)})})},resize:g},l={register:function(e,t){e.addCommand("mceAutoResize",function(){a.resize(e,t)})}};t.add("autoresize",function(t){if(!t.inline){var n=e(0);l.register(t,n),a.setup(t,n)}})}();