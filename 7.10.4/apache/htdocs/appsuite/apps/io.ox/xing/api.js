define("io.ox/xing/api",["io.ox/core/http"],function(e){var t,n,i,o,r,u,c,a,f,d,s,l,m,g,v,x,y,h,p,k,A;t=function(t,n){return e.GET({module:"xing",params:_.extend(n,{action:t})})},n=function(t,n,i){return e.POST({module:"xing",params:_.extend(n,{action:t}),data:i})},o=function(t,n,i){return e.PUT({module:"xing",params:_.extend(n,{action:t}),data:i})},i=function(t,n){return e.DELETE({module:"xing",params:_.extend(n,{action:t})})};var b={};return r=function(e){if(!e||0===e.length)return $.when({});var t=e.join(",");return b[t]?$.when(b[t]):o("find_by_mails",{},{emails:e}).done(function(e){b[t]=e})},u=function(e){return n("newsfeed",e)},c=function(e){return t("get_comments",e)},a=function(e){return n("comment",e)},f=function(e){return n("delete_comment",e)},d=function(e){return n("like",e)},s=function(e){return n("unlike",e)},l=function(e){return t("get_likes",e)},m=function(e){return t("show_activity",e)},g=function(e){return n("share_activity",e)},v=function(e){return i("delete_activity",e)},x=function(e){return n("change_status",e)},y=function(e){return n("create",e)},h=function(e){return n("contact_request",e)},p=function(e){return i("revoke_contact_request",e)},k=function(e){return n("invite",e)},A=function(){require(["io.ox/core/api/sub","io.ox/core/sub/model","io.ox/core/folder/api","io.ox/keychain/api","io.ox/core/notifications","settings!io.ox/core"],function(e,t,n,i,o,r){e.sources.getAll().done(function(u){var c=_(u).filter(function(e){return e.id.match(".*xing.*")&&"contacts"===e.module});if(c.length>0){var a=c[0],f=r.get("folder/"+a.module);n.create(f,{title:a.displayName||"XING"}).done(function(n){var r=i.getStandardAccount("xing"),u=new t.Subscription({folder:n.id,entity:{folder:n.id},entityModule:a.module});u.setSource(a,{account:parseInt(r.id,10)}),u.save().then(function(t){e.subscriptions.refresh({id:t,folder:n.id}).fail(o.yell)},o.yell)})}})})},{getUserfeed:u,getComments:c,addComment:a,deleteComment:f,likeActivity:d,unlikeActivity:s,getLikes:l,showActivity:m,shareActivity:g,deleteActivity:v,changeStatus:x,createProfile:y,initiateContactRequest:h,revokeContactRequest:p,invite:k,findByMail:r,createSubscription:A}});