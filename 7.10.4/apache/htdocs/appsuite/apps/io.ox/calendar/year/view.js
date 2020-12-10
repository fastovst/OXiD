define("io.ox/calendar/year/view",["io.ox/backbone/views/datepicker","io.ox/calendar/perspective","gettext!io.ox/calendar","less!io.ox/calendar/year/style"],function(e,t,n){"use strict";var a=Backbone.View.extend({className:"month-container",events:{click:"onClick"},initialize:function(e){this.date=moment(e.date),this.app=e.app,this.perspective=e.perspective,this.listenTo(this.model,"change:numPerRow",this.onChangeNumRow),this.onChangeNumRow()},renderCaption:function(){return $("<caption>").append($("<h2>").append($('<button type="button" class="btn btn-link">').text(this.date.format("MMMM"))))},renderHeader:function(){var e=moment.localeData().firstDayOfWeek();return $("<thead>").append($('<th class="cw">').text(n("CW")),_.range(e,e+7).map(function(e){var t=moment().day(e%7),n=$("<th>").text(t.format("dd"));return 0!==t.day()&&6!==t.day()||n.addClass("weekend"),n}))},renderBody:function(){for(var e=$("<tbody>"),t=moment(this.date).startOf("week"),n=moment(this.date).endOf("month").endOf("week"),a=moment();t.isBefore(n);t.add(1,"week")){var i=$("<tr>"),o=moment(t),s=moment(t).endOf("week");for(i.append($("<td class=cw>").text(o.format("w")));o.isBefore(s);o.add(1,"day")){var r=$("<td>").text(o.date());0!==o.day()&&6!==o.day()||r.addClass("weekend"),o.isSame(this.date,"month")||(r.addClass("out"),r.empty().append($('<span aria-hidden="true" role="presentation">').text(o.date()))),o.isSame(a,"day")&&r.addClass("today"),i.append(r)}e.append(i)}return e},render:function(){return this.$el.append($('<table class="month">').append(this.renderCaption(),this.renderHeader(),this.renderBody())),this},onChangeNumRow:function(){this.$el.css("width",100/this.model.get("numPerRow")+"%")},onClick:function(){this.app.props.set("date",this.date.valueOf()),this.app.props.set("layout","month"),this.$el.closest(".year-view").busy().find("button").prop("disabled",!0)}}),i=e.extend({switchMode:function(e,t){this.trigger("select:year",t),this.close()},onToday:function(){this.setDate(this.getToday()),this.$grid.focus()}}),o=Backbone.View.extend({className:"header",attributes:{role:"toolbar"},events:{"click .prev":"onPrev","click .next":"onNext","click .info":"onInfo"},initialize:function(e){this.app=e.app,this.listenTo(this.model,"change:year",this.onChangeYear)},render:function(){var e=this;return this.$el.append($('<a href="#" role="button" class="control prev">').attr({title:n("Previous year"),"aria-label":n("Previous year")}).append($('<i class="fa fa-chevron-left" aria-hidden="true">')),$('<a href="#" role="button" class="control next">').attr({title:n("Next year"),"aria-label":n("Next year")}).append($('<i class="fa fa-chevron-right" aria-hidden="true">')),this.$yearInfo=$('<a href="#" class="info">').text(this.model.get("year"))),new i({date:this.app.getDate().year(),todayButton:!1}).attachTo(this.$yearInfo).on("before:open",function(){var t=e.app.getDate().year();this.setDate(moment().year(t)),this.mode="decade"}).on("select:year",function(t){e.setYear({year:t})}),this.listenTo(this.app.props,"change:date",function(){if(this.$el.is(":visible")){var e=this.app.getDate().year();ox.debug&&console.log("year: change:date",e),this.setYear({year:e})}}),this},onChangeYear:function(){this.$yearInfo.text(this.model.get("year"))},onInfo:function(e){e.preventDefault()},onPrev:function(e){e.preventDefault(),this.setYear({inc:-1})},onNext:function(e){e.preventDefault(),this.setYear({inc:1})},setYear:function(e){var t=e.year||this.app.getDate().year()+(e.inc||0);this.app.setDate(moment([t]))}});return t.extend({className:"year-view",initialize:function(e){this.app=e.app,this.model=new Backbone.Model({year:this.app.getDate().year(),numPerRow:this.getNumPerRow()}),this.listenTo(this.model,"change:year",this.getCallback("onChangeYear")),this.listenTo(this.app,"change:folderview",this.onWindowResize),this.listenToDOM(window,"resize",this.onWindowResize),this.on("show",this.onShow),t.prototype.initialize.call(this,e)},renderViews:function(){var e=moment().year(this.model.get("year")).startOf("year"),t=moment().year(this.model.get("year")).endOf("year"),n=this.$(".year-view-container").empty();for(0===n.length&&(n=$('<div class="year-view-container">'));e.isBefore(t);e.add(1,"month"))n.append(new a({date:moment(e),app:this.app,model:this.model}).render().$el);return n},render:function(){return this.onWindowResize(),this.$el.append(new o({app:this.app,model:this.model}).render().$el,this.renderViews()),this},onShow:function(){this.$("button").prop("disabled",!1),this.$el.idle()},onWindowShow:function(){this.$el.is(":visible")&&this.trigger("show")},onChangeDate:function(e,t){t=moment(t),this.model.set("year",t.year())},onChangeYear:function(){this.renderViews()},getNumPerRow:function(){var e=this.$el.width()/250>>0;return[1,2,3,4,6].indexOf(e)<0&&(e=e<=0?1:e>6?6:5===e?4:1),e},onWindowResize:function(){this.model.set("numPerRow",this.getNumPerRow())}})});