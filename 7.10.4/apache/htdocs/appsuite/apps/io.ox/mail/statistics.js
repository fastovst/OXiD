define("io.ox/mail/statistics",["io.ox/mail/api","io.ox/core/api/account","io.ox/core/extensions","io.ox/backbone/views/modal","gettext!io.ox/mail","static/3rd.party/Chart.min.js"],function(t,e,i,o,n,a){"use strict";function r(){return $("<canvas>").attr({width:c,height:u}).css({width:c,height:u})}function s(t,e){var i=t.get(0).getContext("2d");new a(i,{type:"line",data:e,options:{legend:{display:!1},tooltips:{enabled:!1},elements:{line:{backgroundColor:"rgba(0, 136, 204, 0.15)",borderColor:"rgba(0, 136, 204, 0.80)",borderWidth:2},point:{backgroundColor:"rgba(0, 136, 204, 1)",borderColor:"#fff",radius:4}}}})}var d=100;i.point("io.ox/mail/statistics").extend({id:"folder-statistic-from",index:d+=100,draw:function(t){var e=$("<section>").busy();t.statistics.sender(e,{folder:t.folder}),this.append(e)}}),i.point("io.ox/mail/statistics").extend({id:"folder-statistic-weekday",index:d+=100,draw:function(t){var e=$("<section>").busy();t.statistics.weekday(e,{folder:t.folder}),this.append(e)}}),i.point("io.ox/mail/statistics").extend({id:"folder-statistic-hour",index:d+=100,draw:function(t){var e=$("<section>").busy();t.statistics.hour(e,{folder:t.folder}),this.append(e)}});var l="603,604,610",c=_.device("smartphone")?280:500,u=_.device("smartphone")?150:200,f=function(){var e={};return function(i){var o=JSON.stringify(i);return e[o]&&"rejected"!==e[o].state()||(e[o]=t.getAll({folder:i.folder,columns:l},!1)),e[o].promise()}}();return{sender:function(t,i){var o=r(),a=e.is("sent",i.folder);t.append($("<h2>").text(n(a?"Top 10 you sent mail to":"Top 10 you got mail from")),o),f({folder:i.folder,columns:l}).then(function(e){var i={},n=a?"to":"from";_(e).each(function(t){var e=String(t[n]&&t[n][0]&&t[n][0][1]||"").toLowerCase();i[e]=(i[e]||0)+1}),e=_(i).chain().pairs().sortBy(function(t){return-t[1]}).first(10).value(),t.idle(),s(o,{labels:"1 2 3 4 5 6 7 8 9 10".split(" "),datasets:[{data:_(e).pluck(1)}]}),t.append($("<ol>").append(_(e).map(function(t){return $("<li>").append($('<a href="#" class="halo-link">').data({email1:t[0],side:"right"}).text(t[0]+" ("+t[1]+")"))})))},function(){t.idle().empty()})},weekday:function(t,e){var i=r();t.append($("<h2>").text(n("Mails per week-day (%)")),i),f({folder:e.folder,columns:l}).then(function(e){var o=[0,0,0,0,0,0,0],n=moment.weekdaysMin(),a=moment.localeData().firstDayOfWeek();n=n.slice(a,n.length).concat(n.slice(0,a)),_(e).each(function(t){var e=moment(t.received_date).day();o[e]++}),o=_(o).map(function(t){return Math.round(t/e.length*100)}),o=o.slice(a,o.length).concat(o.slice(0,a)),t.idle(),s(i,{labels:n,datasets:[{data:o}]})},function(){t.idle().empty()})},hour:function(t,e){var i=r();t.append($("<h2>").text(n("Mails per hour (%)")),i),f({folder:e.folder,columns:l}).then(function(e){var o=_.times(24,function(){return 0});_(e).each(function(t){var e=moment(t.received_date).hours();o[e]++}),o=_(o).map(function(t){return Math.round(t/e.length*100)}),t.idle(),s(i,{labels:"0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23".split(" "),datasets:[{data:o}]})},function(){t.idle().empty()})},open:function(t){var e=this;new o({top:60,width:600,center:!1,maximize:!0}).build(function(){var o=this,a=this.$body.addClass("statistics");t.folder.getData().done(function(r){var s=i.Baton({data:r,app:t,folder:t.folder.get(),statistics:e});o.$title.text(n("Statistics")+" - "+s.data.title),i.point("io.ox/mail/statistics").invoke("draw",a,s)})}).addButton({label:n("Close"),action:"cancel"}).open()}}});