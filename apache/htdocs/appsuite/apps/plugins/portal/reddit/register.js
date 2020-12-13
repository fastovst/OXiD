define("plugins/portal/reddit/register",["gettext!io.ox/portal"],function(t){"use strict";var e=function(){},i={};return{reload:function(a){a||(a=100);var d=new e,n={new:"http://www.reddit.com/r/##subreddit##/new.json?sort=new",hot:"http://www.reddit.com/r/##subreddit##/.json?sort="},r=!1,o=i.get("subreddits");_.each(o,function(t){n[t.mode]&&d.addFeed({id:"reddit-"+t.subreddit.replace(/[^a-z0-9]/g,"_")+"-"+t.mode.replace(/[^a-z0-9]/g,"_"),description:t.subreddit,url:n[t.mode].split("##subreddit##").join(t.subreddit)+"&jsonp=",index:a++})}),d.setOptions({bigPreview:!0});var u=function(t){var e="",i=d.getOption("bigPreview"),a=["whatgifs.com","imgur.com","i.imgur.com","i.minus.com"];return _.include(a,t.domain)&&(i?e="imgur.com"===t.domain?t.url.replace(/http:\/\/imgur/g,"http://i.imgur")+".jpg":t.url:t.thumbnail&&(e=t.thumbnail)),t.url.match(/\.jpg$|\.png$|\.gif$/)&&(e=t.url),""===e&&t&&t.media&&t.media.oembed&&t.media.oembed.thumbnail_url&&(e=t.media.oembed.thumbnail_url),e};d.init({appendLimitOffset:function(t,e,i){return i&&(t+="&after="+r),t},determineSuccessfulResponse:function(t){return t&&t.data?t.data:{}},getDataArray:function(t){return t.children},elementPreview:function(e,i){var a="",d="";return(i=i.data).title&&(d=i.title),(a=u(i))||d?d&&e.append($("<div>").addClass("mediaplugin-title").text(d)):e.append($("<div>").addClass("mediaplugin-title").text(t("No title."))),e.append($("<div>").addClass("mediaplugin-content mediaplugin-textbackground").text(i.created_utc?moment.unix(i.created_utc).format("l LT"):"")),r=i.name,""!==a&&$("<img/>",{"data-original":a})},popupContent:function(e,i,a){var n=e.width(),r=e.height(),o=!1,p="",m=!1,l=$("<div>").addClass("io-ox-portal-mediaplugin-portal");p=(i=i.data).title?i.title:t("No title.");var s=$("<div>").addClass("mediaplugin-title").text(p).css({width:n});r-=s.height(),s.appendTo(l);var c=u(i);if("youtube.com"===i.domain?$("<div>").html($("<span>").html(i.media_embed.content).text()).appendTo(l):c&&(o=!0,(m=$("<img/>",{src:c}).css({display:"none"}).on("load",function(){a&&(a.detach(),$(this).fadeIn())})).appendTo(l)),i.url){var g=$("<div>").append($("<a>").attr({href:i.url}).text(i.url));g.appendTo(l),r-=g.height()}if(i.permalink&&$("<a>").attr({href:"http://www.reddit.com"+i.permalink}).text(t("Comments")).appendTo(l),i.author){i.permalink&&$("<span>").text(" | ").appendTo(l);var h=$("<a>").attr({href:"http://www.reddit.com/user/"+i.author}).text(i.author);h.appendTo(l),r-=h.height()}a&&!o&&a.detach(),e.append(l),m&&d.resizeImage(m,n,r)},getImagesFromEntry:function(t,e){var i=u(t.data);i&&e.push(i)}})}}});