define("io.ox/core/folder/actions/common",["io.ox/mail/api","io.ox/core/folder/api","io.ox/backbone/views/modal","io.ox/core/notifications","gettext!io.ox/core","io.ox/core/api/account","io.ox/core/http"],function(e,o,n,l,t,a,i){"use strict";return{selectOnly:function(e){var o=ox.ui.apps.get("io.ox/calendar");o.folders.isSingleSelection()?o.folders.reset():o.folders.setOnly(e.data.folder.id)},refreshCalendar:function(e){l.yell("warning",t("Refreshing calendar might take some time...")),require(["io.ox/calendar/api"],function(n){n.refreshCalendar(e.data.folder.id).then(function(){l.yell("success",t("Successfully refreshed calendar"))},l.yell).always(function(){o.pool.unfetch(e.data.folder.id),o.refresh()})})},markFolderSeen:function(o){e.allSeen(o.data.folder)},moveAll:function(e){ox.load(["io.ox/core/folder/actions/move"]).done(function(o){o.all({button:t("Move all"),source:e})})},expunge:function(o){l.yell("busy",t("Cleaning up ...")),e.expunge(o).done(function(){l.yell("success",t("The folder has been cleaned up."))})},clearFolder:function(){function r(e,n){o.clear(e).done(function(){l.yell("success",c(n))})}function c(e){switch(e){case"mail":return t("All messages have been deleted");case"infostore":return t("All files have been deleted");default:return t("The folder has been emptied")}}return function(l){o.get(l).done(function(c){new n({title:t('Do you really want to empty folder "%s"?',o.getFolderTitle(c.title,30))}).addCancelButton().addButton({label:t("Empty folder"),action:"delete"}).on("delete",function(){a.is("spam|confirmed_spam",l)?(i.pause(),e.allSeen(l),r(l,c.module),i.resume()):r(l,c.module)}).open()})}}()}});