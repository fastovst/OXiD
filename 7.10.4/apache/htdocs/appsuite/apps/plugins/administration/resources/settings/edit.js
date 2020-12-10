define("plugins/administration/resources/settings/edit",["io.ox/backbone/views/disposable","io.ox/backbone/mini-views/common","io.ox/backbone/views/modal","io.ox/core/api/resource","io.ox/core/notifications","io.ox/contacts/util","gettext!io.ox/core"],function(e,i,n,o,t,a,r){"use strict";var d=e.extend({className:"administration-resource-editor",initialize:function(){this.original=this.model.toJSON()},render:function(){var e;return this.$el.append($('<div class="form-group">').append($("<label>",{for:e=_.uniqueId("input")}).text(r("Resource name (mandatory)")),new i.InputView({name:"display_name",id:e,model:this.model}).render().$el),$('<div class="form-group">').append($("<label>",{for:e=_.uniqueId("input")}).text(r("Description")),new i.TextView({name:"description",id:e,model:this.model,rows:8}).render().$el),$('<div class="form-group">').append($("<label>",{for:e=_.uniqueId("input")}).text(r("Mail address (mandatory)")),new i.InputView({name:"mailaddress",id:e,model:this.model}).render().$el)),this},toJSON:function(){return this.model.toJSON()}});return{open:function(e){e=e||{};var i=o.getModel(e.id).clone(),a=i.has("id");new n({title:r(a?"Edit resource":"Create new resource"),async:!0}).build(function(){this.$body.append((this.view=new d({model:i})).render().$el)}).addCancelButton().addButton({label:r(a?"Save":"Create"),action:"save"}).on("save",function(){var e=this;o[a?"update":"create"](this.view.toJSON()).then(function(){e.close()},function(i){t.yell(i),e.idle()})}).on("close",function(){this.view=null}).open(),i=null}}});