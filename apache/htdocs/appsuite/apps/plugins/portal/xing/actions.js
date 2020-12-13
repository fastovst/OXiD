define("plugins/portal/xing/actions",["io.ox/core/extensions","io.ox/xing/api","io.ox/core/notifications","gettext!plugins/portal","less!plugins/portal/xing/xing"],function(e,t,i,n){"use strict";e.point("io.ox/portal/widget/xing/reaction").extend({id:"comment",accepts:function(e){return"COMMENT"===e.toUpperCase()},handle:function(e){var o,a,r,s,c;return o=e.ids[0],a=function(){c.toggle()},r=function(){console.log("Commenting:",s.val()),t.addComment({activity_id:o,text:s.val()}).fail(function(e){i.yell("error",n('There was a problem with XING, the error message was: "%s"',e.error))}).done(function(){c.toggle(),s.val(""),i.yell("success",n("Comment has been successfully posted on XING")),ox.trigger("refresh^")})},c=$("<div>").addClass("comment-form"),s=$("<textarea>").attr({rows:3,cols:40}),$('<div class="xing possible-action comment">').append($('<span class="comment-toggle">').append($('<i class="fa fa-comment" aria-hidden="true">'),$.txt(n("Comment"))).on("click",a),c.append(s,$('<button type="button" class="btn btn-primary">').text(n("Submit comment"))).on("click",".btn",r).hide())}}),e.point("io.ox/portal/widget/xing/reaction").extend({id:"delete",accepts:function(e){return"DELETE"===e.toUpperCase()},handle:function(e){var o,a=e.ids[0];return o=function(){var o,r=$('.activity[data-activity-id="'+a+'"]'),s=e.type,c=$.Deferred();"activity"===s?(c=t.deleteActivity({activity_id:a}),o=n("The activity has been deleted successfully")):"comment"===s?(c=t.deleteComment({comment_id:a}),o=n("The comment has been deleted successfully")):console.log('We currently do not know how to handle deleting data of type="'+s+'". Please let us know about it. Here is more data:',JSON.stringify(e)),c.fail(function(e){i.yell("error",n('There was a problem with XING. The error message was: "%s"',e.error))}).done(function(){r.remove(),i.yell("success",o),ox.trigger("refresh^")})},$('<div class="xing possible-action delete">').append($('<i class="fa fa-trash-o" aria-hidden="true">'),$.txt(n("Delete"))).on("click",o)}}),e.point("io.ox/portal/widget/xing/reaction").extend({id:"like",accepts:function(e){return"LIKE"===e.toUpperCase()},handle:function(e){var o,a=e.ids[0],r=e.objects[0].id,s=e&&e.likes&&e.likes.current_user_liked;return o=function(){var e,o;s?(e=t.unlikeActivity({activity_id:a,comment_id:r}),o=n("Un-liked comment")):(e=t.likeActivity({activity_id:a,comment_id:r}),o=n("Liked comment")),e.fail(function(e){i.yell("error",n('There was a problem with XING, the error message was: "%s"',e.error))}).done(function(){i.yell("success",o),ox.trigger("refresh^")})},s?$('<div class="xing possible-action unlike">').append($('<i class="fa fa-thumbs-down" aria-hidden="true">'),$.txt(n("Un-like"))).on("click",o):$('<div class="xing possible-action like">').append($('<i class="fa fa-thumbs-up" aria-hidden="true">'),$.txt(n("Like"))).on("click",o)}}),e.point("io.ox/portal/widget/xing/reaction").extend({id:"share",accepts:function(e){return"SHARE"===e.toUpperCase()},handle:function(e){var o,a=e.ids[0];return o=function(){t.shareActivity({activity_id:a}).fail(function(e){i.yell("error",n('There was a problem with XING, the error message was: "%s"',e.error))}).done(function(){i.yell("success",n("Shared activity")),ox.trigger("refresh^")})},$('<div class="xing possible-action share">').append($('<i class="fa fa-share" aria-hidden="true">'),$.txt(n("Share"))).on("click",o)}})});