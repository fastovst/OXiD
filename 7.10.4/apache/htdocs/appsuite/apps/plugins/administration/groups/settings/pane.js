define("plugins/administration/groups/settings/pane",["io.ox/core/extensions","io.ox/backbone/views/disposable","io.ox/core/api/backbone","io.ox/core/tk/list","io.ox/core/api/group","plugins/administration/groups/settings/members","plugins/administration/groups/settings/toolbar","io.ox/core/tk/list-contextmenu","gettext!io.ox/core","less!plugins/administration/groups/settings/style"],function(e,t,i,n,s,o,a,l,r){"use strict";var d=n.extend(l);e.point("plugins/administration/groups/settings/detail").extend({draw:function(){this.removeClass("scrollable-pane").addClass("abs").append((new c).render().$el)}});var c=t.extend({className:"group-administration",events:{"dblclick .list-item":"onDoubleClick"},onDoubleClick:function(e){var t=$(e.currentTarget).attr("data-cid");"0"!==t&&"2147483647"!==t&&require(["plugins/administration/groups/settings/edit"],function(e){e.open({id:t})})},initialize:function(){this.listView=new d({ignoreFocus:!0,pagination:!1,ref:"administration/groups/listview"}),this.listView.toggleCheckboxes(!1),this.listView.getCompositeKey=function(e){return e.id},this.listView.setCollection(s.collection),this.load(),this.listenTo(this.listView,"selection:change",function(e){this.show(e),this.toolbar.update(e)}),this.listenTo(s.collection,"change",function(e){this.$(".detail-pane h2").text(e.get("display_name"))}),this.toolbar=a.create(),this.on("dispose",function(){this.$el.parent().addClass("scrollable-pane").removeClass("abs")})},load:function(){s.getAll({columns:"1,700,701,702"},!1).done(function(e){this.disposed||s.collection.reset(e,{parse:!0})}.bind(this))},show:function(e){if(1===e.length){var t=s.getModel(e[0]);this.$(".detail-pane").empty().append($("<h2>").text(t.get("display_name")),new o.View({model:t}).render().$el)}},render:function(){return this.$el.append($("<h1>").text(r("Groups")),this.toolbar.render().update().$el,$('<div class="abs below-toolbar">').append(this.listView.render().$el.addClass("leftside"),$('<div class="rightside detail-pane">'))),this}});e.point("administration/groups/listview/item").extend({draw:function(e){var t=e.model.get("members").length;this.append($('<div class="bold">').text(e.model.get("display_name")),$('<div class="gray">').text(r.format(r.ngettext("%1$d member","%1$d members",t),t)))}});var p=[{id:"administration/groups/edit",section:"organize",title:r("Edit")},{id:"administration/groups/delete",section:"organize",title:r("Delete")}];e.point("administration/groups/listview/contextmenu").extend(p.map(function(e,t){return _.extend({id:e.id,index:100*(t+1),title:e.title,ref:e.id,section:e.section},e)}))});