define("plugins/upsell/simple-wizard/register",["io.ox/core/extensions","io.ox/core/upsell","settings!io.ox/mail","settings!plugins/upsell/simple-wizard","gettext!plugins/upsell/simple-wizard"],function(e,t,i,o,n){"use strict";var s=null,r={getVariables:function(e){return e=e||{},{context_id:ox.context_id,hostname:location.hostname,id:e.id||"",imap_login:"",language:ox.language,mail:i.get("defaultaddress",""),missing:e.missing||"",session:ox.session,type:e.type||"",user:ox.user,user_id:ox.user_id,user_login:""}},getURLTemplate:function(){return console.warn('Deprecated. Just use "wizard.settings.url" directly'),r.settings.url},getURL:function(e,t){var i=r.getVariables(e);return t=String(t||r.settings.url).replace(/\$(\w+)/g,function(e,t){return(t=String(t).toLowerCase())in i?encodeURIComponent(i[t]):"$"+t})},getIFrame:function(){return $('<iframe src="blank.html" allowtransparency="true" border="0" frameborder="0" framespacing="0">')},addControls:function(){!0===r.settings.closeButton&&this.addButton("cancel",n("Close"))},getPopup:function(){return s},setSrc:function(e){s&&s.getContentNode().idle().find("iframe").attr("src",e)},settings:_.extend({closeButton:!0,zeroPadding:!0,width:750,height:390,overlayOpacity:.5,overlayColor:"#000",url:"blank.html?user=$user,user_id=$user_id,context_id=$context_id,language=$language,type=$type,id=$id,missing=$missing,hostname=$hostname#session=$session"},o.get()),open:function(e){if(!s){var t=_.deepClone(r.settings);ox.trigger("upsell:simple-wizard:init",r.getVariables(e),t),require(["io.ox/core/tk/dialogs"],function(i){(s=new i.ModalDialog({width:t.width}).build(function(){t.zeroPadding&&this.getPopup().addClass("zero-padding"),this.getContentNode().busy().css({maxHeight:t.height+"px",overflow:"hidden"}).append(r.getIFrame().css({width:"100%",height:t.height+"px"})),r.addControls.call(this)}).setUnderlayStyle({opacity:0,backgroundColor:t.overlayColor}).topmost().on("beforeshow",function(){ox.trigger("upsell:simple-wizard:show:before",this)}).on("show",function(){ox.off("upsell:requires-upgrade",r.open),this.setUnderlayStyle({opacity:t.overlayOpacity});var i=this;setTimeout(function(){r.setSrc(r.getURL(e,t.url)),ox.trigger("upsell:simple-wizard:show",i)},250)}).on("close",function(){ox.on("upsell:requires-upgrade",r.open),ox.trigger("upsell:simple-wizard:close",this),s=null})).show()})}},close:function(){s&&s.close()},enable:function(){ox.on("upsell:requires-upgrade",r.open)},disable:function(){ox.off("upsell:requires-upgrade",r.open)}};return r.enable(),r});