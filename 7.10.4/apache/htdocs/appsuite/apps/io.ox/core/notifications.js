define("io.ox/core/notifications",["io.ox/core/extensions","io.ox/backbone/mini-views/dropdown","io.ox/core/yell","io.ox/core/desktopNotifications","io.ox/core/capabilities","settings!io.ox/core","gettext!io.ox/core","io.ox/core/a11y"],function(e,t,o,i,n,s,d,a){"use strict";var r=Backbone.Model.extend({defaults:{subviews:{},sidepopup:null,markedForRedraw:{},count:0}});return new(Backbone.View.extend({tagName:"a",className:"dropdown-toggle",initialize:function(){var e=this;this.$el.attr("role","menu"),this.$el.attr({"data-toggle":"dropdown",href:"#"}).append($('<span class="badge" aria-hidden="true">').append($('<span class="number">'))),this.listNode=$('<ul href="#" id="io-ox-notifications-display" class="dropdown-menu dropdown-menu-right">').on("focus","*",this.focusHover.bind(this)).on("keydown",this.onKeydown.bind(this)).on("click blur focusout",this.keepOpen),this.dropdown=new t({tagName:"li",attributes:{role:"presentation"},id:"io-ox-notifications-icon",className:"launcher dropdown notifications-icon",$ul:this.listNode,$toggle:this.$el,smart:!1,dontProcessOnMobile:!0}),this.dropdown.$el.on("hidden.bs.dropdown",function(){e.closeSidepopup(),0===e.model.get("count")&&$("#io-ox-launcher .launcher-btn").focus()}),this.sidepopupNode=$('<div id="io-ox-notifications-sidepopup">'),this.delayedRender=_.debounce(this.render,100),this.model.on("change:count",_(this.onChangeCount).bind(this)),this.onChangeCount()},keepOpen:function(e){e.preventDefault(),e.stopPropagation()},registerSubview:function(e){var t=this.model.get("subviews"),o=this;return t[e.model.get("id")]||(t[e.model.get("id")]=e,this.model.get("markedForRedraw")[e.model.get("id")]=!0,e.collection.on("add reset remove",function(e){e.subviewId||(e=e.collection),o.model.set("count",_(t).reduce(function(e,t){return e+t.collection.length},0)),o.model.get("markedForRedraw")[e.subviewId]=!0,o.delayedRender()}),e.on("responsive-remove",function(){var e=_(t).reduce(function(e,t){return e+t.collection.length},0),i=Math.min(e,99),n=parseInt(o.$el.find(".number").text(),10);if(o.model.set("count",e),i!==n)return 0===e?o.render():void o.$el.attr("title",d.format(d.ngettext("%1$d notification.","%1$d notifications.",e),e)).find(".number").text(i+(e>100?"+":""))}),e.on("autoopen",_.bind(function(){o.render(),o.dropdown.open()},o)),o.delayedRender()),e},render:function(){var e=this,t=this.model.get("subviews"),o=Math.min(this.model.get("count"),99),i=this.model.get("markedForRedraw");return this.$el.attr("title",d.format(d.ngettext("%1$d notification.","%1$d notifications.",this.model.get("count")),this.model.get("count"))).find(".number").text(o+(this.model.get("count")>100?"+":"")),this.model.set("markedForRedraw",{}),e.listNode.find(".no-news-message,.notification-area-header,.desktop-notification-info").remove(),_(i).each(function(o,i){o&&t[i].render(e.listNode)}),e.listNode.css({"max-height":_.device("smartphone")?"none":$("#io-ox-screens").height()-5}),0===this.listNode.children(".notifications").length?this.listNode.prepend($("<div class=notification-area-header>").append($('<h1 class="section-title no-news-message">').text(d("No notifications")),$('<button type="button" class="btn btn-link clear-area-button fa fa-times">').attr("aria-label",d("Close notification area")).on("click",_(e.dropdown.close).bind(e.dropdown)))):this.listNode.prepend($("<div class=notification-area-header>").append($('<h1 class="notification-area-title">').text(d("Notifications")),$('<button type="button" class="btn btn-link clear-area-button fa fa-times">').attr("aria-label",d("Close notification area")).on("click",_(e.dropdown.close).bind(e.dropdown)),$('<button type="button" class="btn btn-link hide-area-button">').text(d("Notify me again later")).on("click",_(e.hideAll).bind(e)))),this.drawNotificationInfo(),this},onChangeCount:function(){this.$el.toggle(0!==this.model.get("count")),0===this.model.get("count")&&this.dropdown.close()},drawNotificationInfo:function(){if("default"===i.getPermissionStatus()&&!1!==s.get("showDesktopNotifications",!0)&&!this.handledNotificationInfo){var e=this,t=$("<div>").text(d("Would you like to enable desktop notifications?")),o=$('<button type="button" class="later-button btn btn-warning">').text(d("Later")).on("click",function(e){e.stopPropagation(),r()}),n=$('<button type="button" class="disable-button btn btn-danger">').text(d("Never")).on("click",function(e){s.set("showDesktopNotifications",!1).save(),e.stopPropagation(),r()}),a=$('<button type="button" class="enable-button btn btn-success">').text(d("Decide now")).on("click",function(e){e.stopPropagation(),i.requestPermission(function(e){"granted"===e?s.set("showDesktopNotifications",!0).save():"denied"===e&&s.set("showDesktopNotifications",!1).save()}),r()}),r=function(){t.text(d("You can manage desktop notifications at any time, by visiting your settings")).on("click",function(){var e={id:"io.ox/core"};ox.launch("io.ox/settings/main",e).done(function(){this.setSettingsPane(e)})}),c.addClass("clickable"),o.remove(),a.remove(),n.remove(),e.dropdown.$el.one("hidden.bs.dropdown",function(){c.remove()})},c=$('<div class="desktop-notification-info clearfix">').append(t,$('<div class="button-wrapper">').append(a,n,o));this.listNode.prepend(c)}},openSidepopup:function(e,t,o,i){var n=this,s=function(){require(["io.ox/core/tk/dialogs"],function(s){n.sidepopupNode.attr("data-cid",e).appendTo(_.device("smartphone")?"body":"#io-ox-windowmanager-pane"),n.dropdown.forceOpen(!0);var d=$.Event("click",{target:n.sidepopupNode.empty()}),a=new s.SidePopup({arrow:!1,side:"left",focus:!1}).setTarget(n.sidepopupNode.empty()).show(d,function(e){var n=e.closest(".io-ox-sidepopup");_.device("smartphone")||n.css({right:"585px"}),n.addClass("io-ox-notifications-sidepopup first");var s=function(o){if(o=o&&o.get?o.attributes:o,t.View){var n=new t.View({data:o},i);e.idle().append(n.render().expand().$el.addClass("no-padding"))}else e.idle().append(t.draw({data:o},i).addClass("no-padding"));return o};o.then?(e.busy(),o.then(s)):s(o)});n.model.set("sidepopup",a),a.on("close",$.proxy(n.onCloseSidepopup,n))})};n.model.get("sidepopup")&&n.sidepopupIsClosing?n.model.get("sidepopup").one("close",s):s()},onKeydown:function(e){var t=[],o=null;switch(e.which){case 37:case 38:t=this.listNode.find(".item"),o=$(e.target).closest(".item",this.listNode);var i=t.length-1;o.length&&(i=(_(t).indexOf(o[0])-1+t.length)%t.length),t[i].focus();break;case 39:case 40:t=this.listNode.find(".item");var n=0;(o=$(e.target).closest(".item",this.listNode)).length&&(n=(_(t).indexOf(o[0])+1)%t.length),t[n].focus();break;case 9:t=a.getTabbable(this.listNode),e.shiftKey&&t[0]===e.target&&(e.preventDefault(),t[t.length-1].focus()),!e.shiftKey&&t.length&&t[t.length-1]===e.target&&(e.preventDefault(),t[0].focus())}t=null},focusHover:function(e){this.listNode.find(".item").removeClass("has-focus"),$(e.target).closest(".item",this.listNode).addClass("has-focus")},onCloseSidepopup:function(){this.dropdown.forceOpen(!1),this.sidepopupIsClosing=!1,this.listNode.find(".item:visible")&&(this.listNode.find(".item.has-focus")?this.listNode.find(".item.has-focus").focus():this.sidepopupNode.attr("data-cid")&&this.listNode.find('.item:visible[data-cid="'+this.sidepopupNode.attr("data-cid")+'"]')?this.listNode.find('.item[data-cid="'+this.sidepopupNode.attr("data-cid")+'"]').focus():this.listNode.find(".item").first().focus());var e=this,t=this.model.get("sidepopup");t&&(t.off("close"),e.sidepopupNode.attr("data-cid",null).detach()),this.model.set("sidepopup",null)},hideAll:function(){_(this.model.get("subviews")).each(function(e){e.hideAll(s.get("notificationsHidingTimer",18e5))})},closeSidepopup:function(){this.model.get("sidepopup")&&(this.sidepopupIsClosing=!0,this.model.get("sidepopup").close())},attach:function(t,o){var i=this;return this.drawNotificationInfo(),setTimeout(function(){ox.manifests.loadPluginsFor("io.ox/core/notifications").done(function(){e.point("io.ox/core/notifications/register").invoke("register",i,i)}),i.listNode.css({top:i.listNode.css("top")+$("#io-ox-appcontrol")[0].offsetTop,left:i.listNode.css("left")+window.outerWidth-$("#io-ox-appcontrol").outerWidth()})},o||5e3),this.render(),this.dropdown.render().$el},yell:o}))({model:new r})});