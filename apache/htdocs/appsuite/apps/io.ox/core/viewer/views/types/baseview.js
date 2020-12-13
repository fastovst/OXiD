define("io.ox/core/viewer/views/types/baseview",["io.ox/files/api","io.ox/mail/api","io.ox/core/api/attachment","io.ox/backbone/views/disposable","io.ox/core/viewer/util","io.ox/backbone/views/actions/util","io.ox/core/extensions","gettext!io.ox/core"],function(e,i,t,o,n,a,l,s){"use strict";var r={},d={};return o.extend({className:"swiper-slide scrollable focusable",attributes:{role:"option","aria-selected":"false"},createNotificationNode:function(e,i){return i=i||n.getIconClass(this.model),$('<div class="viewer-displayer-notification">').append($('<i class="fa" aria-hidden="true">').addClass(i),$('<p class="apology">').text(e||""))},displayNotification:function(e,i){var t=this.createNotificationNode(e,i);return this.$el.idle().empty().append(t),t},displayDownloadNotification:function(e,i,t){t=t||s("\n Please download the file using the button below."),e=""===e?"":e+t;var o=this.displayNotification(e,i);o.css("white-space","pre");var r=n.renderItemSize(this.model);r=0===r.indexOf("-")?"":" ("+r+")";var d=$('<button type="button" class="btn btn-primary btn-file">').text(s("Download %1$s",r)).attr("aria-label",s("Downlad")).attr("id","downloadviewerfile");o.append(d),d.on("click",{model:this.model},function(e){var i=e.data.model,t=i.isFile()?i.toJSON():i.get("origData");a.invoke(n.getRefByModelSource(i.get("source")),l.Baton({model:i,data:t}))})},getPreviewUrl:function(o){if(o=_.extend(o||{},{noSharding:!0}),this.model.get("file_options")&&(o=_.extend(o,this.model.get("file_options"))),this.model.isFile()){var n=this.model.toJSON();return o&&!_.isEmpty(o.version)&&(n.version=o.version),e.getUrl(n,"thumbnail",o)}return this.model.isMailAttachment()||this.model.isComposeAttachment()?i.getUrl(this.model.get("origData"),"view",o):this.model.isPIMAttachment()?t.getUrl(this.model.get("origData"),"view",o):this.model.isEncrypted()?this.model.get("guardUrl"):null},isVisible:function(){return this.$el.hasClass("swiper-slide-active")},getInitialZoomLevel:function(e){return r[e]},setInitialZoomLevel:function(e,i){_.isNumber(i)&&(r[e]=i)},removeInitialZoomLevel:function(e){e in r&&delete r[e]},getInitialScrollPosition:function(e){return d[e]},setInitialScrollPosition:function(e,i){_.isNumber(i)&&(d[e]=i)},removeInitialScrollPosition:function(e){e in d&&delete d[e]}})});