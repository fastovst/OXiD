define("io.ox/mail/mailfilter/vacationnotice/model",["io.ox/core/api/mailfilter","gettext!io.ox/mail"],function(t,e){"use strict";function a(t){var e=t.match(/^(.+)\s<(.+)>$/);return e?e.slice(1,3):t}return Backbone.Model.extend({parse:function(t){if(!_.isArray(t))return{};var e=t[0],a={active:!1,activateTimeFrame:!1,days:"7",internal_id:"vacation",subject:"",text:""};return e&&e.actioncmds[0]?(_.extend(a,e.actioncmds[0]),a.from||(a.from="default"),_(a.addresses).each(function(t){a["alias_"+t]=!0}),a.internal_id=a.id,a.id=e.id,a.active=!!e.active,a.position=e.position,this.parseTime(a,e.test),a):_.extend(a,this.getDefaultRange())},parseTime:function(t,e){function a(e){void 0===e.zone&&(e.zone=function(t){return moment(t).format("Z").replace(":","")}(e.datevalue[0]));var a=moment.utc(e.datevalue[0]).utcOffset(e.zone,!0).local(!1).valueOf();t["ge"===e.comparison?"dateFrom":"dateUntil"]=a}2===_(e).size()?(_(e.tests).each(a),t.activateTimeFrame=!0):"currentdate"===e.id?(a(e),t.activateTimeFrame=!0):_.extend(t,this.getDefaultRange())},getDefaultRange:function(){return{dateFrom:+moment(),dateUntil:+moment().add(1,"week")}},toJSON:function(){function t(t){return moment(t).format("Z").replace(":","")}var i=this.attributes,n=_(i).pick("days","subject","text");n.id=i.internal_id,i.from&&"default"!==i.from&&(n.from=a(i.from)),n.addresses=[i.primaryMail],_(i).each(function(t,e){!0===t&&/^alias_.*@.*$/.test(e)&&n.addresses.push(e.substr(6))}),n.addresses=_.uniq(n.addresses);var r={id:"allof",tests:[]};[["dateFrom","ge"],["dateUntil","le"]].forEach(function(e){var a=i[e[0]],n=e[1];a&&r.tests.push({id:"currentdate",comparison:n,datepart:"date",datevalue:[a+60*moment(a).utcOffset()*1e3],zone:t(a)})}),1===r.tests.length&&i.activateTimeFrame?r=r.tests[0]:0!==r.tests.length&&!1!==i.activateTimeFrame||(r={id:"true"});var s={active:i.active,actioncmds:[n],test:r,flags:["vacation"],rulename:e("vacation notice")};return void 0!==i.position&&(s.position=i.position),void 0!==i.id&&(s.id=i.id),s},sync:function(e,a,i){switch(e){case"create":return t.create(this.toJSON()).done(this.onUpdate.bind(this)).done(i.success).fail(i.error);case"read":return t.getRules("vacation").done(i.success).fail(i.error);case"update":return t.update(this.toJSON()).done(this.onUpdate.bind(this)).done(i.success).fail(i.error)}},save:function(){var t=Backbone.Model.prototype.save.apply(this,arguments);return t||$.Deferred().reject(this.validationError)},onUpdate:function(){ox.trigger("mail:change:vacation-notice",this)},isActive:function(){if(!this.get("active"))return!1;if(!this.get("activateTimeFrame"))return!0;var t=+moment();return this.has("dateFrom")&&this.has("dateUntil")?this.get("dateFrom")<=t&&this.get("dateUntil")+864e5>t:this.has("dateFrom")?this.get("dateFrom")<=t:this.get("dateUntil")+864e5>t},isPast:function(){return this.has("dateUntil")&&this.get("dateUntil")+864e5<+moment()},isReverse:function(){return this.has("dateFrom")&&this.has("dateUntil")&&this.get("dateFrom")>this.get("dateUntil")},getDuration:function(){var t=this.get("dateFrom"),e=this.get("dateUntil");return Math.floor(moment.duration(moment(e+864e5).diff(t)).asDays())},validate:function(){return!!this.get("active")&&(!!this.get("activateTimeFrame")&&(this.isReverse()?{dateUntil:e("The end date must be after the start date.")}:!!this.isPast()&&{dateUntil:e("The time frame is in the past.")}))}})});