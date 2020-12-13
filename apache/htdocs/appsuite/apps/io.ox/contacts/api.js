define("io.ox/contacts/api",["io.ox/core/extensions","io.ox/core/http","io.ox/core/api/factory","io.ox/core/notifications","io.ox/core/cache","io.ox/contacts/util","io.ox/core/util","l10n/ja_JP/io.ox/collation","settings!io.ox/contacts","io.ox/core/capabilities"],function(e,t,a,n,i,r,o,l,c,s){"use strict";function u(e){return require(["io.ox/core/api/user"]).then(function(t){return $.when(t.caches.get.remove({id:e.user_id}),t.caches.all.clear(),t.caches.list.remove({id:e.user_id}))})}function d(e,t){""!==e[t]&&void 0!==e[t]||delete e[t]}function m(e){return $.extend({},{width:_.device("retina")?2*e.width:e.width,height:_.device("retina")?2*e.height:e.height,scaleType:e.scaleType,user:ox.user_id,context:ox.context_id,sequence:!1!==e.sequence?e.sequence:void 0,uniq:!1!==e.uniq?b:void 0})}var h=function(e){return e.id?(e.birthday&&moment.utc(e.birthday).year()<=1&&(e.birthday=r.julianToGregorian(e.birthday)),e.anniversary&&moment.utc(e.anniversary).year()<=1&&(e.anniversary=r.julianToGregorian(e.anniversary)),e):(_(e).each(function(e){e.birthday&&moment.utc(e.birthday).year()<=1&&(e.birthday=r.julianToGregorian(e.birthday)),e.anniversary&&moment.utc(e.anniversary).year()<=1&&(e.anniversary=r.julianToGregorian(e.anniversary))}),e)},f=function(e,t){return t=t||{mode:"update"},_(e).each(function(a,n){""!==a&&void 0!==a||("update"===t.mode?e[n]=null:delete e[n])})},p=a({module:"contacts",requests:{all:{action:"all",folder:"6",columns:"ja_JP"===ox.locale?"20,1,101,555,556,557,607":"20,1,101,607",extendColumns:"io.ox/contacts/api/all",sort:"607",order:"asc",admin:function(){return c.get("showAdmin",!1)}},list:{action:"list",columns:"20,1,101,500,501,502,505,508,510,519,520,524,526,528,555,556,557,569,592,597,602,606,607,616,617,5,2",extendColumns:"io.ox/contacts/api/list"},get:{action:"get"},search:{action:"search",columns:"20,1,101,500,501,502,505,520,524,555,556,557,569,592,602,606,607,616,617,5,2",extendColumns:"io.ox/contacts/api/list",sort:"609",getData:function(t,a){a=a||{},t+="*";var n={orSearch:!0,admin:c.get("showAdmin",!1),emailAutoComplete:!!a.emailAutoComplete},i=!0,r={names:{display_name:t,first_name:t,last_name:t,email1:t,email2:t,email3:t},addresses:{street_home:t,postal_code_home:t,city_home:t,state_home:t,country_home:t,street_business:t,postal_code_business:t,city_business:t,state_business:t,country_business:t,street_other:t,postal_code_other:t,city_other:t,state_other:t,country_other:t},phones:{telephone_business1:t,telephone_business2:t,telephone_home1:t,telephone_home2:t,telephone_other:t,fax_business:t,telephone_callback:t,telephone_car:t,telephone_company:t,fax_home:t,cellular_telephone1:t,cellular_telephone2:t,fax_other:t,telephone_isdn:t,telephone_pager:t,telephone_primary:t,telephone_radio:t,telephone_telex:t,telephone_ttytdd:t,telephone_ip:t,telephone_assistant:t}};return _(a).each(function(e,t){_(r).chain().keys().contains(t).value()&&"on"===e&&(n=_(n).extend(r[t]),i=!1)}),i&&(n=_(n).extend(r.names)),e.point("io.ox/contacts/api/search").invoke("getData",n,t,a),n}},advancedsearch:{action:"advancedSearch",columns:"20,1,101,500,501,502,505,520,524,555,556,557,569,592,602,606,607,616,617",extendColumns:"io.ox/contacts/api/list",sort:"607",getData:function(t,a){var n,i={names:"display_name first_name last_name yomiFirstName yomiLastName company yomiCompany email1 email2 email3".split(" "),addresses:"street_home postal_code_home city_home state_home country_home street_business postal_code_business city_business state_business country_business street_other postal_code_other city_other state_other country_other".split(" "),phones:"telephone_business1 telephone_business2 telephone_home1 telephone_home2 telephone_other fax_business telephone_callback telephone_car telephone_company fax_home cellular_telephone1 cellular_telephone2 fax_other telephone_isdn telephone_pager telephone_primary telephone_radio telephone_telex telephone_ttytdd telephone_ip telephone_assistant".split(" ")},r=["or"],o=!0;return a=a||{},t.indexOf("*")+t.indexOf("?")<-1&&(t="*"+t+"*"),_(a).each(function(e,a){_(i).chain().keys().contains(a).value()&&"on"===e&&(_(i[a]).each(function(e){r.push(["=",{field:e},t])}),o=!1)}),o&&_(i.names).each(function(e){r.push(["=",{field:e},t])}),n={filter:r},e.point("io.ox/contacts/api/search").invoke("getData",n,t,a),n}}},pipe:{get:function(e){return e.user_id&&(e.internal_userid=e.user_id),e&&e.distribution_list&&e.distribution_list.length&&"ja_JP"===ox.locale&&(_(e.distribution_list).each(function(e){e.email=e.mail,e.sort_name_without_mail=e.sort_name}),e.distribution_list.sort(l.sorterWithMail),_(e.distribution_list).each(function(e){_(e).omit("email","sort_name_without_mail")})),h(e)},all:function(e){if("ja_JP"===ox.locale)return _(e).each(function(e){e.email=e.email1||e.email2||e.email3||"",e.sort_name_without_mail=e.sort_name}),e.sort(l.sorterWithMail),_(e).each(function(e){_(e).omit("email","sort_name_without_mail")}),e;for(var t,a=0,n=0;t=e[a++];)""===t.sort_name&&n++;return n>0&&(e=e.slice(n).concat(e.slice(0,n))),e},list:function(e){return _(e).each(function(e){null===e.birthday&&delete e.birthday,null===e.distribution_list&&delete e.distribution_list}),e},listPost:function(e){return _(e).each(function(e){p.caches.get.dedust(e,"last_modified")}),p.trigger("list:ready"),e},search:h,advancedsearch:h}}),g=p.getList;p.getList=function(e,t,a){return!s.has("gab")&&a&&a.check&&_.isFunction(a.check)?_(e).any(function(e){return!a.check(e)})?(delete a.check,g.apply(this,arguments)):(new $.Deferred).resolve(e):g.apply(this,arguments)},p.create=function(e,a){d(e,"email1"),d(e,"email2"),d(e,"email3"),e.birthday&&moment.utc(e.birthday).local(!0).year()<=1&&(e.birthday=r.gregorianToJulian(e.birthday)),e.anniversary&&moment.utc(e.anniversary).local(!0).year()<=1&&(e.anniversary=r.gregorianToJulian(e.anniversary));var n,i={module:"contacts",data:e,appendColumns:!1,fixPost:!0};return e=f(e,{mode:"create"}),a?window.FormData&&a instanceof window.File?(n="UPLOAD",i.data=new FormData,i.data.append("file",a),i.data.append("json",JSON.stringify(e)),i.params={action:"new"}):(n="FORM",i.form=a,i.action="new"):(n="PUT",i.params={action:"new"}),t[n](i).then(function(t){return t=t.data||t,p.get({id:t.id,folder:e.folder_id})}).then(function(e){return $.when(p.caches.all.grepRemove(e.folder_id+p.DELIM),y.clear()).then(function(){return p.trigger("create",{id:e.id,folder:e.folder_id}),p.trigger("refresh.all"),e})})},p.update=function(e){var a=e.attachments,n=!1;return _.isEmpty(e.data)?a?$.when().then(function(){return p.trigger("update:"+_.ecid(e)),p.trigger("update",e),{folder_id:e.folder,id:e.id}}):$.when():(e.data.birthday&&moment.utc(e.data.birthday).local(!0).year()<=1&&(e.data.birthday=r.gregorianToJulian(e.data.birthday)),e.data.anniversary&&moment.utc(e.data.anniversary).local(!0).year()<=1&&(e.data.anniversary=r.gregorianToJulian(e.data.anniversary)),e.data=f(e.data,{mode:"update"}),(_(e.data).has("email1")||_(e.data).has("email2")||_(e.data).has("email3"))&&(n=!0),t.PUT({module:"contacts",params:{action:"update",id:e.id,folder:e.folder,timestamp:e.last_modified||_.then(),timezone:"UTC"},data:e.data,appendColumns:!1}).then(function(){return p.get({id:e.id,folder:e.folder},!1).then(function(t){return $.when(n?p.caches.get.clear():"",p.caches.get.add(t),n?p.caches.all.clear():p.caches.all.grepRemove(e.folder+p.DELIM),n?p.caches.list.clear():p.caches.list.remove({id:e.id,folder:e.folder}),y.clear(),t.user_id?u(t):"").done(function(){p.trigger("update:"+_.ecid(t),t),p.trigger("update",t),p.trigger("refresh.all"),""===e.data.image1&&(p.trigger("update:image",t),p.trigger("reset:image reset:image:"+_.ecid(t),t))})})}))},p.editNewImage=function(e,a,n){var i=function(t){return $.when(p.caches.get.clear(),p.caches.list.clear(),y.clear()).then(function(){p.trigger("refresh.list"),p.trigger("update:"+_.ecid(e)),p.trigger("update:image",{id:e.id,folder:e.folder_id})}),t};if("FormData"in window&&n instanceof window.File){var r=new FormData;return r.append("file",n),r.append("json",JSON.stringify(a)),t.UPLOAD({module:"contacts",params:{action:"update",id:e.id,folder:e.folder_id,timestamp:_.then()},data:r,fixPost:!0}).then(i)}return t.FORM({module:"contacts",action:"update",form:n,data:a,params:{id:e.id,folder:e.folder_id,timestamp:_.then()}}).then(i)},p.remove=function(e){return p.trigger("beforedelete",e),e=_.isArray(e)?e:[e],t.PUT({module:"contacts",params:{action:"delete",timestamp:_.then(),timezone:"UTC"},appendColumns:!1,data:_(e).map(function(e){return{folder:e.folder_id,id:e.id}})}).then(function(){return $.when(p.caches.all.clear(),p.caches.list.remove(e),y.clear())}).fail(function(e){n.yell("error",e.error)}).done(function(){_(e).map(function(e){p.trigger("delete:"+_.ecid(e),e),p.trigger("delete",e)}),p.trigger("refresh.all")})},p.on("refresh^",function(){p.caches.get.clear()}),p.on("refresh.all:import",function(){p.caches.list.clear(),y.clear(),p.caches.get.clear(),p.trigger("import"),p.trigger("refresh.all")});var y=new i.SimpleCache("contacts-fetching");p.clearFetchCache=function(){return y.clear()},p.getByEmailaddress=function(e){return e=e||"",y.get(e).then(function(a){return null!==a?a:""===e?{}:t.PUT({module:"contacts",params:{action:"search",admin:c.get("showAdmin",!1),columns:"20,1,500,501,502,505,520,555,556,557,569,602,606,524,592",timezone:"UTC"},sort:609,data:{email1:e,email2:e,email3:e,orSearch:!0,exactMatch:!0}}).then(function(t){return(t=t.filter(function(e){return!e.mark_as_distributionlist})).length?(t.sort(function(e,t){return t.image1_url?1:-1}),t.sort(function(e,t){return"6"===String(t.folder_id)?1:-1}),(t=t[0]).image1_url&&(t.image1_url=t.image1_url.replace(/^https?:\/\/[^/]+/i,""),t.image1_url=o.replacePrefix(t.image1_url),t.image1_url=o.getShardingRoot(t.image1_url)),y.add(e,t)):y.add(e,{})})})},p.getFallbackImage=function(e){return ox.base+"/apps/themes/"+ox.theme+"/fallback-image-"+(e||"contact")+".png"};var b=ox.t0;p.on("update:image",function(){b=_.now()}),p.pictureHalo=function(){function e(e,t){return p.looksLikeResource(e)?"resource":p.looksLikeGroup(e)||p.looksLikeDistributionList(e)?"group":_.isString(e.image1_url)&&""!==e.image1_url?"image_url":e.user_id||e.userid||e.userId||e.internal_userid?"user":(e.contact_id||e.id)&&(e.folder_id||e.folder)?"contact":e.mail||e.email||e.email1?"email":t.fallback?"fallback":void 0}function t(e,t,a){var n={};switch(a){case"user":n.user_id=e.user_id||e.userid||e.userId||e.internal_userid;break;case"contact":n.contact_id=e.contact_id||e.id,n.folder_id=e.folder_id||e.folder;break;case"email":n.email=e.email&&String(e.email).toLowerCase()||e.mail&&String(e.mail).toLowerCase()||e.email1&&String(e.email1).toLowerCase()}return n.sequence=e.last_modified||1,_.extend(n,m(t))}function a(e,t,a){return _.defer(function(){if(a.lazyload||a.container||_.first(e.closest(".scrollpane, .scrollable, .scrollpane-lazyload")))return a.fallback&&e.css("background-image","url("+i+")"),e.attr("data-original",t).on("load.lazyload error.lazyload",function(r,o){1===o.width||"error"===r.type?t=a.fallback?i:null:n[t]=t,t&&e.text("").attr("data-original",t).css("background-image","url("+t+")"),e=t=a=null,$(this).off(".lazyload")}).lazyload();$(new Image).on("load error",function(r){var o=1===this.width||"error"===r.type;o||(n[t]=t),o&&!a.fallback||e.text("").css("background-image","url("+(o?i:t)+")"),e=null,$(this).off()}).attr("src",t)}),e}var n={},i=p.getFallbackImage();return function(r,l,c){var s,u=_.extend({width:48,height:48,scaleType:"cover",lazyload:!1,effect:"show",urlOnly:!1,fallback:!0},c),d=e(l,_.pick(u,"fallback")),m=t(l,u,d);switch(l.facet&&l.facet.hasPersons()&&l.data.item&&(l.image1_url=l.data.item.image_url),d){case"resource":s=p.getFallbackImage("resource");break;case"group":s=p.getFallbackImage("group");break;case"image_url":s=l.image1_url=o.replacePrefix(l.image1_url)+"&"+$.param(m),s=o.getShardingRoot(s);break;case"fallback":s=i}if(s)return u.urlOnly?s:a(r,s,_.pick(u,"container","lazyload","fallback"));if(s=o.getShardingRoot("/contacts/picture?action=get&"+$.param(m)),n[s])return u.urlOnly?n[s]:r.text("").css("background-image","url("+n[s]+")");try{return u.urlOnly?s:a(r,s,u)}finally{l=r=u=m=null}}}(),p.getContactPhoto=function(e,t){t=_.extend({size:48,fallback:!1,initials:!0},t);var a=this.getContactPhotoUrl(e,t.size)||t.fallback&&p.getFallbackImage(),n=$('<div class="contact-photo" aria-hidden="true">');return!a&&t.initials&&n.text(r.getInitials(e)),a&&n.css("background-image","url("+a+")"),n.toggleClass("empty",!a),n},p.getContactPhotoUrl=function(e,t){var a={width:t,height:t,sequence:!1,uniq:!1};return e.image1_url?o.getShardingRoot(o.replacePrefix(e.image1_url)+"&"+$.param(m(a))):""},p.getDisplayName=function(e,t){t=_.extend({halo:!0,stringify:"getDisplayName",tagName:"a"},t);var a,n,i,o=e.display_name||"",l=$("<"+t.tagName+">").text(" "),c=e.email;return a=function(a){t.halo&&/@/.test(e.email)&&s.has("contacts")&&l.addClass("halo-link").attr("href","#").data({display_name:a,email1:c}),l.text(a+" ")},n=function(){_.defer(function(){l=a=n=i=t=null})},i=function(e){if(_.isArray(e)&&(e=e[0]),_.isString(e))return a(e);e&&(a(_.isEmpty(e)?o:r[t.stringify](e)),n())},e&&e.full_name?(i(e.full_name),n()):e&&(e.last_name||e.first_name)?(i(e),n()):p.getByEmailaddress(e.email).done(i).fail(n),l};var x=function(e,a,i){return e=_.isArray(e)?e:[e],t.pause(),_(e).map(function(e){return t.PUT({module:"contacts",params:{action:a||"update",id:e.id,folder:e.folder_id||e.folder,timezone:"UTC",timestamp:e.timestamp||_.then()},data:{folder_id:i},appendColumns:!1})}),t.resume().then(function(t){var a=$.Deferred();return _(t).each(function(e){e.error&&(n.yell(e.error),a.reject(e.error))}),"rejected"===a.state()?a:$.when.apply($,_(e).map(function(e){return $.when(p.caches.all.grepRemove(i+p.DELIM),p.caches.all.grepRemove(e.folder_id+p.DELIM),p.caches.list.remove({id:e.id,folder:e.folder_id}))}))}).done(function(){p.trigger("refresh.all")})};return p.move=function(e,t){return x(e,"update",t)},p.copy=function(e,t){return x(e,"copy",t)},p.birthdays=function(e){var a=_.now(),n=_.extend({action:"birthdays",start:a,end:a+6048e5,columns:"1,20,500,501,502,503,504,505,511",timezone:"UTC"},e||{});return t.GET({module:"contacts",params:n}).then(h)},p.looksLikeResource=function(e){return"mailaddress"in e&&"description"in e||"cuType"in e&&"RESOURCE"===e.cuType},p.looksLikeGroup=function(e){return"members"in e},p.looksLikeDistributionList=function(e){return!!e.mark_as_distributionlist},p.pendingAttachments={},p.autocomplete=function(){function e(e){return e.length>=l}function a(t){return(_(t.split(" ")).find(e)||"").substr(0,l)}function n(e){var t=a(e),n=o.cache[t],i=e.split(" ");if(n)return n.then(function(t){return _(t).filter(function(t){return _(i).every(function(a){var n=new RegExp("\\b"+r(a));return _(t.fulltext).some(function(t){return n.test(t)||t.indexOf(e)>-1})})})})}function i(e,t){var n=a(e);o.cache[n]=t.then(function(e){return _(e).map(function(e){return e.fulltext=_(s).map(function(t){return String(e[t]||"").toLowerCase()}),e.fulltext=_(e.fulltext).compact(),e})})}function r(e){return e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")}function o(e,r){e=$.trim(e).toLowerCase();var o=(r=_.extend({admin:!1,email:!0,sort:"609",columns:"1,2,5,20,101,500,501,502,505,519,520,524,555,556,557,569,592,602,606,607",cache:!0,limit:0},r)).cache&&n(e);return o||(i(e,t.GET({module:"contacts",params:{action:"autocomplete",query:a(e),admin:r.admin,email:r.email,sort:r.sort,columns:r.columns,right_hand_limit:r.limit}})),n(e))}var l=Math.max(1,c.get("search/minimumQueryLength",3)),s=c.get("search/autocompleteFields","display_name,email1,email2,email3,first_name,last_name").split(",");return c.get("showDepartment")&&s.push("department"),o.cache={},o}(),p.on("create update delete",function(){p.trigger("maybeNewContact")}),p.on("maybeNewContact",function(){p.autocomplete.cache={}}),p});