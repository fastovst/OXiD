define("io.ox/search/view-template",["gettext!io.ox/core","io.ox/core/extensions","settings!io.ox/core","io.ox/search/autocomplete/view","io.ox/search/facets/view"],function(e,a,i){"use strict";var o=a.point("io.ox/search/view");o.extend({id:"query",index:100,row:"0",draw:function(i){var o,n=this.find(".mobile-dropdown");i.$.container=n.length?n:void 0,$('<div class="row query">').append($('<div class="col-xs-1 recipient-actions">').append($('<a href="#" class="btn-search maillabel col-xs-2">').append($('<i class="fa fa-search" aria-hidden="true">')),$('<a href="#" class="btn-clear" role="button">').attr("title",e("Clear field")).append($('<i class="fa fa-times" aria-hidden="true">'))),o=$('<div class="col-xs-11">')).appendTo(this),a.point("io.ox/search/autocomplete/searchfield").invoke("draw",o,i),a.point("io.ox/search/autocomplete/tokenfield").invoke("draw",o,i)}}),o.extend({id:"apps",index:200,row:"0",draw:function(e){var o,n=$('<div class="apps col-xs-6 dropdown">'),t=$('<div class="row applications">').append(n),d=e.model.getApp(),s=e.model.getOptions(),p=[],r={},c=i.get("search/modules")||[];c=_.map(c,function(e){var a="io.ox/"+e;return s.mapping[a]||a}),_(c).each(function(e){var a=ox.ui.apps.get(e),i=a?a.get("title"):"";a&&(r[a.id]=i),p.push($("<li>").append($('<a href="#" role="button" tabindex="-1">').attr({title:i,"data-app":e}).append($('<i class="fa fa-fw icon" aria-hidden="true"></i>'),$("<span>").text(i),$('<i class="fa fa-fw" aria-hidden="true"></i>'))))}),n.append($('<a href="#" type="button" class="dropdown-toggle pull-left" data-toggle="dropdown" role="menuitemcheckbox">').append($('<span class="name">'),$('<span class="caret">')),$('<ul class="dropdown dropdown-menu app-dropdown">').append(p)),n.find(".dropdown-toggle").dropdown(),""!==d&&(n.find('[data-app="'+d+'"]').find(".icon").removeClass("fa-none").addClass("fa-check"),n.find(".name").text(r[d])),$("body").on("click",".app-dropdown a",function(a){var i=$(a.target).closest("a").attr("data-app");i&&i!==d&&e.model.setModule(i)}),(o=this.find(".row.applications")).length?o.replaceWith(t):this.append(t),a.point("io.ox/search/facets/facets").invoke("draw",t,e)}}),o.extend({id:"handler",index:260,draw:function(e){a.point("io.ox/search/facets/options-handler").invoke("draw",this,e)}}),o.extend({id:"info",index:300,draw:function(a){var i=a.model.get("items"),o=i.length-a.model.get("extra"),n=i.length<=a.model.get("size")?$('<div class="info">').hide():$('<div class="info">').append($('<span class="info-item">').append(e("More than the currently displayed %1$s items were found",o))),t=this.find(".info");t.length?t.replaceWith(n):this.append(n)}}),o.extend({id:"busy",index:500,draw:function(){this.append($('<div class="row busy">').append($('<div class="col-xs-12 io-ox-busy">').css("min-height","50px")))}}),a.point("io.ox/search/view/mobile").extend({id:"dropdown",index:100,draw:function(){$('<div class="mobile-dropdown col-xs-12">').hide().appendTo(this)}}),a.point("io.ox/search/view/mobile").extend({id:"app",index:100,draw:function(){}})});