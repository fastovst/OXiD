define("io.ox/core/tab/communication",["io.ox/core/boot/util"],function(e){"use strict";function t(){window.addEventListener("storage",function(e){if(e.key){var t,a=e.newValue||JSON.stringify({});if("modernizr"!==a){try{t=JSON.parse(a)||{}}catch(e){t={},ox.debug&&console.warn("TabCommunication.initListener",e)}if(t.propagate&&!(t.targetWindow&&t.targetWindow!==i.windowName||t.exceptWindow&&t.exceptWindow===i.windowName)){switch(e.key){case o.DEFAULT_STORAGE_KEYS.COMMUNICATION:o.handleListener(t);break;case o.DEFAULT_STORAGE_KEYS.SESSION:require(["io.ox/core/tab/session"]).done(function(e){e.handleListener(t)})}return"get-active-windows"===t.propagate?o.getActiveWindows(t.exceptWindow):"update-ox-object"===t.propagate?o.updateOxObject(t.parameters):void o.events.trigger(t.propagate,t.parameters)}}}})}var o,a=!1,i={};return o={events:_.extend({},Backbone.Events),DEFAULT_STORAGE_KEYS:{COMMUNICATION:"appsuite.window-communication",SESSION:"appsuite.session-management"},propagate:function(e,t){var o,a,n=(t=t||{}).storageKey||this.DEFAULT_STORAGE_KEYS.COMMUNICATION,r=_.omit(t,"targetWindow","exceptWindow","storageKey");t.exceptWindow||t.targetWindow||(t.exceptWindow=i.windowName,a=!0);try{o=JSON.stringify({propagate:e,parameters:r,date:Date.now(),exceptWindow:t.exceptWindow,targetWindow:t.targetWindow})}catch(e){o=JSON.stringify({}),ox.debug&&console.warn("TabCommunication.propagate",e)}localStorage.setItem(n,o),this.clearStorage(n),a&&this.events.trigger(e,r)},clearStorage:function(e){try{localStorage.removeItem(e)}catch(e){ox.debug&&console.warn("TabCommunication.clearStorage",e)}},otherTabsLiving:function(){require("io.ox/core/api/tab").propagate("get-active-windows",{exceptWindow:i.windowName});var e=$.Deferred(),t=setTimeout(function(){e.reject()},100);return this.events.listenToOnce(this.events,"propagate-active-window",e.resolve),e.done(function(){window.clearTimeout(t)})},updateOxObject:function(e){return!!e&&(_.extend(ox,e),!0)},getActiveWindows:function(e){ox.session&&require("io.ox/core/api/tab").propagate("propagate-active-window",{targetWindow:e,windowName:i.windowName})},setWindowNameObject:function(e){_.extend(i,e)},handleListener:function(e){switch(e.propagate){case"show-in-drive":ox.load(["io.ox/files/actions/show-in-drive"]).done(function(t){t(e.parameters)});break;case"get-active-windows":o.getActiveWindows(e.exceptWindow);break;case"update-ox-object":o.updateOxObject(e.parameters);break;case"office-settings-changed":ox.trigger("change:settings:office",e.parameters);break;default:o.events.trigger(e.propagate,e.parameters)}}},e.checkTabHandlingSupport()&&!a&&Modernizr.localstorage&&(t(),a=!0),o});