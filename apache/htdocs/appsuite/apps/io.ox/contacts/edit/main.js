define("io.ox/contacts/edit/main",["io.ox/contacts/edit/view","gettext!io.ox/contacts","io.ox/core/tk/upload","io.ox/core/api/user","io.ox/core/extensions","io.ox/contacts/util","io.ox/core/capabilities","io.ox/core/notifications","io.ox/core/util","io.ox/core/a11y","io.ox/core/yell","io.ox/backbone/views/modal","io.ox/core/folder/api","io.ox/core/folder/util","less!io.ox/contacts/edit/style"],function(e,t,i,o,n,a,c,d,r,s,l,u,f,p){"use strict";return{getApp:function(i){var o=ox.ui.createApp({name:"io.ox/contacts/edit",title:t("Edit Contact"),userContent:!0,closable:!0,floating:!_.device("smartphone"),size:"width-sm"});return o.setLauncher(function(){var n=ox.ui.createWindow({name:"io.ox/contacts/edit",chromeless:!0,floating:!_.device("smartphone"),closable:!0});o.setWindow(n);var c=$.Deferred();return i?o.setState(i.id?{folder:i.folder_id,id:i.id}:{folder:i.folder_id}):i={id:o.getState().id,folder_id:o.getState().folder},f.get(i.folder_id).always(function(r){function u(){i.id&&(o.cid="io.ox/contacts/contact:edit."+_.cid(i)),_.device("!smartphone && !iOS")&&s.getTabbable(m.$el).first().focus(),c.resolve()}var f=!i.id,x="6"===String(i.folder_id)&&String(i.id)===String(ox.user_id),g=r&&!r.error&&p.is("public",r),m=o.view=new e({data:i,isUser:x,isPublic:g});x?o.setTitle(t("My contact data")):(o.setTitle(t(f?"New contact":"Edit contact")),m.listenTo(m.model,"change:display_name",function(){o.setTitle(a.getFullName(this.model.toJSON())||t(f?"New contact":"Edit Contact"))})),n.nodes.main.append(m.$el),n.setHeader($('<div class="header">').append($('<button type="button" class="btn btn-primary save" data-action="save">').text(t("Save")).on("click",function(){n.busy(),m.model.save().then(function(){n.idle(),o.quit()},function(e){n.idle(),d.yell(e)})}),$('<button type="button" class="btn btn-default discard" data-action="discard">').text(t("Discard")).on("click",function(){o.quit()}))),n.show(function(){f?(m.render(),u()):(n.busy(),m.model.fetch(i).fail(function(e){l(e),o.quit(),c.reject()}).done(function(){m.model.resetDirty(),n.idle(),m.render(),u()}))})}),c}),o.setQuit(function(){if(!this.view.model.isDirty())return $.when();var e=$.Deferred();return this.getWindow().floating?this.getWindow().floating.toggle(!0):_.device("smartphone")&&this.getWindow().resume(),new u({title:t("Do you really want to discard your changes?")}).addCancelButton().addButton({label:t.pgettext("dialog","Discard changes"),action:"delete"}).on("action",function(t){"delete"===t?e.resolve():e.reject()}).open(),e}),o.failSave=function(){if(!this.view||!this.view.model)return!1;var e=this.view.model,i=e.get("display_name");return{description:t("Contact")+(i?": "+i:""),module:"io.ox/contacts/edit",point:e.toJSON(),passPointOnGetApp:!0}},o.failRestore=function(e){this.view.model.set(e).trigger("change:display_name")},o.getContextualHelp=function(){return"ox.appsuite.user.sect.settings.personaldata.html"},o},reuse:function(e,t){if("edit"===e)return ox.ui.App.reuse("io.ox/contacts/contact:edit."+_.cid(t))}}});