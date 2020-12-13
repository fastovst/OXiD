define("io.ox/core/settings/dialogs/quickLauncherDialog",["io.ox/backbone/views/disposable","gettext!io.ox/core","io.ox/backbone/views/modal","io.ox/core/api/apps","io.ox/core/upsell","io.ox/backbone/mini-views/common","settings!io.ox/core","io.ox/core/main/appcontrol"],function(e,n,t,i,o,a,c,u){"use strict";function s(e){return _(r).findWhere({value:e})?e:""}var r=i.forLauncher().filter(function(e){var n=e.get("requires");return o.has(n)}).map(function(e){return{label:e.getTitle(),value:e.get("path")}}).concat([{label:n("None"),value:"none"}]),l=Backbone.Model.extend({initialize:function(){u.getQuickLauncherItems().forEach(function(e,n){this.set("apps/quickLaunch"+n,s(e))}.bind(this))},toString:function(){return _.range(u.getQuickLauncherCount()).map(function(e){return this.get("apps/quickLaunch"+e)}.bind(this)).join(",")}}),p=e.extend({initialize:function(){this.listenTo(this.model,"change",function(){c.set("apps/quickLaunch",this.model.toString())})},render:function(){return this.$el.append(_.range(u.getQuickLauncherCount()).map(function(e){return this.getMultiSelect("apps/quickLaunch"+e,n("Position %s",e+1),{pos:e})},this)),this},getMultiSelect:function(e,n,t){t=t||{};var i="settings-"+e,o=new a.SelectView({id:i,name:e,model:this.model,list:r,pos:t.pos});return o.listenTo(this.model,"change:"+e,function(){var n=this.model.get(e),t=this.model;"none"!==n&&_(this.model.attributes).each(function(i,o){o!==e&&i===n&&t.set(o,"none")})}),$('<div class="form-group row">').append($('<div class="col-md-12">').append($("<label>").attr("for",i).text(n),o.render().$el))}});return{openDialog:function(){var e=c.get("apps/quickLaunch");new t({title:n("Change quick launch icons"),width:360}).build(function(){this.$body.append(new p({model:new l}).render().$el)}).addCancelButton().addButton({action:"apply",label:n("Save changes")}).on("cancel",function(){c.set("apps/quickLaunch",e).save()}).on("apply",function(){c.save()}).open()}}});