define("io.ox/backbone/views/datepicker",["io.ox/backbone/views/disposable","io.ox/core/a11y","gettext!io.ox/core","less!io.ox/backbone/views/datepicker"],function(t,e,a){"use strict";function i(t,e){return t.isSame(e,"day")}function s(t){return i(t,moment())}return t.extend({className:"date-picker",events:{"click .btn-prev, .btn-next":"onNavigate","click .btn-today":"onToday","click .switch-mode":"onSwitchMode","click .date":"onSelectDate",keydown:"onKeydown"},constructor:function(e){this.options=e||{},this.datepickerId=_.uniqueId("dp_"),this.$target=$(),this.$parent=$(this.options.parent||"body"),this.date=this.getInitialDate(),this.mode="month",this.closing=!1,t.prototype.constructor.apply(this,arguments),this.renderScaffold(),this.on({select:function(t){this.date=t.clone(),this.close()},dispose:function(){this.$target.off({change:this.onTargetInput,click:this.open,dispose:this.remove,focus:this.open,focusout:this.focusOut,input:this.onTargetInput,keydown:this.onTargetKeydown}).closest(".scrollable").off("scroll",this.close),$(window).off("resize",$.proxy(this.onWindowResize,this))}}),this.focusOut=_.debounce(function(){var t=document.activeElement;this.disposed||this.el!==t&&this.$target[0]!==t&&($.contains(this.el,t)||this.close(!1))},1),this.$el.on("focusout",$.proxy(this.focusOut,this)),this.options.attribute&&this.$el.attr("data-attribute",this.options.attribute),$(window).on("resize",$.proxy(this.onWindowResize,this))},getInitialDate:function(){return this.options.mandatory?null:void 0!==this.options.date?moment(this.options.date):this.getToday()},getToday:function(){return moment().startOf("day")},attachTo:function(t){return this.$target=$(t),this.$target.is(":input")?(this.$target.on("focus click",$.proxy(this.open,this)),this.on("select",function(){this.$target.val(this.getFormattedDate()).trigger("change")})):this.$target.on("click",$.proxy(this.toggle,this)),this.$target.attr({"aria-haspopup":!0}).on("change input",$.proxy(this.onTargetInput,this)).on("keydown",$.proxy(this.onTargetKeydown,this)).on("focusout",$.proxy(this.focusOut,this)).on("dispose",$.proxy(this.remove,this)).closest(".scrollable").on("scroll",$.proxy(this.close,this)),this},toggle:function(){this.isOpen()?this.close():this.open()},open:function(){if(!this.isOpen()&&!this.closing){this.mode="month",this.trigger("before:open"),this.render().$el.appendTo(this.$parent);var t=this.$target.offset()||{top:200,left:600},e=this.$target.outerHeight()||0,a=this.$parent.height();t.top+e+this.$el.outerHeight()>a?this.$el.css({top:Math.max(0,t.top-this.$el.outerHeight())}):this.$el.css({top:t.top+e}),this.$el.css({left:t.left}).addClass("open"),this.$target.is(":input")||this.$el.focus();var i=_.uniqueId("datepicker");this.$el.attr("id",i),this.$target.attr("aria-owns",i),this.trigger("open")}},close:function(t){this.isOpen()&&(this.closing=!0,this.trigger("before:close"),this.$el.removeClass("open"),this.$target.removeAttr("aria-owns"),!1!==t&&this.$target.focus(),this.closing=!1,this.trigger("close"))},isOpen:function(){return this.$el.hasClass("open")},onWindowResize:function(){this.isOpen()&&this.close()},render:function(){switch(this.mode){case"decade":this.renderDecade();break;case"year":this.renderYear();break;default:this.renderMonth()}return this},renderScaffold:function(){var t=_.uniqueId("header");this.$el.attr({"aria-labelledby":t,role:"region",tabindex:-1}).append($('<div class="navigation">').append($('<button type="button" class="btn-prev pull-left"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>'),$('<span role="heading" aria-live="assertive" aria-atomic="true" aria-level="2">').attr("id",t),$('<button type="button" class="btn-next pull-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>')),this.$grid=$('<table class="grid" role="grid" tabindex="0">').attr("aria-label",a("Use cursor keys to navigate, press enter to select a date"))),!1!==this.options.showTodayButton&&this.$el.append($('<button type="button" class="btn-today">').text(a("Today: %1$s",moment().format("l"))))},renderHeader:function(){this.$('[role="heading"]').empty().append(_(arguments).toArray())},renderGrid:function(){this.$grid.empty().append(_(arguments).toArray())},setActiveDescedant:function(t){if(!t){var e=this.$grid.find('[aria-selected="true"]');t=(e.length?e:this.$grid.find("td:first").attr("aria-selected",!0)).attr("id")}this.$grid.attr("aria-activedescendant",t)},setNavigationLabels:function(t,e){this.$(".btn-prev").attr("aria-label",t).find(".fa").attr("title",t),this.$(".btn-next").attr("aria-label",e).find(".fa").attr("title",e)},renderMonth:function(){var t=this.getDate().clone().startOf("day"),e=t.clone(),r=this.datepickerId;this.renderHeader($('<button type="button" class="switch-mode">').attr({"data-mode":"year","data-value":e.year()}).text(e.formatCLDR("yMMMM"))),this.setNavigationLabels(a("Go to previous month"),a("Go to next month")),this.renderGrid($("<thead>").append($('<tr role="row">').append($('<th class="cw weekday">').text(a("CW"))).append(function(){var t=e.clone().startOf("week");return _.range(0,7).map(function(){try{return $('<th class="weekday">').toggleClass("weekend",0===t.day()||6===t.day()).text(t.format("dd"))}finally{t.add(1,"day")}})})),$("<tbody>").append(function(){var n=e.date(1).month(),o=e.clone(),h=e.clone().endOf("month");return e.startOf("week").isAfter(o)&&e.subtract(1,"week"),_.range(0,Math.ceil(h.diff(e,"hours")/168)).map(function(){return $('<tr role="row">').append($('<th class="cw date">').text(e.week())).append(function(){return _.range(0,7).map(function(){try{return $('<td role="gridcell" class="date">').attr({id:r+"_"+e.format("l"),"aria-label":s(e)?a("Today,")+" "+e.format("l, dddd")+", "+a("CW %1$d",e.week()):e.format("l, dddd")+", "+a("CW %1$d",e.week()),"aria-selected":i(e,t),"data-date":e.valueOf()}).toggleClass("outside",e.month()!==n).toggleClass("weekend",0===e.day()||6===e.day()).toggleClass("today",s(e)).text(e.format("D"))}finally{e.add(1,"day")}})})})})),this.setActiveDescedant()},renderYear:function(){var t=this.getDate().month(),e=this.getDate().clone().month(0);this.renderHeader($('<button type="button" class="switch-mode">').attr({"data-mode":"decade","data-value":e.year()}).text(e.format("YYYY"))),this.setNavigationLabels(a("Go to previous year"),a("Go to next year")),this.renderGrid(function(){return _.range(0,4).map(function(){return $('<tr role="row">').append(function(){return _.range(0,3).map(function(){try{return $('<td role="gridcell" class="month switch-mode">').attr({id:"month_"+e.format("YYYY-MM"),"aria-label":e.formatCLDR("yMMMM"),"aria-selected":e.month()===t,"data-mode":"month","data-value":e.month()}).text(e.format("MMM"))}finally{e.add(1,"month")}})})})}),this.setActiveDescedant()},renderDecade:function(){var t=this.getDate().year(),e=this.getDate().clone();e.year(10*Math.floor(e.year()/10)),this.renderHeader($("<caption>").text(e.format("YYYY")+" - "+e.clone().add(12,"years").format("YYYY"))),this.setNavigationLabels(a("Go to previous decade"),a("Go to next decade")),this.renderGrid(function(){return _.range(0,4).map(function(){return $('<tr role="row">').append(function(){return _.range(0,3).map(function(){try{return $('<td role="gridcell" class="year switch-mode">').attr({id:"year_"+e.year(),"aria-selected":e.year()===t,"data-mode":"year","data-value":e.year()}).text(e.format("YYYY"))}finally{e.add(1,"year")}})})})}),this.setActiveDescedant()},onNavigate:function(t){var e=$(t.currentTarget).hasClass("btn-prev")?"subtract":"add",a=this.getDate().clone();switch(this.mode){case"decade":a[e](10,"years");break;case"year":a[e](1,"year");break;default:a[e](1,"month")}this.setDate(a,!0),this.$el.hasClass("open")&&t.stopPropagation()},onToday:function(t){this.$el.hasClass("open")&&t.stopPropagation(),"month"!==this.mode?(this.mode="month",this.setDate(this.getToday()),this.$grid.focus()):this.trigger("select",this.getToday())},switchMode:function(t,e){this.mode=t;var a=this.getDate().clone();switch(this.mode){case"year":a.year(e);break;case"month":a.month(e)}this.setDate(a),this.$grid.focus()},onSwitchMode:function(t){var e=$(t.currentTarget),a=e.data("value");this.switchMode(e.attr("data-mode"),a),this.$el.hasClass("open")&&t.stopPropagation()},onSelectDate:function(t){var e=$(t.currentTarget),a=moment(e.data("date"));e.hasClass("cw")||(this.$el.hasClass("open")&&t.stopPropagation(),this.trigger("select",a))},onKeydown:function(){function t(t){var e=this.$(":input, :button"),i=e.index(t.target),s=t.shiftKey&&0===i&&!!this.$target.length,r=!t.shiftKey&&i===e.length-1&&!!this.$target.length;(s||r)&&t.preventDefault(),this.$target.length&&(s?this.$target.focus():r&&a.call(this))}function a(){var t=e.getTabbable($("body")),a=t.index(this.$target);t.eq(a+1).focus()}function i(t){t.preventDefault(),this.close()}function s(){if(this.$grid[0]===document.activeElement)if("month"===this.mode)this.trigger("select",this.getDate().clone());else{var t=this.$('[aria-selected="true"]'),e=t.attr("data-mode");e&&this.switchMode(e,t.data("value"))}}function r(t){var e={},a=33===t.which?-1:1;switch(this.mode){case"month":e.month=a*(t.shiftKey?12:1);break;case"year":e.year=a*(t.shiftKey?10:1);break;case"decade":e.year=a*(t.shiftKey?100:10)}this.setDate(this.getDate().clone().add(e))}function n(t){var e=35===t.which?"endOf":"startOf";this.setDate(this.getDate().clone()[e]("month"))}function o(t){var e="add",a="horizontal";if(!this.$('[aria-selected="true"]').length)return this.setDate();switch(t.which){case 37:e="subtract";break;case 38:e="subtract",a="vertical";break;case 40:a="vertical"}this.setDate(this.getDate().clone()[e](h[a][this.mode])),this.$grid.focus()}var h={horizontal:{month:{day:1},year:{month:1},decade:{year:1}},vertical:{month:{week:1},year:{months:3},decade:{years:3}}};return function(e){switch(e.which){case 9:return void t.call(this,e);case 13:return void s.call(this,e);case 27:return void i.call(this,e);case 33:case 34:r.call(this,e);break;case 35:case 36:n.call(this,e);break;case 37:case 38:case 39:case 40:o.call(this,e)}e.stopPropagation()}}(),onTargetKeydown:function(t){switch(t.which){case 9:if(t.shiftKey||!this.isOpen())return;t.preventDefault(),this.$el.focus();break;case 27:t.preventDefault();case 13:this.toggle()}},onTargetInput:function(){var t=this.$target.val(),e=moment(t,"l");this.setDate(e)},getDate:function(){return this.date||this.getToday()},getFormattedDate:function(){return this.getDate().format("l")},setDate:function(t,e){if((t=moment(t||this.date)).isValid()&&!(t.year()<=0)){var a=t.isSame(this.getDate());this.date=t;var i,s=function(t){t.length&&(this.$('[aria-selected="true"]').attr("aria-selected",!1),t.attr("aria-selected",!0),this.setActiveDescedant(t.attr("id")))}.bind(this);if(e)this.render();else{switch(this.mode){case"decade":i="#year_"+t.year();break;case"year":i="#month_"+t.format("YYYY-MM");break;case"month":i="#date_"+$.escape(t.format("l"))}var r=this.$grid.find(i);r.length?s(r):this.render()}a||this.trigger("change",t)}}})});