define("plugins/portal/calendar/register",["io.ox/core/extensions","io.ox/calendar/api","io.ox/core/folder/api","io.ox/calendar/util","gettext!plugins/portal","settings!io.ox/calendar","less!io.ox/calendar/style"],function(e,t,n,i,a,o){"use strict";function l(){return{start:moment().startOf("day").valueOf(),end:moment().startOf("day").add(1,"month").valueOf()}}function s(e){require(["io.ox/portal/main"],function(t){e.collection.expired=!0,t.getApp().refreshWidget(e.model,0)})}var r=Backbone.View.extend({tagName:"ul",className:"content list-unstyled",initialize:function(){this.listenTo(this.collection,"add remove change",this.render)},render:function(){var e=_.device("smartphone")?5:10;return this.$el.empty(),this.collection.chain().filter(function(e){return e.getTimestamp("endDate")>_.now()}).first(e).each(function(e){var t="DECLINED"===i.getConfirmationStatus(e);if(!t||o.get("showDeclinedAppointments",!1)){var n=e.getMoment("startDate").tz(moment().tz()),l=e.getMoment("endDate").tz(moment().tz()),s=n.calendar(null,{sameDay:"["+a("Today")+"]",nextDay:"["+a("Tomorrow")+"]",nextWeek:"dddd",sameElse:"L"}),r=n.format("LT"),c=l.format("LT"),d=i.isAllday(e);this.$el.append($('<li class="item" tabindex="0">').addClass(t?"declined":"").data("item",e).append($('<div class="clearfix">').append($('<div class="pull-right">').text(s),$('<div class="bold ellipsis summary">').text(e.get("summary")||"")),$('<div class="clearfix second-row">').css("margin-top","-2px").append($('<div class="accent pull-right">').text(d?a("All day"):r+" - "+c),$('<div class="gray ellipsis location">').text(e.get("location")||""))))}},this).value(),this}});e.point("io.ox/portal/widget/calendar").extend({title:a("Appointments"),initialize:function(e){e.collection=t.getCollection(l()),t.on("create",function(){require(["io.ox/portal/main"],function(t){var n=t.getApp(),i=n.getWidgetCollection()._byId[e.model.id];i&&n.refreshWidget(i,0)}),t.on("refresh.all update create delete move",s(e))})},load:function(e){var t=new $.Deferred;return e.collection.sync(),e.collection.once("load",function(){t.resolve(),this.off("load:fail")}).once("load:fail",function(e){t.reject(e),this.off("load")}),t},summary:function(e){if(!this.find(".summary").length){this.addClass("with-summary show-summary");var t=$("<div>").addClass("summary"),n=e.collection&&e.collection.first();n?(i.getEvenSmarterDate(n,!0),t.append($('<span class="normal accent">').text(i.getEvenSmarterDate(n,!0)),$.txt(" "),$('<span class="bold">').text(n.get("summary")||""),$.txt(" "),$('<span class="gray">').text(n.get("location")||"")),this.on("tap","h2",function(e){$(e.delegateTarget).toggleClass("show-summary")})):t.text(a("You don't have any appointments in the near future.")),this.append(t)}},preview:function(e){0===e.collection.filter(function(e){return e.getTimestamp("endDate")>_.now()}).length?this.append($('<ul class="content list-unstyled">').append($('<li class="line">').text(a("You don't have any appointments in the near future.")))):this.append(new r({collection:e.collection}).render().$el)},draw:function(e){var n=this.busy();require(["io.ox/calendar/view-detail"],function(i){t.get(e.item).then(function(e){n.idle().append(i.draw(e.toJSON(),{deeplink:!0}))},function(e){n.close(),require(["io.ox/core/yell"],function(t){t(e)})})})},post:function(e){var n=this;t.on("refresh.all",function(){e.load().done(_.bind(e.draw,n))})}}),e.point("io.ox/portal/widget/calendar/settings").extend({title:a("Appointments"),type:"calendar",editable:!1,unique:!0})});