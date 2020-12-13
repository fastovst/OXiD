define("io.ox/find/api",["io.ox/core/http","io.ox/core/cache","io.ox/core/api/factory","settings!io.ox/contacts"],function(e,t,o,n){"use strict";function i(e){var t=e.params.module,n=d[t],i={};return n.extendColumns&&n.columns&&(i.columns=o.extendColumns(n.extendColumns,t,n.columns)),n.extendFields&&n.fields&&(i.fields=o.extendColumns(n.extendFields,t,n.fields)),{params:i}}function a(e){var t=_.copy(s.options.requests[e],!0);return _.extend(t.data.options,{admin:n.get("showAdmin",!1)}),t}var s=o({id:"search",module:"find",requests:{autocomplete:{module:"find",method:"PUT",params:{action:"autocomplete",module:"",limit:6},data:{prefix:"",options:{timezone:"UTC"},facets:[]}},query:{module:"find",method:"PUT",params:{action:"query",module:""},data:{facets:[],options:{timezone:"UTC"},start:0,size:100}}}}),d={mail:{columns:e.defaultColumns.mail.search,extendColumns:"io.ox/mail/api/list"},files:{columns:"20,23,1,5,700,702,703,704,705,707,3",extendColumns:"io.ox/files/api/list"},tasks:{columns:"1,20,101,200,202,203,220,300,301,309",extendColumns:"io.ox/tasks/api/list"},contacts:{columns:"20,1,101,500,501,502,505,520,524,555,556,557,569,592,602,606,607,5",extendColumns:"io.ox/contacts/api/list"},calendar:{fields:"color,createdBy,endDate,flags,folder,id,location,recurrenceId,seriesId,startDate,summary,timestamp",extendFields:"io.ox/calendar/api/fields"}},c=new t.SimpleCache("find/autocomplete");return s.cid=function(e){return JSON.stringify(e)},s.config=function(e){var t=$.extend(!0,{},a("autocomplete"),e);return t.data.options.check=!1,s.autocomplete(t)},s.autocomplete=function(t){var o=$.extend(!0,{},a("autocomplete"),t),n=s.cid(o);return c.get(n).then(function(t){return null!==t?t:e[o.method](o).then(c.add.bind(this,n))})},s.resetCache=function(){c.clear()},s.query=function(t){var o=$.extend(!0,{},a("query"),i(t),t);return e[o.method](o)},s});