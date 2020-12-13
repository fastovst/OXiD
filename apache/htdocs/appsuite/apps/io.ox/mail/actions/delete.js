define("io.ox/mail/actions/delete",["io.ox/core/folder/api","settings!io.ox/mail","io.ox/core/api/account","gettext!io.ox/mail","io.ox/mail/api","io.ox/core/notifications"],function(e,t,o,i,n,l){"use strict";function a(e){return i.ngettext("Do you want to permanently delete this mail?","Do you want to permanently delete these mails?",e.length)}function r(e){var t={};return _.each(ox.ui.App.get("io.ox/mail/compose"),function(e){e.view&&(t[e.view.model.get("msgref")]=!0)}),Object.keys(t).length?_.filter(e,function(e){return!o.is("drafts",e.folder_id)||(!e.attachment||!t[e.msgref])}):e}return n.on("delete:fail:quota",function(e,t,o){require(["io.ox/backbone/views/modal"],function(e){new e({title:i("Mail quota exceeded"),previousFocus:$('[data-ref="io.ox/mail/listview"]')}).on("delete",function(){n.remove(o,o,!0)}).addCancelButton().addButton({action:"delete",label:i("Delete")}).build(function(){this.$body.append($("<div>").text(i("Emails cannot be put into trash folder while your mail quota is exceeded.")),$("<div>").text(a(o)))}).open()})}),function(c){var d=e.ignoreSentItems(c.array()),u=d.slice(),s=c&&c.options.shiftDelete&&t.get("features/shiftDelete"),f=!s&&(t.get("removeDeletedPermanently")||_(d).any(function(e){return o.is("trash",e.folder_id)}));if(d=r(d),u.length!==d.length){if(l.yell({headline:i("Note"),type:"info",message:i("Currently edited drafts with attachments can not be deleted until you close the correspondig mail compose window.")}),!d.length)return;u=d.slice()}f?require(["io.ox/backbone/views/modal"],function(e){new e({title:a(d)}).addCancelButton().addButton({label:i("Delete"),action:"delete"}).on("delete",function(){n.remove(d,u).fail(l.yell)}).on("cancel",function(){ox.trigger("delete:canceled",d)}).open()}):n.remove(d,u,s).fail(function(e){"MSG-0039"!==e.code&&l.yell(e)})}});