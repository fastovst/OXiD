define("io.ox/mail/categories/edit",["io.ox/mail/categories/api","io.ox/backbone/views/modal","io.ox/core/tk/hotspot","io.ox/core/yell","settings!io.ox/mail","gettext!io.ox/mail"],function(e,t,a,n,i,o){"use strict";function s(){return i.get("categories/enabled")}function l(){$(this).parent().find(".name.sr-only").text($(this).val().trim())}function c(e){var t=_.uniqueId("category-item");return $('<div class="category-item">').attr("data-id",e.get("id")).append($('<div class="checkbox custom">').append($("<label>").attr("for",t).append($('<input type="checkbox" class="sr-only">').attr("id",t).prop({checked:e.isEnabled(),disabled:!e.can("disable")}).toggleClass("disabled",!e.can("disable")),$('<i class="toggle" aria-hidden="true">'),$('<span class="name">').text(e.get("name")||"").toggleClass("sr-only",e.can("rename")))),e.can("rename")?[$('<label class="sr-only">').attr("for","i-"+t).text(o("Category name")),$('<input type="text" class="form-control name">').attr({id:"i-"+t,placeholder:o("Name")}).val(e.get("name")).on("keyup change",l)]:$(),e.get("description")?$('<div class="description">').text(e.get("description")):$())}return{open:function(){return new t({async:!0,collection:e.collection,enter:"save",maximize:!1,point:"io.ox/mail/categories/edit",title:o("Configure categories")}).inject({onSave:function(){this.collection.update(this.$(".category-item").map(function(){return{id:$(this).attr("data-id"),name:$(this).find(".name").text(),enabled:$(this).find('[type="checkbox"]').prop("checked")}}).toArray()).done(function(){i.set("categories/enabled",!0)}).always(this.close.bind(this))},onToggle:function(){i.set("categories/enabled",!s()),s()||(_.delay(function(){a.add($('.dropdown[data-dropdown="view"]')),n("info",o("You can enable categories again via the view dropdown on the right")).on("notification:removed",function(){a.removeAll()})},300),this.close())}}).extend({default:function(){this.$body.addClass("mail-categories-dialog").append(this.collection.map(c))},"locked-hint":function(){this.collection.filter(function(e){return!e.can("disable")||!e.can("rename")}).length&&this.$body.append($('<div class="hint">').text(o("Please note that some categories are predefined and you might not be able to rename or disable them.")))},register:function(){this.on("save",this.onSave),this.on("toggle",this.onToggle)}}).addAlternativeButton({label:o("Disable categories"),action:"toggle",className:s()?"btn-default":"hidden"}).addButton({label:o("Cancel"),action:"cancel",className:"btn-default"}).addButton({label:o("Save"),action:"save"}).open()}}});