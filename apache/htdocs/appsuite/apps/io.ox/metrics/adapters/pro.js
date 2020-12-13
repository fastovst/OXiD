define("io.ox/metrics/adapters/pro",["settings!io.ox/core","io.ox/core/extensions","io.ox/metrics/util"],function(t,n,e){"use strict";if(t.get("tracking/piwikpro/enabled",!1)){var i=n.point("io.ox/metrics/adapter"),a=t.get("tracking/piwikpro/url/lib");window._paq=window._paq||[],a||console.log("Error: Piwik Pro is enabled but no backend URL was configured!");var o;i.extend(o={id:"piwik-pro",setup:function(){this.consents=void 0,o.track(["setUserId",this.getUserHash()]),require([a],function(){o.getConsents(),$("body").on("click",".ppms_cm_centered_buttons button",function(){_.delay(o.getConsents,1e3)})})},getConsents:function(){function t(t){o.consents=t.consents||t||{},o.consents.analytics&&1===o.consents.analytics.status&&(o.enabled=!0)}window.ppms.cm.api("getComplianceSettings",t,t)},track:function(t){o.enabled&&window._paq.push(t)},trackVisit:function(t){var n=this,i=[];_.each(t,function(t){var n=String(t.value);if(!_.isArray(t.value)||n.length<=200)return i.push(t);var a=e.toChunks(t.value,200);_.each(a,function(n,e){i.push(_.extend({},t,{value:n,id:t.id+"-"+(e+1)}))})}),_.each(i,function(t,e){n.trackVariable(_.extend(t,{index:e+1}))})},trackEvent:function(t){var n=t.data;o.track(["trackEvent",n.app,t.id||n.target,n.action,n.detail||n.value])},trackPage:function(t){o.track(["trackPageView",t.data.trackingId||t.data.name||t.data.id])},trackVariable:function(t){t.index?o.track(["setCustomVariable",t.index,t.id,String(t.value),t.scope||"visit"]):ox.debug&&console.log("Missing/invalid index argument on trackVariable call")}})}});