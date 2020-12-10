define("io.ox/core/tk/reminder-util",["gettext!io.ox/core","io.ox/calendar/util","less!io.ox/core/tk/reminder-util"],function(t,e){"use strict";function a(e,a){var n=_.uniqueId("reminder-label-");e.append($("<label>").text(t("Remind me again")).attr("for",n),$('<select class="dateselect" data-action="selector">').attr("id",n).append(function(){for(var e='<option value="0">'+t("Don't remind me again")+"</option>",n=0;n<a.length;n++)e+='<option value="'+a[n][0]+'">'+a[n][1]+"</option>";return e}),$('<button type="button" class="btn btn-primary btn-sm remindOkBtn" data-action="ok">').text(t("OK")))}return{draw:function(n,s,i,o){var r,l,d=$('<div class="reminder-actions">');if(o)r=$('<a class="notification-info" role="button">').append($('<span class="span-to-div title">').text(s.get("title")),$('<span class="span-to-div info-wrapper">').append($('<span class="end_date">').text(s.get("end_time")),$('<span class="status pull-right">').text(s.get("status")).addClass(s.get("badge"))),$('<span class="sr-only">').text(t("Press to open Details"))),l=t("Reminder for task %1$s.",s.get("title"));else{var p=e.getDateTimeIntervalMarkup(s.attributes,{output:"strings",zone:moment().tz()});r=$('<a class="notification-info" role="button">').append($('<span class="span-to-div time">').text(p.timeStr),$('<span class="span-to-div date">').text(p.dateStr),$('<span class="span-to-div title">').text(s.get("summary")),$('<span class="span-to-div location">').text(s.get("location")),$('<span class="sr-only">').text(t("Press to open Details"))),l=t("Reminder for appointment %1$s.",s.get("summary"))}n.attr({"data-cid":s.get("cid"),"model-cid":s.cid,"aria-label":l,role:"listitem",tabindex:0}).addClass("reminder-item clearfix"),a(d,i),n.append(r,d)}}});