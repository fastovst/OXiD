define("plugins/portal/twitter/util",["plugins/portal/twitter/network","gettext!plugins/portal","io.ox/core/notifications"],function(e,t,r){"use strict";var n,o,i,a=280,s=function(e,t){var r,n={};_(t.hashtags).each(function(e){var t=$('<a target="_blank" rel="noopener">').attr("href","https://twitter.com/#!/search/%23"+e.text).text("#"+e.text);n[e.indices[0]]={elem:t,indices:e.indices}}),_(t.urls).each(function(e){var t=$('<a target="_blank" rel="noopener">').attr("href",e.expanded_url).text(e.display_url);n[e.indices[0]]={elem:t,indices:e.indices}}),_(t.user_mentions).each(function(e){var t=$('<a target="_blank" rel="noopener">').attr("href","https://twitter.com/#!/"+e.screen_name).text("@"+e.screen_name);n[e.indices[0]]={elem:t,indices:e.indices}}),r=e.match(/http:\/\/t\.co\/\w+/gi),_(r).each(function(t){var r=e.indexOf(t),o=t.length;-1===_(n).keys().indexOf(r.toString())&&(n[r]={elem:$("<a>",{href:t}).text(t),indices:[r,r+o]})});var o=_(n).keys().sort(function(e,t){return e-t}),i=$("<span>"),a=0;return _(o).each(function(t){var r=n[t];i.append(e.substring(a,r.indices[0])).append(r.elem),a=r.indices[1]}),a<e.length&&i.append(e.substr(a,e.length)),i},l=function(n,o){var i;i=n.favorited?e.unFavoriteTweed({id:n.id_str}):e.favoriteTweed({id:n.id_str}),$.when(i).then(function(e){var i=JSON.parse(e);n.favorited=!n.favorited,i.errors?_.isArray(i.errors)?r.yell("error",i.errors[0].message):r.yell("error",i.errors):n.favorited?o.find(".io-ox-twitter-favorite").addClass("favorited").attr({"aria-pressed":"true"}).text(t("Favorited")):o.find(".io-ox-twitter-favorite").removeClass("favorited").attr({"aria-pressed":"false"}).text(t("Favorite"))},function(){r.yell("error",t("An internal error occurred"))})},d=function(n,o){require(["io.ox/backbone/views/modal"],function(i){new i({title:t("Retweet this to your followers?")}).build(function(){this.$body.append($('<div class="twitter">').append(u(n,{hideLinks:!0,hideFollowButton:!0})))}).addCancelButton().addButton({label:t("Retweet"),action:"retweet"}).on("retweet",function(){$.when(e.retweet(n.id_str)).then(function(e){var i=JSON.parse(e);i.errors?_.isArray(i.errors)?r.yell("error",i.errors[0].message):r.yell("error",i.errors):(o.find(".io-ox-twitter-retweet").addClass("retweeted").attr({"aria-pressed":"true"}).text(t("Retweeted")),n.retweeted=!0)},function(){r.yell("error",t("An internal error occurred"))})}).open()})},u=function(e,r){var n="https://twitter.com/"+e.user.screen_name+"/status/"+e.id_str,o="https://twitter.com/"+e.user.screen_name,a=moment(e.created_at).format("l LT"),l=$('<li class="tweet">').data("entry",e),d=e.user.id_str===i,u=void 0===r||void 0===r.hideFollowButton||!r.hideFollowButton,v=void 0===r||void 0===r.hideLinks||!r.hideLinks;return void 0!==r&&r.offline&&(u=!0,v=!0),!d&&u&&l.append(h(e)),l.append($('<a target="_blank" rel="noopener">').attr("href",o).append($("<img>",{src:e.user.profile_image_url_https,class:"profilePicture",alt:e.user.description})),$('<div class="text">').append($('<strong class="io-ox-twitter-name">').append($('<a target="_blank" rel="noopener">').attr("href",o).text(e.user.name)),"<br />",$('<a class="name" target="_blank" rel="noopener">').attr("href",o).text("@"+e.user.screen_name),"<br />",s(e.text,e.entities))),v&&(l.append($('<div class="io-ox-twitter-details">').append($('<a class="io-ox-twitter-date" target="_blank" rel="noopener">').attr("href",n).text(a),c(e,l),d?p(e,l):f(e,l),w(e,l))),e.favorited&&l.find(".io-ox-twitter-favorite").addClass("favorited").text(t("Favorited")),e.retweeted&&l.find(".io-ox-twitter-retweet").addClass("retweeted").text(t("Retweeted"))),l},c=function(e){return $('<a class="io-ox-twitter-reply" role="button">').text(t("Reply")).attr("href","https://twitter.com/intent/tweet?in_reply_to="+e.id_str)},f=function(n,o){return $('<a href="#" class="io-ox-twitter-retweet" role="button">').text(t("Retweet")).on("click",function(i){i.preventDefault(),n.retweeted?e.deleteRetweet(n.id_str).then(function(e){var n=JSON.parse(e);n.errors?_.isArray(n.errors)?r.yell("error",n.errors[0].message):r.yell("error",n.errors):o.find(".io-ox-twitter-retweet").removeClass("retweeted").attr({"aria-pressed":"false"}).text(t("Retweet"))},function(){r.yell("error",t("An internal error occurred"))}):d(n,o)})},p=function(e,r){return $('<a href="#" class="io-ox-twitter-delete" role="button">').append($('<i class="fa fa-trash-o" aria-hidden="true">'),$("<span>").text(t("Delete")).on("click",function(t){t.preventDefault(),m(e,r)}))},w=function(e,r){return $('<a href="#" class="io-ox-twitter-favorite" role="button">').text(t("Favorite")).on("click",function(t){t.preventDefault(),l(e,r)})},v=function(e,t){var r=o.find('div[user_id="'+e+'"]');x(r,t,!1),n.keys().done(function(r){_(r).each(function(r){n.get(r).done(function(r){r.user.id_str===e&&(r.user.following=t)})})})},x=function(e,r,n){(r=r||!1)?n?e.empty().text(t("Unfollow")).removeClass("btn-primary").addClass("btn-danger following").attr({"aria-pressed":"true"}):e.empty().text(t("Following")).removeClass("btn-danger").addClass("btn-primary following").attr({"aria-pressed":"true"}):e.empty().append($("<div>").text(t("Follow"))).removeClass("btn-primary btn-danger following").attr("aria-pressed","false")},h=function(n){var o=$('<div class="io-ox-twitter-follow btn btn-default small" role="button">').attr("user_id",n.user.id_str);return n.following=n.following||!1,x(o,n.user.following,!1),o.on("click",function(i){var a;i.preventDefault(),a=o.hasClass("following")?e.unfollowUser({user_id:n.user.id_str}):e.followUser({user_id:n.user.id_str}),$.when(a).then(function(e){var t=JSON.parse(e);t.errors?_.isArray(t.errors)?r.yell("error",t.errors[0].message):r.yell("error",t.errors):(n.user.following=!o.hasClass("following"),v(n.user.id_str,n.user.following))},function(){r.yell("error",t("An internal error occurred"))})}).hover(function(){x(o,o.hasClass("following"),!0)},function(){x(o,o.hasClass("following"),!1)})},m=function(o,i){require(["io.ox/backbone/views/modal"],function(a){new a({title:t("Are you sure you want to delete this Tweet?")}).build(function(){this.$body.append($('<div class="twitter">').append(u(o,{hideLinks:!0,hideFollowButton:!0})))}).addCancelButton().addButton({label:t("Delete"),action:"delete"}).on("delete",function(){$.when(e.deleteTweet(o.id_str)).then(function(e){var t=JSON.parse(e);t.errors?_.isArray(t.errors)?r.yell("error",t.errors[0].message):r.yell("error",t.errors):(i.remove(),n.remove(o.id_str))},function(){r.yell("error",t("An internal error occurred"))})}).open()})};return{setup:function(e){o=e.$tweets,n=e.tweetCache},showTweet:function(e,r){if(e.retweeted_status){var n=u(e.retweeted_status,r);return n.find(".text").append($('<div class="io-ox-twitter-retweet-source">').append($('<i class="fa fa-retweet" aria-hidden="true">')," ",$("<span>").text(t("Retweeted by %s",e.user.screen_name)))),n}return u(e,r)},TwitterTextBox:function(e,t){function r(){var e=/\b(https?:\/\/|www.)\S+\.\S+\b/gi,t=22*(o.val().match(e)||[]).length,r=o.val().replace(e,"").length;s.text(a-(t+r)),t+r>a?s.addClass("limit-exceeded"):s.removeClass("limit-exceeded"),0===o.val().length?l.addClass("disabled").removeClass("btn-primary"):l.removeClass("disabled").addClass("btn-primary")}var n=$('<div class="io-ox-twitter-tweet-container">'),o=$('<textarea class="io-ox-twitter-tweet-textarea form-control" aria-required="true" rows="4">').on("click",function(e){e.preventDefault(),void 0!==t&&void 0!==t.open&&t.open({replyBoxContainer:n,textArea:o,buttonContainer:i}),r()}).on("blur",function(e){e.preventDefault(),void 0!==t&&void 0!==t.close&&t.close({replyBoxContainer:n,textArea:o,buttonContainer:i})}).on("keyup",function(e){e.preventDefault(),r()}),i=$('<div class="io-ox-twitter-tweet-button">'),s=$('<div class="io-ox-twitter-tweet-counter">').text(a),l=$('<a class="btn btn-default disabled" role="button">').text(e).on("click",function(e){var t=o.val();t.length>0&&(e.preventDefault(),o.val(""),void 0!==d&&d(t,{replyBoxContainer:n,textArea:o,buttonContainer:i}))}),d=void 0!==t?t.success:void 0;return n.append(o,i.append(s,l)),void 0!==t&&(t.isOpen&&void 0!==t.open?t.open({replyBoxContainer:n,textArea:o,buttonContainer:i}):t.isOpen||void 0===t.close||t.close({replyBoxContainer:n,textArea:o,buttonContainer:i})),{appendTo:function(e,a){n.parent()[0]===e[0]?n.remove():(d=a?a.callback:void 0,o.val(""),r(),e.append(n),o.focus(),void 0!==t.open&&t.open({replyBoxContainer:n,textArea:o,buttonContainer:i,baton:a}))},get:function(){return n}}},renderTweet:u,setCurrentUserID:function(e){i=e}}});