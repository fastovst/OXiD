define("plugins/metrics/demo/register",["io.ox/core/metrics/metrics","io.ox/core/metrics/bot/main","settings!io.ox/core/metrics","settings!io.ox/core","settings!io.ox/mail","io.ox/mail/api"],function(t,e,i,o,s,a){"use strict";var n=i.get("demo/inbox","default0/INBOX"),r=i.get("demo/test-folder","default0/INBOX/Test"),l=i.get("demo/subject","Automatic performance test"),c=i.get("demo/first-letters","bigge"),d=i.get("demo/recipient","matthias.biggeleben@open-xchange.com"),u=i.get("demo/cloud-attachment",{folder_id:"13894",id:"63605"}),m=i.get("demo/search-keyword","automatic"),p=i.get("demo/message-with-thumbnails",{folder_id:"default0/INBOX/Test",id:221}),h=i.get("demo/store-folder",73407),f=i.get("demo/trash-folder","default0/INBOX/Trash");o.set("selectionMode","normal"),e.ready(function(){ox.registry.set("mail-compose","io.ox/mail/compose/main"),this.suite(function(){this.test("Open and answer mail",function(){this.step("Switch to mail app",function(t){this.waitForApp("io.ox/mail",t),ox.launch("io.ox/mail/main")}),this.step("Switch to INBOX",function(t){this.waitForFolder(n,t)}),this.step("Wait for list view to update",function(t){this.waitForListView(this.app.listView,"folder="+n,t)}),this.step("Select first message",function(t){if(0===this.app.listView.collection.length)return console.error("No message to reply to");this.app.listView.selection.select(0),this.waitFor(function(){return!$('.io-ox-action-link[data-ref="io.ox/mail/actions/reply"]').hasClass("disabled")}).done(t)}),this.step("Click on reply",function(){$('.io-ox-action-link[data-ref="io.ox/mail/actions/reply"]').click()}),this.step("Wait for editor and write 100 words",function(t){ox.once("mail:reply:ready",function(e,i){i.view.getEditor().done(function(t){t.prependContent("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")}),this.app=i,t()}.bind(this))}),this.step("Send to myself",function(t){this.app.view.model.set({cc:[],bcc:[]});var e=[["Myself",s.get("defaultSendAddress")]];this.app.view.model.set("to",e),this.app.getWindow().nodes.outer.find('.btn-primary[data-action="send"]').click(),ox.once("mail:send:stop",t)}),this.step("Switch back to mail app",function(t){this.waitForSelector(".io-ox-mail-window:visible",t)})}),this.test("Copy and delete mail",function(){this.step("Switch to mail app",function(t){this.waitForApp("io.ox/mail",t),ox.launch("io.ox/mail/main")}),this.step("Switch to INBOX",function(t){this.waitForFolder(n,t)}),this.step("Wait for list view to update",function(t){this.waitForListView(this.app.listView,"folder="+n,t)}),this.step("Select first message",function(){this.app.listView.selection.select(0),this.message=_.cid(this.app.listView.selection.get()[0].replace(/^thread\./,""))}),this.step("Copy selected message to test folder",function(t){var e=this;a.copy(this.message,r).done(function(i){e.message=i[0],t()})}),this.step("Switch to test folder",function(t){this.waitForFolder(r,t)}),this.step("Wait for list view to update",function(t){this.waitForListView(this.app.listView,"folder="+r,t)}),this.step("Select copied message",function(t){this.waitFor(function(){return!$('.io-ox-action-link[data-ref="io.ox/mail/actions/delete"]').hasClass("disabled")}).done(t);var e=_.cid(this.message);this.app.listView.selection.set([e]),this.app.listView.selection.triggerChange()}),this.step("Delete message",function(t){$('.io-ox-action-link[data-ref="io.ox/mail/actions/delete"]').click(),this.waitForEvent(a,"delete",t)}),this.step("Empty trash",function(t){var e=this;this.waitForFolder(f,function(){var i,o;e.waitFor(function(){var t=$("a.folder-options.contextmenu-control");t.length&&!i&&(t.focus().click(),i=!0);var e=$('[data-action="clearfolder"]');return e.length&&!o&&(e.focus().click(),t.click(),o=!0),$('div.modal-footer [data-action="delete"]').length}).done(t)})})}),this.test("Write and send mail",function(){this.step("Open compose dialog",function(t){ox.once("mail:compose:ready",function(e,i){this.app=i,setTimeout(t,500)}.bind(this)),ox.registry.call("mail-compose","open")}),this.step("Enter subject and first 3 letters of recipient",function(t){this.app.view.model.set("subject",l),this.app.view.$(".tokenfield.to .token-input.tt-input").focus().val(c).trigger("input").trigger($.Event("keydown.tt",{keyCode:13,which:13})),t()}),this.step("Wait for auto-complete",function(t){this.waitFor(function(){var t=$(".tt-suggestion").filter(function(){return 0===$(this).find(".participant-email").text().indexOf(d)});return t.click(),t.length}).done(t)}),this.step("Write 100 words",function(t){this.app.view.getEditor().done(function(e){e.setContent("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."),t()})}),this.step("Send message",function(t){this.app.getWindow().nodes.outer.find('.btn-primary[data-action="send"]').click(),ox.once("mail:send:stop",t)}),this.step("Switch back to mail app",function(t){this.waitForSelector(".io-ox-mail-window:visible",t)})}),this.test("Write mail and send with attachment (local)",function(){this.step("Open compose dialog",function(t){ox.once("mail:compose:ready",function(e,i){this.app=i,t()}.bind(this)),ox.registry.call("mail-compose","open")}),this.step("Add attachment",function(t){this.waitForImage("apps/plugins/metrics/demo/test.jpg",function(e){this.app.view.model.get("attachments").add(_.extend(e,{group:"localFile",filename:"test.jpg",lastModified:_.now(),webkitRelativePath:""})),t()}.bind(this))}),this.step("Enter subject and first 3 letters of recipient",function(t){this.app.view.model.set("subject",l+" (local attachment)"),this.app.view.$(".tokenfield.to .token-input.tt-input").focus().val(c).trigger("input").trigger($.Event("keydown.tt",{keyCode:13,which:13})),t()}),this.step("Wait for auto-complete",function(t){this.waitFor(function(){var t=$(".tt-suggestion").filter(function(){return 0===$(this).find(".participant-email").text().indexOf(d)});return t.click(),t.length}).done(t)}),this.step("Write 100 words",function(t){this.app.view.getEditor().done(function(e){e.setContent("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."),t()})}),this.step("Send message",function(t){this.app.getWindow().nodes.outer.find('.btn-primary[data-action="send"]').click(),ox.once("mail:send:stop",t)}),this.step("Switch back to mail app",function(t){this.waitForSelector(".io-ox-mail-window:visible",t)})}),this.test("Write mail and send with attachment (cloud)",function(){this.step("Open compose dialog with attachment from cloud",function(t){ox.once("mail:compose:ready",function(e,i){this.app=i,setTimeout(t,500)}.bind(this)),ox.registry.call("mail-compose","open",{attachments:[{origin:"drive",id:u.id,folder_id:u.folder_id}]})}),this.step("Enter subject and first 3 letters of recipient",function(t){this.app.view.model.set("subject",l+" (cloud attachment)"),this.app.view.$(".tokenfield.to .token-input.tt-input").focus().val(c).trigger("input").trigger($.Event("keydown.tt",{keyCode:13,which:13})),t()}),this.step("Wait for auto-complete",function(t){this.waitFor(function(){var t=$(".tt-suggestion").filter(function(){return 0===$(this).find(".participant-email").text().indexOf(d)});return t.click(),t.length}).done(t)}),this.step("Write 100 words",function(t){this.app.view.getEditor().done(function(e){e.setContent("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."),t()})}),this.step("Send message",function(t){this.app.getWindow().nodes.outer.find('.btn-primary[data-action="send"]').click(),ox.once("mail:send:stop",t)}),this.step("Switch back to mail app",function(t){this.waitForSelector(".io-ox-mail-window:visible",t)})}),this.test("Search and display mail listing",function(){this.step("Switch to mail app",function(t){this.waitForApp("io.ox/mail",t),ox.launch("io.ox/mail/main")}),this.step("Switch to INBOX",function(t){this.waitForFolder(n,t)}),this.step("Wait for list view to update",function(t){this.waitForListView(this.app.listView,"folder="+n,t)}),this.step("Focus search field to load related code",function(t){this.waitForEvent("search:load",t),$(".tokenfield-placeholder").trigger("focusin")}),this.step("Search for particular keyword",function(){$(".token-input.tt-input").trigger("focusin").val(m).trigger("input").trigger($.Event("keydown",{keyCode:13,which:13}))}),this.step("Wait for list view to display results",function(t){this.waitForListView(this.app.listView,"search/",t)})}),this.test("Open a mail with thumbnails",function(){this.step("Switch to mail app",function(t){this.waitForApp("io.ox/mail",t),ox.launch("io.ox/mail/main")}),this.step("Switch to folder",function(t){this.waitForFolder(p.folder_id,t)}),this.step("Wait for list view to update",function(t){this.waitForListView(this.app.listView,"folder="+p.folder_id,t)}),this.step("Select message",function(){var t=_.cid(p);this.app.listView.selection.set([t]),this.app.listView.selection.triggerChange()}),this.step("Wait for attachment list",function(t){this.waitForSelector(".mail-attachment-list .toggle-details",t)}),this.step("Open details and toggle mode",function(){var t=$(".mail-attachment-list");t.find(".toggle-details").click(),t.hasClass("show-preview")||t.find(".toggle-mode").click()}),this.step("Wait for first thumbnail to load",function(t){this.waitFor(function(){var t=$(".mail-attachment-list .item.lazy").css("background-image");return void 0!==t&&"none"!==t}).done(t)})})}).done(function(){t.store.toFile(h,"performance",this.toCSV())})})});