define("io.ox/core/api/tab",["io.ox/core/boot/util","io.ox/core/tab/handling","io.ox/core/tab/session","io.ox/core/tab/communication"],function(n,e,t,o){"use strict";function a(){_.extend(ox,{tabHandlingEnabled:!0}),e.parentName&&(_.extend(ox,{openedInBrowserTab:!0}),document.documentElement.classList.add("child-tab")),o.setWindowNameObject(e.getWindowNameObject()),i(),_.extend(d,r),c=n.checkTabHandlingSupport,u=!0}function i(){window.addEventListener("beforeunload",function(){o.clearStorage(o.DEFAULT_STORAGE_KEYS.SESSION),o.clearStorage(o.DEFAULT_STORAGE_KEYS.COMMUNICATION),e.removeFromWindowList(e.windowName)}),ox.on("beforeunload",function(n){o.events.trigger("beforeunload",n)})}var r,c,u=!1,d={},l=["openBlank"];return r={LOGGING_OUT_STATE:e.LOGGING_OUT_STATE,WINDOW_TYPE:e.WINDOW_TYPE,openChildTab:function(n,t){return e.openChild(n,t)},openParentTab:function(n,t){e.openParent(n,t)},openNewTab:function(n,t){return e.openTab(n,t)},openBlank:function(n){var e;return _.device("noopener")||_.browser.edgechromium>=77?((e=window.open("","_blank")).opener=null,e.location=n):e=blankshield.open(n,"_blank"),e},disable:function(){for(var e in r){if(_.contains(l,e))return;Object.prototype.hasOwnProperty.call(r,e)&&(r[e]=$.noop)}ox.tabHandlingEnabled=!1,n.checkTabHandlingSupport=function(){return!1}},enable:function(){u||a(),_.extend(r,d),ox.tabHandlingEnabled=!0,n.checkTabHandlingSupport=c},createUrl:function(n,t){return e.createURL(n,t)},getWindowName:function(){return e.windowName},getParentWindowName:function(){return e.parentName},getLoggingOutState:function(){return e.getLoggingOutState()},setLoggingOutState:function(n){e.setLoggingOutState(n)},isParentTab:function(){return e.isParent()},getWindowList:function(){return e.getWindowList()},communicationEvents:o.events,DEFAULT_STORAGE_KEYS:o.DEFAULT_STORAGE_KEYS,propagate:function(n,e){o.propagate(n,e)},otherTabsLiving:function(){return o.otherTabsLiving()},updateOxObject:function(n){return o.updateOxObject(n)},sessionEvents:t.events,login:function(){return t.login()}},r.TabHandling={createURL:function(){ox.debug&&console.warn("Deprecated: switch to new tab API."),r.createUrl.apply(this,arguments)}},r});