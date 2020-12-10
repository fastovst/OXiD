define("io.ox/mail/actions/source",["gettext!io.ox/mail","io.ox/mail/api"],function(i,e){"use strict";function t(i,t){return e.get(_.pick(i,"id","folder_id"),{cache:!0}).done(function(i){if((i=i.authenticity)&&(i.spf||i.dkim||i.dmarc)){var e=_.chain(["spf","dkim","dmarc"]).filter(function(e){return i[e]}).map(function(e){if(i[e]&&i[e].reason)return e.toUpperCase()+": "+i[e].reason}).value().join("\n").trim();t.find(".mail-authenticity-view").val(e),t.find("#mail-authenticity-headline, .mail-authenticity-view").toggleClass("hidden",!e)}})}function a(i,t){return e.getSource(i).done(function(i){t.find("textarea.mail-source-view").val(i||"").scrollTop(),t.find(".modal-body").css({visibility:"visible"})})}return function(e){var n=e.first();require(["io.ox/backbone/views/modal"],function(e){new e({title:i("Mail source")+": "+(n.subject||""),width:700,autoFocusOnIdle:!1,addClass:"mail-source-dialog"}).addButton({label:i("Close"),action:"close"}).build(function(){var e=this;this.$el.addClass("mail-source-dialog"),this.$body.append(this.$source=$('<textarea class="form-control mail-source-view" readonly="readonly" aria-labelledby="mail-source">').on("keydown",function(i){27!==i.which&&i.stopPropagation()}),$('<h2 id="mail-authenticity-headline" class="hidden">').text(i("Authentication details")),this.$auth=$('<textarea class="form-control mail-authenticity-view hidden" readonly="readonly" aria-labelledby="mail-authenticity-headline">')),$.when(a(n,this.$el),t(n,this.$el)).done(function(){e.idle(),e.$el.find("textarea.mail-source-view").focus(),_.defer(function(){e.$el.find("textarea.mail-source-view").scrollTop(0)})})}).busy(!0).open()})}});