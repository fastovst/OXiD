define("io.ox/contacts/distrib/main",["io.ox/contacts/api","io.ox/contacts/model","io.ox/contacts/distrib/create-dist-view","io.ox/backbone/views/modal","gettext!io.ox/contacts","less!io.ox/contacts/distrib/style"],function(e,t,i,o,n){"use strict";return{getApp:function(a){var s,d,r,l,c=!1;return s=ox.ui.createApp({name:"io.ox/contacts/distrib",title:n("Distribution List"),userContent:!0,closable:!0,floating:!_.device("smartphone")}),s.getContextualHelp=function(){return"ox.appsuite.user.sect.contacts.gui.createlist.html"},s.create=function(e,o){function u(){s.quit()}l=_.extend({mark_as_distributionlist:!0,last_name:""},a||{},{folder_id:e}),d.setTitle(n("Create distribution list")),s.model=o?t.factory.create({display_name:o.display_name?o.display_name:"",folder_id:e,mark_as_distributionlist:!0,distribution_list:o.distribution_list,last_name:""}):t.factory.create(l),s.view=new i({model:s.model,app:this}),s.model.on({"sync:start":function(){d.busy()},sync:function(){var e=_.lfo(u);require("io.ox/core/notifications").yell("success",n("Distribution list has been saved")),c=!0,d.idle(),e()},"sync:fail":function(e){require("io.ox/core/notifications").yell("error",e.error?e.error:n("Failed to save distribution list.")),d.idle()}}),r.append(s.view.render().$el),d.show()},s.edit=function(o){return s.cid="io.ox/contacts/group:edit."+_.cid(o),t.factory.realm("edit").retain().get(e.reduce(o)).done(function(e){s.model=e,s.setState({folder:s.model.get("folder_id"),id:s.model.get("id")}),s.setTitle(s.model.get("display_name")),d.setTitle(n("Edit distribution list")),s.view=new i({model:s.model,app:s}),s.model.on("change:display_name",function(){s.model.set("last_name",s.model.get("display_name"))}),s.model.on({"sync:start":function(){d.busy()},sync:function(){require("io.ox/core/notifications").yell("success",n("Distribution list has been saved")),c=!0,d.idle(),s.quit()},"sync:fail":function(e){require("io.ox/core/notifications").yell("error",e.error?e.error:n("Failed to save distribution list.")),d.idle()}}),d.on("show",function(){s.model.get("id")?s.setState({folder:s.model.get("folder_id"),id:s.model.get("id")}):s.setState({folder:s.model.get("folder_id"),id:null})}),r.append(s.view.render().$el),d.show()})},s.setLauncher(function(){function e(e){s.getWindow().nodes.footer.find('.btn[data-action="save"]').prop("disabled",!e)}s.setWindow(d=ox.ui.createWindow({chromeless:!0,name:"io.ox/contacts/distrib",title:n("Distribution List"),floating:!_.device("smartphone"),closable:!0})),d.on("show",function(){r.find('[data-extension-id="displayname"] input').val()||s.getWindow().nodes.footer.find('.btn[data-action="save"]').prop("disabled",!0),_.device("!smartphone && !iOS")&&r.find("input[type=text]:visible").eq(0).focus(),r.find('[data-extension-id="displayname"] input').on("keyup",_.debounce(function(){s.setTitle($.trim($(this).val())||n("Distribution List")),e($(this).val().trim())},150))}),r=$("<div>").addClass("create-distributionlist container"),d.nodes.main.addClass("scrollable").append(r);var t=s.getState();if("app"in t&&"io.ox/contacts"!==t.app)return $.when();s.attributes.floating||("id"in t?s.edit(t):"folder"in t&&s.create(t.folder))}),s.setQuit(function(){var e=$.Deferred();return s.model.isDirty()&&!1===c?_.isEqual(l,s.model.changedSinceLoading())?e.resolve():(s.getWindow().floating?s.getWindow().floating.toggle(!0):_.device("smartphone")&&s.getWindow().resume(),new o({title:n("Do you really want to discard your changes?")}).addCancelButton().addButton({label:n.pgettext("dialog","Discard changes"),action:"delete"}).on("action",function(t){"delete"===t?(s.model.factory.realm("edit").release(),e.resolve()):(s.model.factory.realm("edit").destroy(),e.reject())}).open()):(s.model.factory.realm("edit").release(),e.resolve()),e}),s},reuse:function(e,t){if("edit"===e)return ox.ui.App.reuse("io.ox/contacts/group:edit."+_.cid(t))}}});