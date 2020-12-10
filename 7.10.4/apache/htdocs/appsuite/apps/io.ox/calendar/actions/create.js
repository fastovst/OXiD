define("io.ox/calendar/actions/create",["io.ox/core/folder/api","io.ox/backbone/views/modal","io.ox/core/api/user","io.ox/contacts/util","io.ox/calendar/util","gettext!io.ox/calendar","settings!io.ox/calendar"],function(e,t,n,a,o,r,d){"use strict";function i(e){ox.load(["io.ox/calendar/edit/main","io.ox/calendar/model"]).done(function(t,n){t.getApp().launch().done(function(){this.create(new n.Model(e))})})}function l(e,l){n.get({id:l.created_by}).done(function(n){new t({title:r("Appointments in shared calendars"),width:"550",description:[$("<p>").text(r("The selected calendar is shared by %1$s. Appointments in shared calendars will generally be created on behalf of the owner.",a.getFullName(n))+" "),$("<p>").html(r("Do you really want to create an appointment <b>on behalf of the folder owner</b> or do you want to create an appointment <b>with the folder owner</b> in your own calendar?"))]}).addCancelButton({left:!0}).addButton({label:r("Invite owner"),action:"invite",className:"btn-default"}).addButton({label:r("On behalf of the owner"),action:"behalf"}).on("behalf",function(){i(e)}).on("invite",function(){e.attendees=o.createAttendee(n),e.folder=d.get("chronos/defaultFolderId"),i(e)}).open()})}function c(n){var a=e.pool.getModel(n.folder).get("title");new t({title:r("Appointments in public calendars"),description:r('The selected calendar "%1$s" is public. Do you really want to create an appointment in this calendar?',a),width:"550"}).addCancelButton({left:!0}).addButton({label:r("Create in public calendar"),action:"create"}).on("create",function(){i(n)}).open()}return function(t,n){var a={folder:(n=n||{}).folder||t.app.folder.get()};if(n&&n.startDate)_.extend(a,n);else{var r,s=moment().startOf("hour").add(1,"hours"),u=t.app.perspective,f=_.now();switch(u.getName()){case"week":r=o.getCurrentRangeOptions();break;case"month":r={rangeStart:u.current,rangeEnd:moment(u.current).endOf("month")};break;case"year":r={rangeStart:moment({year:u.year}),rangeEnd:moment({year:u.year}).endOf("year")}}r&&(moment(r.rangeStart).valueOf()>f||f>moment(r.rangeEnd).valueOf())&&(s=moment(r.rangeStart).hours(10)),a.startDate={value:s.format("YYYYMMDD[T]HHmmss"),tzid:s.tz()},a.endDate={value:s.add(1,"hours").format("YYYYMMDD[T]HHmmss"),tzid:s.tz()}}e.get(a.folder).then(function(t){return e.can("create",t)?t:(a.folder=d.get("chronos/defaultFolderId"),e.get(a.folder))}).done(function(t){e.can("create",t)&&(e.is("shared",t)?l(a,t):e.is("public",t)?c(a):i(a))})}});