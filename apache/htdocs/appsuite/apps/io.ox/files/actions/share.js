define("io.ox/files/actions/share",["io.ox/backbone/views/modal","io.ox/files/share/wizard","io.ox/core/notifications","gettext!io.ox/files"],function(e,i,n,t){"use strict";return{invite:function(e){if(e)return require(["io.ox/files/share/permissions"],function(i){var n=_.first(e);i.showByModel(n,{share:!0})})},link:function(o){function s(e){f.$footer.find('.btn[data-action="cancel"]').toggle(e),f.$footer.find('.btn[data-action="share"]').text(t(e?"Send link":"Close"))}if(o){var a="",r=o.length,l=o[0],d=1===r?_.ellipsis(l.getDisplayName(),{max:40,charpos:"middle"}):"",c=new i({files:o});l.isFile()?a=t.format(t.ngettext('Sharing link created for file "%1$s"',"Sharing link created for %2$d items",r),d,r):l.isFolder()&&(a=t.format(t.ngettext('Sharing link created for folder "%1$s"',"Sharing link created for %2$d items",r),d,r));var f=new e({async:!0,focus:".link-group>input[type=text]",title:a,point:"io.ox/files/actions/share",help:"ox.appsuite.user.sect.dataorganisation.sharing.link.html",smartphoneInputFocus:!0,width:600});return f.$el.addClass("get-link-dialog"),f.$body.append(c.render().$el),f.on("open",function(){var e=c.$el.find("input.tokenfield").data("bs.tokenfield");e&&e.update()}),f.addCancelButton().addButton({label:t("Close"),action:"share"}).addAlternativeButton({label:t("Remove link"),action:"remove"}),s(!1),f.busy(!0),f.$footer.find(".btn-primary").prop("disabled",!0),f.listenTo(c.model,"error:sync",function(e){return"read"===e?this.close():"update"===e?this.close():void this.idle()}),c.listenTo(c.model,"change:url",function(e){e&&(f.idle(),f.$footer.find(".btn-primary").prop("disabled",!1))}),c.listenTo(c.model,"change:recipients",function(e,i){s(i.length>0)}),f.on("share",function(){c.share().then(this.close,function(){this&&!0===this.disposed||this.idle()}.bind(this))}).on("remove",function(){c.removeLink().then(function(){n.yell("success",t("The link has been removed")),f.close()},function(e){n.yell(e),f.idle()})}),f.open(),f}}}});