define("plugins/portal/xing/activities",["io.ox/core/extensions","io.ox/xing/api","io.ox/core/notifications","gettext!plugins/portal","less!plugins/portal/xing/xing"],function(t,e,n,i){"use strict";var a,s,o,c,r;a=function(t){var e=$('<a class="external xing" target="_blank" rel="noopener">').attr("href","https://www.xing.com/profile/"+t.page_name);if(t.photo_urls){var n=t.photo_urls,i=n.maxi_thumb||n.medium_thumb||n.mini_thumb||n.thumb||n.large;$("<img>").attr({href:i,class:"photo"}).appendTo(e)}return e.append($.txt(s(t))),e},s=function(t){return"user"===t.type?t.display_name:t.name},r=function(t,e){return e&&e.limitLength?_.ellipsis(t,{max:30,charpos:"middle"}):t},o=function(t,e){return e&&e.limitLength?_.ellipsis(t,{max:30}):t},c=function(t,e){return e&&e.limitLength?_.ellipsis(t,{max:50}):t},t.point("io.ox/portal/widget/xing/activityhandler").extend({id:"link",accepts:function(t){return"bookmark"===t.verb},handle:function(t,e){return $('<div class="xing activityObj">').append($('<div class="actionDesc">').text(i("%1$s recommends this link:",s(t.creator))),$('<div class="actionContent">').append($("<a>").attr({href:t.url}).text(r(t.url,e)).addClass("external xing"),$('<div class="title">').text(o(t.title,e)),$('<div class="description">').text(c(t.description,e))))}}),t.point("io.ox/portal/widget/xing/activityhandler").extend({id:"singleBookmarkPost",accepts:function(t){return"post"===t.verb&&1===t.objects.length&&"bookmark"===t.objects[0].type},handle:function(t,e){var n=t.objects[0];return $('<div class="xing activityObj">').append($('<div class="actionDesc">').text(i("%1$s posted a link:",s(n.creator))),$('<div class="actionContent">').append($('<a class="external xing" target="_blank" rel="noopener">').attr("href",n.url).text(c(n.description,e)||r(n.url,e))))}}),t.point("io.ox/portal/widget/xing/activityhandler").extend({id:"singleStatusPost",accepts:function(t){return"post"===t.verb&&1===t.objects.length&&"status"===t.objects[0].type},handle:function(t,e){var n=t.objects[0];return $('<div class="xing activityObj">').append($('<div class="actionDesc">').text(i("%1$s changed the status:",s(n.creator))),$('<div class="actionContent">').text(c(n.content,e)))}}),t.point("io.ox/portal/widget/xing/activityhandler").extend({id:"friend",accepts:function(t){return"make-friend"===t.verb},handle:function(t){var e=[],n=t.actors[0],o=t.objects;return 1===o.length?$('<div class="xing activityObj">').append($('<div class="actionDesc">').text(i("%1$s has a new contact:",s(n))),$('<div class="actionContent">').append(a(o[0]))):(_(o).each(function(t){e.push(a(t)),e.push($.txt(", "))}),e.pop(),$('<div class="xing activityObj">').append($('<div class="actionDesc">').text(i("%1$s has new contacts:",s(n))),$('<div class="actionContent">').append(e)))}}),t.point("io.ox/portal/widget/xing/activityhandler").extend({id:"singleActivityPost",accepts:function(t){return"post"===t.verb&&1===t.objects.length&&"activity"===t.objects[0].type},handle:function(t,e){var n=t.objects[0];return $('<div class="xing activityObj">').append($('<div class="actionDesc">').text(i("%1$s posted a new activity:",s(n.creator))),$('<div class="actionContent">').text(c(n.content,e)))}}),t.point("io.ox/portal/widget/xing/activityhandler").extend({id:"singleCompanyProfileUpdate",accepts:function(t){return("share"===t.verb||"post"===t.verb)&&1===t.objects.length&&"company_profile_update"===t.objects[0].type},handle:function(t,e){var n=t.objects[0];return $('<div class="xing activityObj">').append($('<div class="actionDesc">').text(i("%1$s updated the profile:",n.description)),$('<div class="actionContent">').text(c(n.name,e)))}}),t.point("io.ox/portal/widget/xing/activityhandler").extend({id:"singleUpdate",accepts:function(t){return"update"===t.verb&&1===t.objects.length},handle:function(t){var e=t.objects[0];return $('<div class="xing activityObj">').append($('<div class="actionDesc">').text(i("%1$s updated the profile:",s(e))),$('<div class="actionContent">').append(a(e)))}})});