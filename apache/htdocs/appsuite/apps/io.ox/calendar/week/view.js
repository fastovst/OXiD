define("io.ox/calendar/week/view",["io.ox/core/extensions","io.ox/calendar/perspective","io.ox/calendar/util","io.ox/core/util","io.ox/calendar/api","io.ox/core/folder/api","gettext!io.ox/calendar","settings!io.ox/calendar","settings!io.ox/core","io.ox/backbone/mini-views/dropdown","io.ox/core/capabilities","io.ox/core/print","io.ox/backbone/views/disposable","io.ox/calendar/extensions","io.ox/calendar/week/extensions","less!io.ox/calendar/week/style"],function(e,t,i,n,a,o,s,r,d,l,m,h,c){"use strict";var p=c.extend({constructor:function(e){this.opt=_.extend({},this.options||{},e),Backbone.View.prototype.constructor.call(this,e)},mouseDragHelper:function(e){function t(){o=!1,i.undelegate("mousemove"+a),i.undelegate("focusout"+a),$(document).off("mouseup"+a),e.clear&&e.clear.call(i)}var i=this,n=e.event,a=_.uniqueId(".drag-"),o=!0;1===n.which&&(e.start.call(this,e.event),this.delegate("mousemove"+a,e.updateContext,_.throttle(function(t){1===t.which&&o&&e.update.call(i,t)},100)),e.clear&&this.delegate("focusout"+a,t),$(document).on("mouseup"+a,function(n){t(),e.end.call(i,n)}))}}),g=p.extend({className:"header",attributes:{role:"toolbar"},events:{"click .control.next, .control.prev":"onClickControl","click .merge-split":"onMergeSplit"},initialize:function(){this.listenTo(this.model,"change:startDate",this.update),_.device("smartphone")||this.listenTo(this.opt.app.props,"change:showMiniCalendar change:folderview",this.onToggleDatepicker),"day"===this.model.get("mode")&&this.listenTo(this.model,"change:mergeView",this.updateMergeview),this.monthText=$("<span>"),this.cw=$('<span class="cw">')},update:function(){var e=this.model.get("startDate");if(this.model.get("numColumns")>1){var t=moment(e).add(this.model.get("numColumns")-1,"days"),i=e.format("MMMM"),n=t.format("MMMM"),a=e.format("YYYY"),o=t.format("YYYY");i===n?this.monthText.text(e.formatCLDR("yMMMM")):a===o?this.monthText.text(s("%1$s - %2$s %3$s",i,n,a)):this.monthText.text(s("%1$s %2$s - %3$s %4$s",i,a,n,o))}else this.monthText.text(e.format("ddd, l"));this.cw.text(s("CW %1$d",e.format("w"))),_.device("smartphone")&&this.opt.app.pages.getNavbar("week:day").setTitle(this.model.get("numColumns")>1?e.formatInterval(moment(e).add(this.model.get("numColumns"),"days")):e.format("ddd, l"))},render:function(){var e=this,t=s(1===this.model.get("numColumns")?"Next Day":"Next Week"),i=s(1===this.model.get("numColumns")?"Previous Day":"Previous Week");return this.monthInfo=_.device("smartphone")?$('<div class="info">'):$('<button class="info btn btn-link" tabindex="-1">'),this.$el.empty().append($('<button href="#" class="control prev">').attr({title:i,"aria-label":i}).append($('<i class="fa fa-chevron-left" aria-hidden="true">')),$('<button href="#" class="control next" tabindex="-1">').attr({title:t,"aria-label":t}).append($('<i class="fa fa-chevron-right" aria-hidden="true">')),this.monthInfo.attr({"aria-label":s("Use cursor keys to change the date. Press ctrl-key at the same time to change year or shift-key to change month. Close date-picker by pressing ESC key.")}).append(this.monthText,$.txt(" "),this.cw,$('<i class="fa fa-caret-down fa-fw" aria-hidden="true">'))),this.update(),_.device("smartphone")||require(["io.ox/backbone/views/datepicker"],function(t){new t({date:e.model.get("startDate").clone()}).attachTo(e.monthInfo).on("select",function(t){e.model.set("date",t)}).on("before:open",function(){this.setDate(e.model.get("startDate"))}),e.onToggleDatepicker()}),"day"===this.model.get("mode")&&this.opt.app.folders.list().length>1&&(this.$el.append($('<button href="#" class="btn btn-link merge-split" data-placement="bottom" tabindex="-1">')),this.updateMergeview()),this},onToggleDatepicker:function(){var e=this.opt.app.props;this.monthInfo.prop("disabled",e.get("folderview")&&e.get("showMiniCalendar"))},updateMergeview:function(){this.$(".merge-split").text(s(this.model.get("mergeView")?"Merge":"Split")).tooltip("hide").attr("data-original-title",s(this.model.get("mergeView")?"Click to merge all folders into one column":"Click to split all folders into separate columns")).tooltip("fixTitle")},onClickControl:function(e){var t=$(e.currentTarget);this.opt.view.setStartDate(t.hasClass("next")?"next":"prev")},onMergeSplit:function(){r.set("mergeview",!r.get("mergeview")).save()}}),u=p.extend({className:"weekview-toolbar",events:{"click .weekday":"onCreateAppointment"},attributes:{role:"toolbar"},initialize:function(e){this.$el.css("margin-right",n.getScrollBarWidth()),this.listenTo(this.model,"change:startDate",this.render),this.listenTo(this.model,"change:additionalTimezones",this.updateTimezones),this.listenTo(o,"before:update",this.beforeUpdateFolder),"day"===this.model.get("mode")&&(this.listenTo(this.model,"change:mergeView",this.updateMergeview),this.listenTo(e.app,"folders:change",this.onFoldersChange))},options:{todayClass:"today"},render:function(){var e=this,t=moment(this.model.get("startDate")),n="day"===this.model.get("mode")?this.opt.app.folders.list():_.range(this.model.get("numColumns"));return this.$el.empty(),n.forEach(function(n,a){var r=$('<button href="#" class="weekday" tabindex="-1">').attr({date:e.model.get("mergeView")?0:a,"aria-label":s("%s %s, create all-day appointment",t.format("ddd"),t.format("D")),tabindex:0===a?"":"-1"}).append($('<span aria-hidden="true">').attr("title",s("Create all-day appointment")).append($.txt(t.format("ddd ")),$('<span aria-hidden="true" class="number">').text(t.format("D"))));if(_(n).isString()&&(r.addClass("merge-view-label").attr({"data-folder-cid":n,"data-folder":n}).css("width","calc("+r.css("width")+" - 2px)"),o.get(n).done(function(e){r.css({"border-color":i.getFolderColor(e)}).text(e.display_title||e.title)})),i.isToday(t)){var d;"day"===e.model.get("mode")?d=$(".week-container .day",e.pane).first():(d=$('.week-container .day[date="'+a+'"]',e.pane),e.model.get("numColumns")>1&&d.addClass(e.opt.todayClass),r.addClass(e.opt.todayClass).attr("aria-label",function(){return s("Today,")+" "+$(this).attr("aria-label")}))}e.$el.append(r),"day"!==e.model.get("mode")&&t.add(1,"day")}),this.updateTimezones(),"day"===e.model.get("mode")&&this.updateMergeview(),this},updateTimezones:function(){var e=this.model.get("additionalTimezones").length;this.$el.css("margin-left",e>0?80*(e+1):"")},updateMergeview:function(){this.$el.css({visibility:this.model.get("mergeView")?"":"hidden",height:this.model.get("mergeView")?"":"27px"})},onFoldersChange:function(){this.model.get("mergeView")&&this.render()},beforeUpdateFolder:function(e,t){var n=n=i.getFolderColor(t.attributes);this.$('[data-folder="'+t.get("id")+'"]').css({"border-color":n})},onCreateAppointment:function(e){if(!($(e.target).closest(".appointment").length>0)){e.preventDefault();var t=this.$(".weekday").index($(e.currentTarget)),i=this.model.get("startDate").clone(),n=this.opt.app.folder.get();this.model.get("mergeView")?n=this.opt.app.folders.list()[t]:i.add(t,"days"),this.opt.view.createAppointment({startDate:{value:i.format("YYYYMMDD")},endDate:{value:i.format("YYYYMMDD")},folder:n})}}}),f=p.extend({initialize:function(e){var t=this;this.on("collection:add",this.onAddAppointment),this.on("collection:change",this.onChangeAppointment),this.on("collection:remove",this.onRemoveAppointment),this.on("collection:before:reset",this.onBeforeReset),this.on("collection:after:reset",this.onAfterReset),this.listenTo(e.app.props,"change:layout",this.adjustPlacement),this.listenTo(ox.ui.windowManager,"window.show",function(e,i){i.app.get("id")===t.opt.app.get("id")&&t.adjustPlacement()}),"day"===this.model.get("mode")&&(this.listenTo(this.model,"change:mergeView",this.render),this.listenTo(e.app,"folders:change",this.onFoldersChange)),this.listenTo(this.model,"change:gridSize",this.render)},renderAppointment:function(t){var n=this.$('[data-cid="'+t.cid+'"]').empty();return 0===n.length&&(n=$('<div role="button" class="appointment">')),n.attr({"data-cid":t.cid,"data-master-id":i.cid({id:t.get("id"),folder:t.get("folder")}),"data-extension-point":"io.ox/calendar/appointment","data-composite-id":t.cid,"data-folder":null}),e.point("io.ox/calendar/appointment").invoke("draw",n,e.Baton(_.extend({},this.opt,{model:t,folders:this.opt.app.folders.list()}))),n},onFoldersChange:function(){this.model.get("mergeView")&&this.render()},onAddAppointment:function(e){if(!1!==r.get("showDeclinedAppointments",!1)||"DECLINED"!==i.getConfirmationStatus(e)){var t=this.renderAppointment(e);this.$appointmentContainer.append(t.hide()),this.onReset||this.adjustPlacement()}},onChangeAppointment:function(e){this.onReset=!0,this.onAddAppointment(e),this.onReset=!1,this.adjustPlacement()},onRemoveAppointment:function(e){this.$('[data-cid="'+e.cid+'"]').remove(),this.onReset||this.adjustPlacement()},onBeforeReset:function(){this.$(".appointment").remove(),this.onReset=!0},onAfterReset:function(){this.adjustPlacement(),this.onReset=!1}}),v=f.extend({className:"fulltime-container",events:function(){var e={};return _.device("touch")?_.extend(e,{"taphold .appointment-panel":"onCreateAppointment"}):(_.extend(e,{"dblclick .appointment-panel":"onCreateAppointment"}),_.device("desktop")&&_.extend(e,{"mousedown .appointment.modify":"onDrag","mousedown .resizable-handle":"onResize"})),e},options:{fulltimeHeight:20,fulltimeMax:5},initialize:function(e){f.prototype.initialize.call(this,e),this.listenTo(this.model,"change:additionalTimezones",this.updateTimezones),this.listenTo(r,"change:favoriteTimezones",this.updateFavoriteTimezones),this.$appointmentContainer=$('<div class="appointment-panel">')},drawDropdown:function(){function e(){var e=moment(t.model.get("startDate")).tz(this),n=moment(t.model.get("startDate")).add(Math.max(0,t.model.get("numColumns")-1),"days").endOf("day").tz(this);return e.zoneAbbr()!==n.zoneAbbr()&&(i=!0),e.zoneAbbr()===n.zoneAbbr()?[$('<span class="offset">').text(e.format("Z")),$('<span class="timezone-abbr">').text(e.zoneAbbr()),_.escape(this)]:[$('<span class="offset">').text(e.format("Z")+"/"+n.format("Z")),$('<span class="timezone-abbr">').text(e.zoneAbbr()+"/"+n.zoneAbbr()),_.escape(this)]}var t,i,n=Backbone.Model.extend({defaults:{default:!0},initialize:function(e){var t=this;_(e).each(function(e,i){t[i]=e})}});return function(){t=this;var a=_.intersection(r.get("favoriteTimezones",[]),r.get("renderTimezones",[])),o=_(r.get("favoriteTimezones",[])).chain().map(function(e){return[e,a.indexOf(e)>=0]}).object().value(),m=moment(t.model.get("startDate")).tz(d.get("timezone")),h=moment(t.model.get("startDate")).add(Math.max(0,t.model.get("numColumns")-1),"days").endOf("day").tz(d.get("timezone")),c=new n(o),p=new l({className:"dropdown timezone-label-dropdown",model:c,label:m.zoneAbbr()===h.zoneAbbr()?m.zoneAbbr():m.zoneAbbr()+"/"+h.zoneAbbr(),tagName:"div"}),g=function(){i=!1,p.header(s("Standard timezone")).option("default",!0,e.bind(d.get("timezone"))),r.get("favoriteTimezones",[]).length>0&&p.header(s("Favorites")),$('li[role="presentation"]',p.$ul).first().addClass("disabled"),$("a",p.$ul).first().removeAttr("data-value").removeData("value"),_(r.get("favoriteTimezones",[])).each(function(t){t!==d.get("timezone")&&p.option(t,!0,e.bind(t))}),$("a",p.$ul).attr("data-keep-open","true"),p.divider(),p.link("settings",s("Manage favorites"),function(){var e={id:"io.ox/timezones"};ox.launch("io.ox/settings/main",e).done(function(){this.setSettingsPane(e)})}),p.$el.toggleClass("double",i)};return g(),c.on("change",function(e){var t=[];_(e.attributes).each(function(e,i){e&&"default"!==i&&t.push(i)}),r.set("renderTimezones",t),r.save()}),this.model.on("change:startDate",function(){var e=moment(t.model.get("startDate")).tz(d.get("timezone")),i=moment(t.model.get("startDate")).add(Math.max(0,t.model.get("numColumns")-1),"days").endOf("day").tz(d.get("timezone"));p.$el.find(".dropdown-label").empty().append(e.zoneAbbr()===i.zoneAbbr()?e.zoneAbbr():e.zoneAbbr()+"/"+i.zoneAbbr(),$('<i class="fa fa-caret-down" aria-hidden="true">')),p.$ul.empty(),g()}),p}}(),render:function(){if(!_.device("smartphone")){var e=this.drawDropdown(),t=this;this.$el.empty().append($('<div class="time-label-bar">').append($('<div class="timezone">'),e.render().$el)),$(".dropdown-label",e.$el).append($('<i class="fa fa-caret-down" aria-hidden="true">')),this.updateTimezones(),this.model.on("change:startDate",function(){t.updateTimezones()})}return this.$el.append(this.$appointmentContainer),this.onReset=!0,this.opt.view.collection.filter(i.isAllday.bind(i)).forEach(this.onAddAppointment.bind(this)),this.adjustPlacement(),this.onReset=!1,this},updateTimezones:function(){var e=this.model.get("additionalTimezones"),t=this;this.$(".timezone").remove(),this.$(".time-label-bar").prepend(_(e).map(function(e){return $('<div class="timezone">').text(moment(t.model.get("startDate")).tz(e).zoneAbbr())})).css("width",e.length>0?80*(e.length+1):"")},updateFavoriteTimezones:function(){var e=this.drawDropdown();this.$(".dropdown").replaceWith(e.render().$el),$(".dropdown-label",e.$el).append($('<i class="fa fa-caret-down" aria-hidden="true">'))},onCreateAppointment:function(e){if(!($(e.target).closest(".appointment").length>0)){var t=this.model.get("mergeView")?this.opt.app.folders.list().length:this.model.get("numColumns"),i=this.$(".appointment-panel").width()/t,n=(e.pageX-$(e.target).offset().left)/i>>0,a=this.model.get("startDate").clone(),o=this.opt.app.folder.get();this.model.get("mergeView")?o=this.opt.app.folders.list()[n]:a.add(n,"days"),this.opt.view.createAppointment({startDate:{value:a.format("YYYYMMDD")},endDate:{value:a.format("YYYYMMDD")},folder:o})}},onResize:function(e){var t,i,n,a,o,s;this.mouseDragHelper({event:e,updateContext:".appointment-panel",start:function(e){var r=$(e.target);t=r.closest(".appointment"),i=this.opt.view.collection.get(t.attr("data-cid")),this.$('[data-cid="'+i.cid+'"]').addClass("resizing").removeClass("current hover"),r.hasClass("resizable-w")?(o=i.getMoment("endDate").subtract(1,"day"),s=i.getMoment("endDate")):r.hasClass("resizable-e")&&(o=i.getMoment("startDate"),s=i.getMoment("startDate").add(1,"day")),n=i.getMoment("startDate"),a=i.getMoment("endDate"),this.$el.addClass("no-select")},update:function(e){var i=this.model.get("mergeView")?this.opt.app.folders.list().length:this.model.get("numColumns"),r=this.$(".appointment-panel").width()/i,d=(e.pageX-$(e.currentTarget).offset().left)/r>>0,l=this.model.get("startDate").clone().add(d,"days");n=moment.min(o,l),a=moment.max(s,l.clone().add(1,"day"));var m=n.diff(this.model.get("startDate"),"days"),h=Math.max(0,a.diff(n,"days"));t.css({left:100/i*m+"%",width:100/i*h+"%"})},end:function(){t&&t.removeClass("resizing"),this.$el.removeClass("no-select"),this.opt.view.updateAppointment(i,{startDate:{value:n.format("YYYYMMDD")},endDate:{value:a.format("YYYYMMDD")}})}})},onDrag:function(e){var t,i,n,a,o,s,r;this.model.get("mergeView")||$(e.target).is(".resizable-handle")||this.mouseDragHelper({event:e,updateContext:".appointment-panel",start:function(e){t=$(e.target).closest(".appointment"),i=this.opt.view.collection.get(t.attr("data-cid")),this.$('[data-cid="'+i.cid+'"]').addClass("resizing").removeClass("current hover"),n=i.getMoment("startDate"),a=i.getMoment("endDate"),r=this.model.get("mergeView")?this.opt.app.folders.list().length:this.model.get("numColumns"),s=this.$(".appointment-panel").width()/r,o=Math.floor((e.pageX-$(e.currentTarget).offset().left)/s)*s},update:function(e){var d=((e.pageX-o-$(e.currentTarget).offset().left)/s>>0)-i.getMoment("startDate").diff(this.model.get("startDate"),"days");0!==d&&this.$el.addClass("no-select"),n=i.getMoment("startDate").add(d,"days"),a=i.getMoment("endDate").add(d,"days");var l=n.diff(this.model.get("startDate"),"days"),m=Math.max(0,a.diff(n,"days"));l=Math.max(l,0),m=Math.min(r-l,m),t.css({left:100/r*l+"%",width:100/r*m+"%"})},end:function(){t&&t.removeClass("resizing"),this.$el.removeClass("no-select"),this.opt.view.updateAppointment(i,{startDate:{value:n.format("YYYYMMDD")},endDate:{value:a.format("YYYYMMDD")}})}})},adjustPlacement:function(){function e(e,t,i){var n,a,o=0;for(e=Math.max(0,e),t=Math.min(i.length,e+t)-e;!a;){for(a=!0,n=e;n<e+t;n++)if(i[n][o]){a=!1;break}o++}for(n=e;n<e+t;n++)i[n][o-1]=!0;return o-1}return function(){var t=0,a=this.model.get("mergeView")?this.opt.app.folders.list().length:this.model.get("numColumns"),o=_.range(a).map(function(){return[]});this.opt.view.collection.each(function(n){if(i.isAllday(n)&&(!1!==r.get("showDeclinedAppointments",!1)||"DECLINED"!==i.getConfirmationStatus(n))){var a=n.getMoment("startDate").startOf("day"),s=this.model.get("mergeView")?this.opt.app.folders.list().indexOf(n.get("folder")):a.diff(this.model.get("startDate"),"days"),d=this.model.get("mergeView")?1:Math.max(n.getMoment("endDate").diff(a,"days")+Math.min(0,s),1),l=e(s,d,o),m=this.model.get("mergeView")?this.opt.app.folders.list().length:this.model.get("numColumns"),h=this.$appointmentContainer.find('[data-cid="'+n.cid+'"]');h.parent().append(h),h.show().css({height:this.opt.fulltimeHeight,lineHeight:this.opt.fulltimeHeight+"px",width:100/m*d+"%",left:100/m*Math.max(0,s)+"%",top:l*(this.opt.fulltimeHeight+1)}),t=Math.max(t,l+1)}}.bind(this));var s=(t<=this.opt.fulltimeMax?t:this.opt.fulltimeMax+.5)*(this.opt.fulltimeHeight+1);this.$el.css("height",s),t>this.opt.fulltimeMax?this.$appointmentContainer.css({"overflow-y":"scroll","margin-right":""}):this.$appointmentContainer.css({"overflow-y":"hidden","margin-right":n.getScrollBarWidth()})}}()}),w=f.extend({className:"appointment-container",options:{overlap:.35,minCellHeight:24},events:function(){var e={};return _.device("touch")?_.extend(e,{"taphold .timeslot":"onCreateAppointment"}):(_.extend(e,{"dblclick .timeslot":"onCreateAppointment"}),_.device("desktop")&&_.extend(e,{"mouseenter .appointment":"onHover","mouseleave .appointment":"onHover","mousedown .timeslot":"onLasso","mousedown .resizable-handle":"onResize","mousedown .appointment.modify":"onDrag"})),e},initialize:function(e){f.prototype.initialize.call(this,e),this.listenTo(this.model,"change:additionalTimezones",this.updateTimezones),this.listenTo(this.model,"change:startDate",this.updateToday),this.listenTo(this.model,"change:startDate",this.updateTimezones),this.listenToDOM(window,"resize",_.throttle(this.onWindowResize,50)),this.$hiddenIndicators=$('<div class="hidden-appointment-indicator-container">'),this.initCurrentTimeIndicator()},initCurrentTimeIndicator:function(){this.lastDate=moment(),this.$currentTimeIndicator=$('<div class="current-time-indicator">'),window.setInterval(this.updateCurrentTimeIndicator.bind(this),6e4),this.updateCurrentTimeIndicator()},updateCurrentTimeIndicator:function(){var e,t=this,i=moment().diff(moment().startOf("day"),"minutes")/24/60,n=moment().startOf("day").diff(this.model.get("startDate"),"days");if(this.$currentTimeIndicator.css({top:100*i+"%"}).data("top",i),n<0||n>=this.model.get("numColumns"))return this.$currentTimeIndicator.remove();e=this.model.get("mergeView")?this.$(".day"):this.$(".day").eq(n),this.$currentTimeIndicator.detach(),this.$currentTimeIndicator=this.$currentTimeIndicator.eq(0),e.each(function(e){var i=t.$currentTimeIndicator.eq(e);t.$currentTimeIndicator.get(e)||(i=t.$currentTimeIndicator.eq(0).clone(),t.$currentTimeIndicator=t.$currentTimeIndicator.add(i)),$(this).append(i)}),this.lastDate.isSame(moment(),"day")||(this.lastDate=moment(),this.opt.view.render())},renderTimeLabel:function(e,t){var i=$('<div class="week-container-label" aria-hidden="true">').addClass(t),n=this;return i.append(_(_.range(24)).map(function(t){var i=moment(n.model.get("startDate")).startOf("day").hours(t).tz(e).format("LT");return $('<div class="time">').addClass(t>=n.model.get("workStart")&&t<n.model.get("workEnd")?"in":"").addClass(t+1===n.model.get("workStart")||t+1===n.model.get("workEnd")?"working-time-border":"").append($('<div class="number">').text(i.replace(/^(\d\d?):00 ([AP]M)$/,"$1 $2")))})),i},renderColumn:function(e){var t=$('<div class="day">');this.model.get("mergeView")&&t.attr("data-folder-cid",e);for(var i=1;i<=this.getNumTimeslots();i++)t.append($("<div>").addClass("timeslot").addClass(i<=this.model.get("workStart")*this.model.get("gridSize")||i>this.model.get("workEnd")*this.model.get("gridSize")?"out":"").addClass(i===this.model.get("workStart")*this.model.get("gridSize")||i===this.model.get("workEnd")*this.model.get("gridSize")?"working-time-border":""));return t},updateToday:function(){if("day"!==this.model.get("mode")){var e=this.model.get("startDate");this.$(">> .day").each(function(t){$(this).toggleClass("today",i.isToday(e.clone().add(t,"days")))})}},render:function(){this.updateCellHeight();var e=this.$(".scrollpane"),t=e.scrollTop()/e.height(),a=this.model.get("mergeView")?this.opt.app.folders.list():_.range(this.model.get("numColumns")),o=this.getContainerHeight();return this.$el.empty().append(e=$('<div class="scrollpane f6-target" tabindex="-1">').append(this.renderTimeLabel(d.get("timezone")),a.map(this.renderColumn.bind(this))).on("scroll",this.updateHiddenIndicators.bind(this)),this.$hiddenIndicators.css("right",n.getScrollBarWidth())),_.device("Smartphone")||this.updateTimezones(),this.updateToday(),e.children().css("height",o),this.applyTimeScale(),this.updateCurrentTimeIndicator(),e.scrollTop(_.isNaN(t)?moment().diff(moment().startOf("day"),"minutes")/24/60*o-2*o/24:t*e.height()),this.onReset=!0,this.opt.view.collection.reject(i.isAllday.bind(i)).forEach(this.onAddAppointment.bind(this)),this.adjustIndendation(),this.onReset=!1,this},getNumTimeslots:function(){return this.opt.slots*this.model.get("gridSize")},updateCellHeight:function(){var e=Math.min(Math.max(4,this.model.get("workEnd")-this.model.get("workStart")+1),18),t=this.$el.height()||window.innerHeight-250,i=Math.floor(Math.max(t/(e*this.model.get("gridSize")),this.options.minCellHeight));this.model.set("cellHeight",i)},getContainerHeight:function(){return this.model.get("cellHeight")*this.getNumTimeslots()},applyTimeScale:function(){this.$el.removeClass(function(e,t){return(t.match(/(^|\s)time-scale-\S+/g)||[]).join(" ")}),this.$el.addClass("time-scale-"+this.model.get("gridSize"))},updateTimezones:function(){var e=this,t=this.getContainerHeight(),i=this.model.get("additionalTimezones");this.$(".secondary-timezone").remove(),this.$(".scrollpane").prepend(i.map(function(i){return e.renderTimeLabel(i).addClass("secondary-timezone").css("height",t)})).toggleClass("secondary",i.length>0);var n=i.length>0?80*(i.length+1)+"px":"";e.$hiddenIndicators.css("left",n),e.$currentTimeIndicator.css("left",this.model.get("mergeView")?n:"")},updateHiddenIndicators:function(){function e(e,t){return $("<span>").addClass("more-appointments fa").css({left:e*t+"%",width:t+"%"})}return _.throttle(function(){var t=this.$(".scrollpane"),i=t.scrollTop(),n=t.scrollTop()+t.height(),a=this.$(".day"),o=100/a.length,s=this.$hiddenIndicators;s.empty(),a.each(function(t){var a=$(this).find(" > .appointment").filter(function(e,t){return $(t).height()>0}),r=a.filter(function(e,t){return(t=$(t)).position().top+t.height()-3<i}).length,d=a.filter(function(e,t){return(t=$(t)).position().top+3>n}).length;r>0&&s.append(e(t,o).addClass("earlier fa-caret-up")),d>0&&s.append(e(t,o).addClass("later fa-caret-down"))})},100)}(),onCreateAppointment:function(e){var t=$(e.currentTarget),i=this.$(".day").index(t.parent()),n=this.model.get("startDate").clone(),a=this.opt.app.folder.get();this.model.get("mergeView")?a=this.opt.app.folders.list()[i]:n.add(i,"days"),n.add(60/this.model.get("gridSize")*t.index(),"minutes"),this.opt.view.createAppointment({startDate:{value:n.format("YYYYMMDD[T]HHmmss"),tzid:n.tz()},endDate:{value:n.add(1,"hour").format("YYYYMMDD[T]HHmmss"),tzid:n.tz()},folder:a})},onAddAppointment:function(t){if(!1!==r.get("showDeclinedAppointments",!1)||"DECLINED"!==i.getConfirmationStatus(t)){for(var n=t.getMoment("startDate"),a=moment.max(n,moment(this.model.get("startDate"))).local().clone(),o=t.getMoment("endDate").local(),s=moment(a).startOf("day"),d=moment(o).startOf("day"),l=moment(this.model.get("startDate")).startOf("day").add(this.model.get("numColumns"),"days"),m=0;m<=this.model.get("numColumns");){var h=this.renderAppointment(t).addClass("border");if(o=s.isSame(d,"day")?t.getMoment("endDate").local():moment(a).endOf("day").local(),a.isSame(o)&&m>0)break;if(s.isSame(l))break;h=h.get(m)?$(h.get(m)):$(h).first().clone();var c=s._offset-t.getMoment("startDate").tz(s.tz())._offset;h.addClass(o.diff(a,"minutes")<120/this.model.get("gridSize")?"no-wrap":"").css({top:Math.max(0,a.diff(moment(s),"minutes")-c)/24/60*100+"%",height:"calc( "+o.diff(a,"minutes")/24/60*100+"% - 2px)",lineHeight:this.opt.minCellHeight+"px"});var p=a.day()-this.model.get("startDate").day();if(p<0&&(p+=7),this.model.get("mergeView")&&(p=this.opt.app.folders.list().indexOf(t.get("folder"))),this.$(".day").eq(p).append(h),e.point("io.ox/calendar/week/view/appointment").invoke("draw",h,e.Baton({model:t,date:s,view:this})),s.isSame(d,"day"))break;s=a.add(1,"day").startOf("day").clone(),m++}this.onReset||this.adjustPlacement()}},onAfterReset:function(){f.prototype.onAfterReset.call(this),this.updateCurrentTimeIndicator()},adjustPlacement:function(){this.adjustIndendation(),this.updateHiddenIndicators()},adjustIndendation:function(){function e(e,t){var i=Math.min(100/e*(1+this.opt.overlap*(e-1)),100),n=e>1?(100-i)/(e-1)*t.viewIndex:0;t.css({left:"calc("+n+"% - 1px)",width:"calc("+i+"% - 10px)"})}function t(e,t){var i,n=e.offset().top;for(i=0;i<t.length;i++)if(t[i].topPlusHeight<=n)return e.viewIndex=i,void(t[i]=e);e.viewIndex=t.length,t.push(e)}return function(){var n=this;this.opt.view.collection.each(function(e){i.isAllday(e)||n.$('[data-cid="'+e.cid+'"]').each(function(){var e=$(this);e.parent().append(e)})}),this.$(".day").each(function(){var i=[],a=[],o=0;$(".appointment",this).each(function(){var s=$(this);s.offset().top>=o&&(i.forEach(e.bind(n,a.length)),i=[],a=[]),t(s,a),i.push(s),s.topPlusHeight=s.offset().top+s.height(),o=Math.max(o,s.topPlusHeight)}),i.forEach(e.bind(n,a.length))})}}(),onHover:function(e){if(!this.model.get("lasso")){var t=i.cid(String($(e.currentTarget).data("cid"))),n=this.$('[data-master-id="'+t.folder+"."+t.id+'"]'),a=n.data("background-color");switch(e.type){case"mouseenter":e.relatedTarget&&"TD"!==e.relatedTarget.tagName&&(n.addClass("hover"),a&&n.css("background-color",i.lightenDarkenColor(a,.9)));break;case"mouseleave":n.removeClass("hover"),a&&n.css("background-color",a)}}},onLasso:function(){function e(e,t){return t.parent().index()<e.parent().index()||!!e.parent().is(t.parent())&&t.index()<e.index()}function t(e){return o.can("create",e)?e:o.get(r.get("chronos/defaultFolderId"))}function i(t,i){var n,a,o,s;this.mouseDragHelper({event:t,updateContext:".timeslot",start:function(e){n=$(e.target),a=i,this.$el.addClass("no-select")},update:function(t){var i,a=n,r=$(t.target),d=this.$(".day");for("day"===this.model.get("mode")&&(a=(d=n.parent()).children().eq(a.index()),r=d.children().eq(r.index())),e(a,r)&&(a=r,r=n),i=a.parent();i.index()<=r.parent().index()&&i.length>0;i=i.next()){var l=this.getNumTimeslots(),m=a.parent().is(i)?a.index():0,h=r.parent().is(i)?r.index()+1:l,c=i.find(".lasso");0===c.length&&(c=$('<div class="lasso">').appendTo(i)),c.css({top:m/l*100+"%",height:(h-m)/l*100+"%"}),a.parent().is(i)&&(o=this.model.get("startDate").clone().add(d.index(i),"days").add(m/l*24*60,"minutes")),r.parent().is(i)&&(s=this.model.get("startDate").clone().add(d.index(i),"days").add(h/l*24*60,"minutes"))}a.parent().prevAll().find(".lasso").remove(),i.nextAll().addBack().find(".lasso").remove()},clear:function(){this.$(".lasso").remove(),this.$el.removeClass("no-select")},end:function(){o&&s&&this.opt.view.createAppointment({startDate:{value:o.format("YYYYMMDD[T]HHmmss"),tzid:o.tz()},endDate:{value:s.format("YYYYMMDD[T]HHmmss"),tzid:s.tz()},folder:a.id})}})}return function(e){if(!m.has("guest"))if("mousedown"!==e.type)i.call(this,e);else{var n=this.opt.app;if(this.model.get("mergeView")){var a=$(e.target).closest(".day").attr("data-folder-cid");o.get(a||n.folder.get()).then(t).done(i.bind(this,e))}else n.folder.getData().done(i.bind(this,e))}}}(),onResize:function(){function e(e,t){return t.parent().index()<e.parent().index()||!!e.parent().is(t.parent())&&t.index()<e.index()}function t(e,t){var i=e.getMoment(t).subtract("endDate"===t?1:0).local(),n=i.clone().startOf("day"),a=i.diff(this.model.get("startDate"),"days"),o=i.diff(n,"minutes")/60*this.model.get("gridSize")>>0;return this.$(".day").eq(a).find(".timeslot").eq(o)}return function(i){var n,a,o,s,r,d,l;this.mouseDragHelper({event:i,updateContext:".timeslot",start:function(e){var i=$(e.target);a=i.closest(".appointment"),o=this.opt.view.collection.get(a.attr("data-cid")),this.$('[data-cid="'+o.cid+'"]').addClass("resizing").removeClass("current hover"),i.hasClass("resizable-s")?n=t.call(this,o,"startDate"):i.hasClass("resizable-n")&&(n=t.call(this,o,"endDate")),d=o.getMoment("startDate").minutes()%(60/this.model.get("gridSize")),l=o.getMoment("endDate").minutes()%(60/this.model.get("gridSize")),this.$el.addClass("no-select")},update:function(t){var i,o=n,m=$(t.target),h=this.$(".day");for("day"===this.model.get("mode")&&(o=(h=n.parent()).children().eq(o.index()),m=h.children().eq(m.index())),e(o,m)&&(o=m,m=n),i=o.parent();i.index()<=m.parent().index()&&i.length>0;i=i.next()){var c=this.getNumTimeslots(),p=o.parent().is(i)?o.index():0,g=m.parent().is(i)?m.index()+1:c,u=i.find(".resizing"),f=this.model.get("startDate").clone().add(h.index(i),"days");s||(s=f),r||(r=f.clone().add(1,"day")),o.parent().is(i)&&(s=f.clone().add(p/c*24*60+d,"minutes")),m.parent().is(i)&&(r=f.clone().add(g/c*24*60-l,"minutes")),0===u.length&&(u=a.clone().appendTo(i));var v=s.diff(f,"minutes")/60/24*100;u.css({top:v+"%",height:Math.min(100-v,r.diff(s,"minutes")/60/24*100)+"%"})}o.parent().prevAll().find(".resizing").remove(),i.nextAll().addBack().find(".resizing").remove()},end:function(){this.$el.removeClass("no-select"),this.$(".resizing").removeClass("resizing"),s&&r&&(s.tz(o.getMoment("startDate").tz()),r.tz(o.getMoment("endDate").tz()),this.opt.view.updateAppointment(o,{startDate:{value:s.format("YYYYMMDD[T]HHmmss"),tzid:s.tz()},endDate:{value:r.format("YYYYMMDD[T]HHmmss"),tzid:r.tz()}}))}})}}(),onDrag:function(e){var t,i,n,a,o,s,r,d,l,m,h,c=$(e.target);c.is(".resizable-handle")||this.mouseDragHelper({event:e,updateContext:".day",start:function(e){if(i=c.closest(".appointment"),t=this.opt.view.collection.get(i.attr("data-cid")),a=t.getMoment("startDate"),o=t.getMoment("endDate"),s=this.$(".day"),d=this.model.get("cellHeight"),r={x:e.pageX,y:e.pageY},!(l=t.getMoment("startDate").local().isSame(t.getMoment("endDate").local(),"day"))){var p=moment(t.getMoment("endDate").local()).startOf("day");p.isSame(moment(t.getMoment("endDate").local()))&&(p.subtract(1,"seconds"),l=t.getMoment("startDate").local().isSame(p,"day"))}m=t.getMoment("startDate").local().minutes()%(60/this.model.get("gridSize")),h=this.getNumTimeslots(),n=Math.floor((e.pageY-$(e.currentTarget).offset().top)/d),this.$('[data-cid="'+t.cid+'"]').addClass("resizing").removeClass("hover")},update:function(e){if(!this.$el.hasClass("no-select")){var l=r.x-e.pageX,c=r.y-e.pageY;if(l*l+c*c<d*d/2)return;this.$el.addClass("no-select")}var p=$(e.target);if(p.hasClass("timeslot")){var g,u=s.index(p.parent()),f=t.getMoment("startDate").diff(this.model.get("startDate"),"days"),v=u-f,w=0;this.model.get("mergeView")&&(v=0),w=(p.index()-n)/h*24*60+m-t.getMoment("startDate").diff(t.getMoment("startDate").tz(moment().tz()).startOf("day"),"minutes"),a=t.getMoment("startDate").tz(moment().tz()).add(v,"days").add(w,"minutes"),o=t.getMoment("endDate").tz(moment().tz()).add(v,"days").add(w,"minutes"),f=Math.max(0,a.diff(this.model.get("startDate"),"days"));var D=Math.min(this.model.get("numColumns"),o.diff(this.model.get("startDate"),"days")),z=o.isSame(o.clone().startOf("day"));for(z&&D--,g=f;g<=D;g++){var y=s.eq(g),b=g===f?a.diff(a.clone().startOf("day"),"minutes"):0,C=g!==D||z?1440:o.diff(o.clone().startOf("day"),"minutes"),x=y.find(".resizing");0===x.length&&(x=i.clone().appendTo(y)),x.css({top:b/60/24*100+"%",height:(C-b)/60/24*100+"%"})}s.eq(f).prevAll().find(".resizing").remove(),s.eq(D).nextAll().find(".resizing").remove()}},end:function(){this.$el.removeClass("no-select"),this.$(".resizing").removeClass("resizing"),a.tz(t.getMoment("startDate").tz()),o.tz(t.getMoment("endDate").tz()),a.isSame(t.getMoment("startDate"))||this.opt.view.updateAppointment(t,{startDate:{value:a.format("YYYYMMDD[T]HHmmss"),tzid:a.tz()},endDate:{value:o.format("YYYYMMDD[T]HHmmss"),tzid:o.tz()}})}})},onWindowResize:function(){this.updateCellHeight();var e=this.getContainerHeight();this.$(".scrollpane").children().css("height",e)}});return t.extend({className:"weekview-container",options:{showFulltime:!0,slots:24,limit:1e3},initialize:function(e){this.mode=e.mode||"day",this.app=e.app,this.model=new Backbone.Model({additionalTimezones:this.getTimezoneLabels(),workStart:1*r.get("startTime",8),workEnd:1*r.get("endTime",18),gridSize:60/r.get("interval",30),mergeView:_.device("!smartphone")&&"day"===this.mode&&this.app.folders.list().length>1&&r.get("mergeview"),date:e.startDate||moment(this.app.getDate()),mode:this.mode}),this.updateNumColumns(),this.initializeSubviews(),this.$el.addClass(this.mode),this.setStartDate(this.model.get("date"),{silent:!0}),this.listenTo(a,"process:create update delete",this.onUpdateCache),this.listenTo(r,"change:renderTimezones change:favoriteTimezones",this.onChangeTimezones),this.listenTo(r,"change:startTime change:endTime",this.getCallback("onChangeWorktime")),this.listenTo(r,"change:interval",this.getCallback("onChangeInterval")),"day"===this.model.get("mode")&&this.listenTo(r,"change:mergeview",this.onChangeMergeView),"workweek"===this.model.get("mode")&&this.listenTo(r,"change:numDaysWorkweek change:workweekStart",this.getCallback("onChangeWorkweek")),t.prototype.initialize.call(this,e)},initializeSubviews:function(){var e=_.extend({app:this.app,view:this,model:this.model},this.options);this.weekViewHeader=new g(e),this.weekViewToolbar=new u(e),this.fulltimeView=new v(e),this.appointmentView=new w(e),this.$el.append(this.weekViewHeader.$el,this.weekViewToolbar.$el,this.fulltimeView.$el,this.appointmentView.$el)},getTimezoneLabels:function(){var e=_.intersection(r.get("favoriteTimezones",[]),r.get("renderTimezones",[]));return _(e).without(d.get("timezone"))},updateNumColumns:function(){var e;switch(this.mode){case"day":this.model.get("mergeView")&&this.$el.addClass("merge-view"),e=1;break;case"workweek":e=r.get("numDaysWorkweek");break;default:case"week":e=7}this.model.set("numColumns",e)},onChangeDate:function(e,t){t=moment(t),this.model.set("date",t),this.setStartDate(t)},onWindowShow:function(){this.$el.is(":visible")&&this.trigger("show")},onChangeTimezones:function(){this.model.set("additionalTimezones",this.getTimezoneLabels())},setStartDate:function(e,t){if(_.isString(e)){var i="next"===e?"add":"subtract",n="day"===this.model.get("mode")?"day":"week";e=this.model.get("startDate").clone()[i](1,n)}var a=moment(this.model.get("startDate")),o=_.extend({propagate:!0,silent:!1},t),s=moment(e);switch(this.mode){case"day":s.startOf("day");break;case"workweek":s.startOf("week").day(r.get("workweekStart"));break;default:case"week":s.startOf("week")}s.isSame(a)||(this.model.set("startDate",s,{silent:o.silent}),o.propagate&&this.app.setDate(moment(e)),ox.debug&&console.log("refresh calendar data"),this.refresh())},render:function(){return this.weekViewHeader.render(),this.weekViewToolbar.render(),this.fulltimeView.render(),this.appointmentView.render(),this},getRequestParam:function(){return{start:this.model.get("startDate").valueOf(),end:moment(this.model.get("startDate")).add(this.model.get("numColumns"),"days").valueOf(),view:"week",folders:this.app.folders.list()}},refresh:function(e){var t=this,i=this.getRequestParam(),n=a.getCollection(i);!1===e&&a.pool.grep("view=week").forEach(function(e){e.expired=!0}),this.setCollection(n),$.when(this.app.folder.getData(),this.app.folders.getData()).done(function(e,i){t.model.set("folders",i),n.folders=_(i).pluck("id"),n.sync()})},onUpdateCache:function(){var e=this.collection;a.pool.grep("view=week").forEach(function(t){t!==e&&(t.expired=!0)}),e.sync()},onPrevious:function(){this.weekViewHeader.$(".prev").trigger("click")},onNext:function(){this.weekViewHeader.$(".next").trigger("click")},onChangeMergeView:function(){this.model.set("mergeView",_.device("!smartphone")&&"day"===this.mode&&this.app.folders.list().length>1&&r.get("mergeview"))},onChangeInterval:function(){this.model.set("gridSize",60/r.get("interval",30))},onAddAppointment:function(e){i.isAllday(e)&&this.options.showFulltime?this.fulltimeView.trigger("collection:add",e):this.appointmentView.trigger("collection:add",e)},onChangeWorkweek:function(){this.setStartDate(this.model.get("startDate")),this.updateNumColumns(),this.render()},onChangeWorktime:function(){this.model.set({workStart:1*r.get("startTime",8),workEnd:1*r.get("endTime",18)}),this.render()},onChangeAppointment:function(e){var t=i.isAllday(e);if(e.changed.startDate&&this.collection.sort(),t!==i.isAllday(e.previousAttributes())){var n=t?this.appointmentView:this.fulltimeView,a=t?this.fulltimeView:this.appointmentView;return n.trigger("collection:remove",e),void a.trigger("collection:add",e)}i.isAllday(e)&&this.options.showFulltime?this.fulltimeView.trigger("collection:change",e):this.appointmentView.trigger("collection:change",e)},onRemoveAppointment:function(e){i.isAllday(e)&&this.options.showFulltime?this.fulltimeView.trigger("collection:remove",e):this.appointmentView.trigger("collection:remove",e)},onResetAppointments:function(){this.fulltimeView.trigger("collection:before:reset"),this.appointmentView.trigger("collection:before:reset"),this.collection.forEach(function(e){i.isAllday(e)&&this.options.showFulltime?this.fulltimeView.trigger("collection:add",e):this.appointmentView.trigger("collection:add",e)}.bind(this)),this.fulltimeView.trigger("collection:after:reset"),this.appointmentView.trigger("collection:after:reset")},getName:function(){return"week"},selectAppointment:function(e){this.setStartDate(e.getMoment("startDate").clone().tz(this.model.get("startDate").tz()));var t=this.$el.find('.appointment[data-cid="'+i.cid(e)+'"] .appointment-content');if(t.length){var n=new jQuery.Event("click");return n.pageX=t.offset().left+t.width()/2,void t.trigger(n)}this.showAppointment($.Event("click",{target:this.$el}),e,{arrow:!1})},print:function(){var e=this.model.get("folders"),t=s("Appointments");1===e.length&&(t=e[0].display_title||e[0].title),h.request("io.ox/calendar/week/print",{start:this.model.get("startDate").valueOf(),end:this.model.get("startDate").clone().add(this.model.get("numColumns"),"days").valueOf(),folders:_(e).pluck("id"),title:t,numberOfColumns:this.model.get("numColumns")})}})});