define("io.ox/core/api/apps",["io.ox/core/extensions","io.ox/core/manifests","io.ox/core/capabilities","settings!io.ox/core"],function(i,o,t,e){"use strict";function n(i){return i&&!this.blacklist[i.id]}var s=["io.ox/mail","io.ox/calendar","io.ox/contacts","io.ox/files","io.ox/portal","io.ox/tasks","io.ox/office/portal/text","io.ox/office/portal/spreadsheet","io.ox/office/portal/presentation"];ox.debug&&s.push("io.ox/notes");var a=Backbone.Model.extend({constructor:function(i,o){Backbone.Model.call(this,{id:i},o)}}),c=Backbone.Collection.extend({model:a}),l=Backbone.Collection.extend({initialize:function(){if(this.blacklist=_.reduce(e.get("apps/blacklist","").split(","),function(i,o){return i[o]=!0,i},{}),this.launcher=new c(s),e.contains("apps/list")){var i=e.get("apps/list").split(",");this._launcher=new c(i)}else this._launcher=this.launcher;this._launcher.on("all",function(){var i=Array.prototype.slice.call(arguments);i[0]="launcher:"+i[0],this.trigger.apply(this,i)},this)},forLauncher:function(){return _.filter(this._launcher.map(this.get.bind(this)),n,this)}});return ox.ui.apps=new l,ox.ui.apps});