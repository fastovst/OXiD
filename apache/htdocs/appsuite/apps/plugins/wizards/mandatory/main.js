define.async("plugins/wizards/mandatory/main",["io.ox/core/extensions","io.ox/core/tk/wizard","io.ox/backbone/mini-views/common","io.ox/backbone/mini-views/timezonepicker","io.ox/core/api/user","settings!io.ox/core","gettext!io.ox/wizards/firstStart"],function(t,e,n,o,i,s,r){"use strict";return i.getCurrentUser().then(function(i){t.point("io.ox/firstStartWizard").extend({id:"intialize",index:"first",setup:function(){e.registry.add({id:"firstStartWizard"},function(){var n=new e,o=$.Deferred(),r=t.Baton.ensure(n);return r.tour=n,t.point("io.ox/firstStartWizard/steps").invoke("setup",n,r),n.on("stop",function(t){t&&t.cancel?o.reject():(i.save(),s.save(),o.resolve())}),o})}}),t.point("io.ox/firstStartWizard/steps").extend({id:"welcome",index:100,setup:function(){var t=this;this.step().mandatory().title(r.format(r("Welcome to %s"),ox.serverConfig.productName)).content(r("Before you can continue using the product, you have to enter some basic information. It will take less than a minute.")).beforeShow(function(){this.footer($('<button type="button" class="btn pull-left">').text(r("Back to sign in")).on("click",function(){t.trigger("stop",{cancel:!0})}))}).end()}}),t.point("io.ox/firstStartWizard/steps").extend({id:"your_name",index:200,setup:function(){this.step().mandatory().title(r("Your name")).content($('<form class="form-horizontal" />').append($('<div class="control-group" />').append($('<label class="control-label" for="first_name" />').text(r("First name")),$('<div class="controls" />').append(new n.InputView({name:"first_name",model:i}).render().$el)),$('<div class="control-group" />').append($('<label class="control-label" for="last_name" />').text(r("Last name")),$('<div class="controls" />').append(new n.InputView({name:"last_name",model:i}).render().$el)))).beforeShow(function(){var t=this;i.set("first_name"),i.set("last_name"),t.toggleNext(!1),t.parent.options.model.set("paused",[1]),i.on("change",function(){var e=!_.isEmpty($.trim(i.get("first_name")))&&!_.isEmpty($.trim(i.get("last_name")));e&&_.device("smartphone")?t.parent.options.model.set("paused",[]):t.toggleNext(e)})}).on("show",function(){this.$el.find("input:first").focus()}).end()}}),t.point("io.ox/firstStartWizard/steps").extend({id:"timezone",index:300,setup:function(){this.step().mandatory().title(r("Your timezone")).content(new o({name:"timezone",model:s}).render().$el).end()}}),t.point("io.ox/firstStartWizard/steps").extend({id:"start_tour",index:"last",setup:function(){this.start()}}),t.point("io.ox/firstStartWizard").invoke("setup")})});