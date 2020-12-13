define("io.ox/portal/settings/pane",["io.ox/core/extensions","io.ox/backbone/views/extensible","io.ox/core/manifests","io.ox/portal/settings/widgetview","io.ox/core/upsell","io.ox/portal/widgets","gettext!io.ox/portal","settings!io.ox/portal","io.ox/backbone/mini-views/listutils","io.ox/backbone/mini-views/settings-list-view","io.ox/backbone/mini-views/dropdown","io.ox/core/settings/util","static/3rd.party/jquery-ui.min.js","less!io.ox/portal/style"],function(e,t,i,o,n,a,l,d,r,s,p,c){"use strict";function g(e){e.preventDefault();var t=$(this).attr("data-type"),o=i.manager.getRequirements("plugins/portal/"+t+"/register");n.any(o)?(a.add(t),u()):n.trigger({type:"portal-widget",id:t,missing:n.missing(o)})}function u(){a.loadAllPlugins().done(function(){$(".io-ox-portal-settings-dropdown").children("[role=presentation]").remove().end().append(_(a.getAllTypes()).map(function(e){var t=e.unique&&a.containsType(e.type),i=n.visible(e.requires);return t||!i?$():$('<li role="presentation">').addClass(n.has(e.requires)?void 0:"requires-upsell").append($('<a href="#" role="menuitem">').attr("data-type",e.type).text(e.title))}))})}e.point("io.ox/portal/settings/detail").extend({index:100,id:"view",draw:function(){var e=new t({point:"io.ox/portal/settings/detail/view",model:d}).build(function(){this.listenTo(d,"change:mobile/summaryView",function(){console.log("AHA!"),d.saveAndYell()})});this.append(e.$el.busy()),a.loadAllPlugins().done(function(){e.render().$el.idle()})}});var x=a.getCollection(),m=_.uniqueId("notification_");x.on("remove",function(){u()}),e.point("io.ox/portal/settings/detail/view").extend({index:100,id:"header",render:function(){this.$el.addClass("io-ox-portal-settings").append(c.header(l("Portal settings")))}}),e.point("io.ox/portal/settings/detail/view").extend({index:200,id:"add",render:function(){var e=$('<ul class="dropdown-menu io-ox-portal-settings-dropdown" role="menu">').on("click","a:not(.io-ox-action-link)",g),t=$('<button type="button" class="btn btn-primary dropdown-toggle add-widget" data-toggle="dropdown" aria-haspopup="true">').append($('<i class="fa fa-plus" aria-hidden="true">'),$("<span>").text(l("Add widget")+" "),$('<i class="fa fa-caret-down" aria-hidden="true">'));this.$el.append($('<div class="form-group buttons">').append(new p({className:"btn-group-portal",$ul:e,$toggle:t}).render().$el,$('<div class="sr-only" role="log" aria-live="assertive" aria-relevant="additions text">').attr("id",m))),u()}});var b=function(){var e={default:l("Default"),black:l("Black"),gray:l("Gray"),red:l("Red"),orange:l("Orange"),lightgreen:l("Light green"),green:l("Green"),lightblue:l("Light blue"),blue:l("Blue"),purple:l("Purple"),pink:l("Pink")};return function(t,i){return $('<div class="action dropdown colors">').append(r.appendIconText($('<a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true">').attr({"aria-label":l("Color %1$s",i)}),l("Color"),"color",t),$('<ul class="dropdown-menu" role="menu">').append(_(e).map(function(e,i){return $('<li role="presentation">').append($('<a href="#" data-action="change-color" role="menuitem">').attr("data-color",i).append($('<span class="color-example">').addClass("color-"+i),$.txt(e)).addClass(i===t?"active-color":void 0))})))}}();return e.point("io.ox/portal/settings/detail/list-item").extend({id:"state",index:100,draw:function(e){var t=e.model.toJSON();this.toggleClass("disabled",!t.enabled)}}),e.point("io.ox/portal/settings/detail/list-item").extend({id:"drag-handle",index:200,draw:function(e){if(!_.device("smartphone")){var t=e.model.toJSON(),i=t.protectedWidget&&t.changeable&&t.changeable.index;this.addClass(t.protectedWidget&&!i?"protected":" draggable").append(t.protectedWidget&&!i?$('<div class="spacer">'):r.dragHandle(l("Drag to reorder widget"),e.model.collection.length<=1?"hidden":""))}}}),e.point("io.ox/portal/settings/detail/list-item").extend({id:"title",index:400,draw:function(t){var i=t.model.toJSON(),o=e.point(t.view.point),n=a.getTitle(i,o.prop("title"));this.append(r.makeTitle(n).addClass("widget-color-"+(i.color||"black")+" widget-"+i.type).removeClass("pull-left"))}}),e.point("io.ox/portal/settings/detail/list-item").extend({id:"controls",index:500,draw:function(t){var i=t.model.toJSON(),o=e.point(t.view.point),n=a.getTitle(i,o.prop("title"));if(i.protectedWidget)this.append("&nbsp;");else{var d=r.makeControls(),s=r.controlsToggle();if(i.enabled){t.view.options.editable&&d.append(r.appendIconText(r.controlsEdit({"aria-label":l("Edit %1$s",n)}),l("Edit"),"edit"));var p=b(i.color,n);_.device("smartphone")&&p.find('[data-action="change-color"]').on("click",function(e){t.view.onChangeColor(e)}),d.append(p),_.device("!smartphone")&&d.append(r.appendIconText(s.attr({"aria-label":l("Disable %1$s",n)}),l("Disable"),"disable"))}else d.append(r.appendIconText(s.attr({"aria-label":l("Enable %1$s",n)}),l("Enable"),"enable"));d.append(r.controlsDelete({title:l("Remove %1$s",n)})),this.append(d)}}}),e.point("io.ox/portal/settings/detail/view").extend({index:300,id:"list",render:function(){this.$el.append(new s({collection:x,sortable:!0,containment:this.$el,notification:this.$("#"+m),childView:o,dataIdAttribute:"data-widget-id",childOptions:function(e){return{point:"io.ox/portal/widget/"+e.get("type")}},filter:function(e){var t=_.isObject(e.get("changeable"))&&!0===e.get("changeable").enabled,i=_.any(e.get("changeable"),function(e){return!0===e});return(!0!==e.get("protectedWidget")||!0===e.get("enabled")&&!t)&&!(!0===e.get("protectedWidget")&&!0===e.get("enabled")&&!i)}}).on("add",function(e){"io.ox/portal"!==ox.ui.App.getCurrentApp().get("name")&&e.edit()}).on("order:changed",function(){a.getCollection().trigger("order-changed","settings"),a.save(this.$el)}).render().$el)}}),e.point("io.ox/portal/settings/detail/view").extend({index:500,id:"summaryView",render:function(){this.$el.append(c.fieldset(l("Smartphone settings:"),$('<div class="form-group">').append(c.checkbox("mobile/summaryView",l("Reduce to widget summary"),d))))}}),{}});