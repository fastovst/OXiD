define("io.ox/calendar/freetime/model",["settings!io.ox/calendar","io.ox/calendar/model"],function(e,t){"use strict";return Backbone.Model.extend({initialize:function(){var n=moment().startOf(e.get("scheduling/dateRange","week"));this.set({timezone:n.tz(),startDate:n,compact:e.get("scheduling/compact",!1),zoom:e.get("scheduling/zoom","100"),onlyWorkingHours:e.get("scheduling/onlyWorkingHours",!0),startHour:Math.max(parseInt(e.get("startTime",8),10)-1,0),endHour:Math.min(parseInt(e.get("endTime",18),10),24),attendees:new t.AttendeeCollection(null,{resolveGroups:!0}),showFree:e.get("scheduling/showFree",!1),showReserved:e.get("scheduling/showReserved",!0),showFineGrid:e.get("scheduling/showFineGrid",!1),timeSlots:{},dateRange:e.get("scheduling/dateRange","week")})}})});