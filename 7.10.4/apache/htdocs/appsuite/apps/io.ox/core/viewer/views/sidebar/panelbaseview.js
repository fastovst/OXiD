define("io.ox/core/viewer/views/sidebar/panelbaseview",["io.ox/backbone/views/disposable","gettext!io.ox/core/viewer"],function(e,a){"use strict";return e.extend({initialize:function(e){var n=_.uniqueId("panel-");this.$el.addClass("sidebar-panel"),(e=_.extend({fixed:!1},e)).fixed?this.$el.append($('<div class="sidebar-panel-heading">').append($('<h3 class="sidebar-panel-title">').text(" ")),$('<div class="sidebar-panel-body">')):(this.$el.append($('<div class="sidebar-panel-heading">').append($('<h3 class="sidebar-panel-title">').text(" "),$('<a href="#" class="panel-toggle-btn" role="button" aria-expanded="false">').attr({title:a("Toggle panel"),"aria-controls":n}).append($('<span class="sr-only">').text(a("Open description panel")),$('<i class="fa fa-chevron-right toggle-icon" aria-hidden="true">'))),$('<div class="sidebar-panel-body panel-collapsed" aria-hidden="true">').attr({id:n})),this.$el.on("click",".sidebar-panel-heading",this.onTogglePanel.bind(this)))},setPanelHeader:function(e){return this.$(".sidebar-panel-title").text(e||" "),this},setPanelBody:function(){var e=this.$(".sidebar-panel-body");e.empty().append.apply(e,arguments)},appendToPanelBody:function(){var e=this.$(".sidebar-panel-body");e.append.apply(e,arguments)},onTogglePanel:function(e){e.preventDefault(),this.togglePanel()},togglePanel:function(e){return void 0===e&&(e=this.$(".sidebar-panel-body").hasClass("panel-collapsed")),this.$(".sidebar-panel-body").toggleClass("panel-collapsed",!e).attr("aria-hidden",!e),this.$(".panel-toggle-btn").attr("aria-expanded",e),this.$(".panel-toggle-btn > .sr-only").text(a(e?"Close description panel":"Open description panel")),this.$(".toggle-icon").toggleClass("fa-chevron-right",!e).toggleClass("fa-chevron-down",e),this.$el.trigger(e?"open":"close"),this},render:function(){return this}})});