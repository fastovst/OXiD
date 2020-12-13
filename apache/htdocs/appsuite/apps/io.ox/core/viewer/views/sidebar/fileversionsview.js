define("io.ox/core/viewer/views/sidebar/fileversionsview",["io.ox/core/viewer/views/sidebar/panelbaseview","io.ox/core/extensions","io.ox/backbone/views/action-dropdown","io.ox/backbone/views/actions/util","io.ox/files/api","io.ox/core/api/user","io.ox/core/viewer/util","gettext!io.ox/core/viewer"],function(e,i,n,t,s,o,r,a){"use strict";var d="io.ox/core/viewer/sidebar/versions",l=t.Action;i.point(d+"/list").extend({index:10,id:"versions-list",draw:function(e){function n(){var e=$("<table>").addClass("versiontable table").attr("data-latest-version",c.length>0&&_.last(c).version).append($("<caption>").addClass("sr-only").text(a("File version table, the first row represents the current version.")),$("<thead>").addClass("sr-only").append($("<tr>").append($("<th>").text(a("File")))));return _.chain(c).clone(t).sort(t).each(function(n){var t=$('<tr class="version">');i.point(d+"/version").invoke("draw",t,i.Baton({data:n,viewerEvents:v,isViewer:l,latestVersion:f===c.length})),e.append(t),f++}),e}function t(e,i){return e.current_version?-c.length:i.current_version?c.length:i.last_modified-e.last_modified}var o,r=e&&e.model,l=Boolean(e&&e.isViewer),v=e&&e.viewerEvents,c=r&&r.get("versions"),h=this.find(".sidebar-panel-heading"),p=this.find(".sidebar-panel-body"),f=1,m=_.contains(_.pluck(c,"version"),r.get("version"));{if(r&&_.isArray(c))return(m?$.when(c):s.versions.load(r.toJSON(),{cache:!1})).then(function(e){c=e,o=n(),h.idle(),p.empty(),p.append(o)});p.empty()}}}),i.point("io.ox/files/versions/links/inline").extend({id:"display-version",index:100,prio:"lo",mobile:"lo",title:a("View this version"),section:"view",ref:"io.ox/files/actions/viewer/display-version"}),new l("io.ox/files/actions/viewer/display-version",{capabilities:"infostore",matches:function(e){var i=e.first();return!!e.isViewer&&!(!i.current_version&&s.isSpreadsheet(i))},action:function(e){e.viewerEvents&&e.viewerEvents.trigger("viewer:display:version",e.data)}}),i.point(d+"/version").extend({index:10,id:"filename",draw:function(e){var i=new n({point:"io.ox/files/versions/links/inline"});i.once("rendered",function(){var i=this.$("> .dropdown-toggle");e.data.current_version&&i.addClass("current"),r.setClippedLabel(i,e.data["com.openexchange.file.sanitizedFilename"]||e.data.filename)}),i.setSelection([e.data],_(e).pick("data","isViewer","viewerEvents","latestVersion")),this.append($('<td class="version-content">').append(i.$el))}}),i.point(d+"/version").extend({id:"created_by",index:20,draw:function(e){var i;this.find("td:last").append(i=$('<div class="createdby">')),o.getName(e.data.created_by).done(function(e){r.setClippedLabel(i,e)}).fail(function(e){console.warn("UserAPI.getName() error ",e),i.text(a("unknown"))})}}),i.point(d+"/version").extend({id:"last_modified",index:30,draw:function(e){var i=moment().isSame(moment(e.data.last_modified),"day"),n=e.data.last_modified?moment(e.data.last_modified).format(i?"LT":"l LT"):"-";this.find("td:last").append($('<div class="last_modified">').text(n))}}),i.point(d+"/version").extend({id:"size",index:40,draw:function(e){var i=_.isNumber(e.data.file_size)?_.filesize(e.data.file_size):"-";this.find("td:last").append($('<div class="size">').text(i))}}),i.point(d+"/version").extend({id:"comment",index:50,draw:function(e){var i;_.isEmpty(e.data.version_comment)||(this.find("td:last").append($('<div class="comment">').append(i=$('<span class="version-comment">'))),r.setClippedLabel(i,e.data.version_comment))}});var v={};return e.extend({className:"viewer-fileversions",initialize:function(i){e.prototype.initialize.apply(this,arguments),_.extend(this,{isViewer:Boolean(i&&i.isViewer),viewerEvents:i&&i.viewerEvents||_.extend({},Backbone.Events)}),this.$el.hide(),this.$el.on({open:this.onOpen.bind(this),close:this.onClose.bind(this)}),this.listenTo(this.model,"change:number_of_versions",this.render),this.listenTo(this.model,"change:versions change:current_version change:number_of_versions change:version change:com.openexchange.file.sanitizedFilename",this.renderVersions)},onOpen:function(){var e=this.$(".sidebar-panel-heading").busy();v[this.model.cid]=!0,s.versions.load(this.model.toJSON(),{cache:!1}).always($.proxy(e.idle,e)).done($.proxy(this.renderVersionsAsNeeded,this)).fail(function(e){ox.debug&&console.error("FilesAPI.versions.load()","error",e)})},onClose:function(){delete v[this.model.cid]},render:function(){if(!this.model)return this;var e=this.model.get("number_of_versions")||0;return this.setPanelHeader(a("Versions (%1$d)",e)),this.$el.toggle(e>1),this.togglePanel(e>1&&!!v[this.model.cid]),this},renderVersions:function(){if(!this.model)return this;i.point(d+"/list").invoke("draw",this.$el,i.Baton({model:this.model,data:this.model.toJSON(),viewerEvents:this.viewerEvents,isViewer:this.isViewer}))},renderVersionsAsNeeded:function(){if(this.$el){var e,i=this.$("table.versiontable"),n=this.model;return i.length&&(e=n.get("versions")||[]).length?i.find("tr.version").length!==e.length?this.renderVersions():i.attr("data-latest-version")!==_.last(e).version?this.renderVersions():void 0:this.renderVersions()}},onDispose:function(){this.model=null}})});