define("io.ox/find/view-placeholder",["io.ox/backbone/views/disposable","gettext!io.ox/core"],function(i,e){"use strict";return i.extend({events:{focusin:"focused",keyup:"showSpinner"},initialize:function(i){var e=i.app.getWindow();this.setElement(e.nodes.sidepanel.find(".io-ox-find")),this.ui={field:this.$el.find(".search-field"),action:this.$el.find(".action-show")},this.options=i,this.listenTo(i.app,"view:disable",this.disable),this.listenTo(i.app,"view:enable",this.enable)},hideSpinner:function(){this.ui.action.removeClass("io-ox-busy")},showSpinner:function(){this.ui.action.addClass("io-ox-busy")},disable:function(){!0!==this.ui.field.prop("disabled")&&(this.ui.field.prop("disabled",!0),this.ui.action.prop("disabled",!0),this.ui.field.find("input.token-input.tt-input").removeAttr("tabindex"),this.$el.find(".arialive").text(e("Search function not supported in this folder")))},enable:function(){!1!==this.ui.field.prop("disabled")&&(this.ui.field.prop("disabled",!1),this.ui.action.prop("disabled",!1),this.ui.field.find("input.token-input.tt-input").attr("tabindex",0),this.$el.find(".arialive").text(""))},focused:function(){this.trigger("launch"),this.destroy()},destroy:function(){this.disposed||(this.hideSpinner(),this.trigger("destroy"),this.dispose())}})});