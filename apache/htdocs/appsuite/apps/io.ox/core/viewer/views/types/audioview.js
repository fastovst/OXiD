define("io.ox/core/viewer/views/types/audioview",["io.ox/core/viewer/views/types/baseview","io.ox/files/api","gettext!io.ox/core"],function(e,i,t){"use strict";return e.extend({initialize:function(){this.isPrefetched=!1},render:function(){var e=this.model.getMimeType()||"",o=this.getPreviewUrl()||"",a=this,r=i.getUrl(this.model.toJSON(),"cover",{width:280,height:280});return this.$el.find("audio").off(),this.$el.empty().append($('<div class="viewer-displayer-item viewer-displayer-audio player-hidden">').append($('<i class="play-button fa fa-play-circle-o">'),$('<div class="player-text">').text(t("Click to play audio file")),$('<img class="cover">').one({load:function(){a.$el.find(".play-button").addClass("cover"),a.$el.find(".player-text").remove()},error:function(){$(this).remove()}}).attr("data-src",_.unescapeHTML(r)),$('<audio controls="true">').attr("preload",_.device("chrome")?"none":"auto").append($("<div>").text(t("Your browser does not support the audio format of this file."))).on({loadeddata:this.onLoadedData.bind(this),error:this.onError.bind(this)}).attr({"data-src":_.unescapeHTML(o),type:e}).hide())),this},onLoadedData:function(){this.$el.find(".play-button,.player-text").remove(),this.$el.find("audio").show()[0].play()},onError:function(){this.$el.idle().find(".viewer-displayer-audio").addClass("player-hidden"),this.$el.find("div.viewer-displayer-notification,play-button,.player-text").remove(),this.$el.append(this.displayDownloadNotification(t("Your browser does not support the audio format of this file.")))},onPlay:function(){var e=this.$el.find("audio");this.$el.find(".play-button").empty().busy(),e.attr("src",e.attr("data-src")),e[0].load()},prefetch:function(){return this.isPrefetched=!0,this},show:function(){var e=this.$el.find("audio"),i=this.$el.find("img.cover");return e.length>0&&(this.$el.find("div.viewer-displayer-notification").remove(),this.$el.idle().find(".viewer-displayer-audio").removeClass("player-hidden"),this.$el.find(".play-button").one("click",this.onPlay.bind(this)),i.attr("src",i.attr("data-src"))),this},unload:function(){return this.disposeElement(),this.isPrefetched=!1,this},disposeElement:function(){var e=this.$el.find("audio");0!==e.length&&(this.$el.find(".viewer-displayer-audio").addClass("player-hidden"),e[0].pause(),e.removeAttr("src"),e[0].load())},onDispose:function(){this.$el.find("audio, img.cover, .play-button").off(),this.disposeElement()}})});