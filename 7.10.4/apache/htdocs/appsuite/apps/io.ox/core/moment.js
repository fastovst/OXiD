define("moment",["static/3rd.party/moment/moment.js"],function(t){return window.moment=t}),define("../moment",["static/3rd.party/moment/moment.js"],function(t){return window.moment=t}),define("static/3rd.party/moment/moment.js",function(){return window.moment}),define("static/3rd.party/moment/moment-timezone-with-data.js",["moment"],function(t){return t}),define("io.ox/core/moment",["settings!io.ox/core","static/3rd.party/moment/moment-timezone-with-data.js"],function(t,e){"use strict";return e.tz.setDefault(t.get("timezone")),e.relativeTimeThreshold("s",60),e.relativeTimeThreshold("m",55),e.relativeTimeThreshold("h",23),e.relativeTimeThreshold("d",29),e.relativeTimeThreshold("M",11),e.fn.local=function(t){return this._isUTC&&(this.utcOffset(0,t),this._isUTC=!1,this._z=e.defaultZone||null,t&&this.subtract(-1*(this._z?this._z.utcOffset(this):15*Math.round(this._d.getTimezoneOffset()/15)),"m")),this},window.moment=e,e});