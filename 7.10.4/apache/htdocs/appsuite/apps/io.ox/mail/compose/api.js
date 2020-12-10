define("io.ox/mail/compose/api",["io.ox/core/http","io.ox/contacts/api"],function(e,t){"use strict";function a(t,a,n){var o=new FormData;o.append("contentDisposition",(n||"attachment").toUpperCase()),a.file?a.file.name?o.append("file",a.file,a.file.name):o.append("file",a.file):o.append("JSON",JSON.stringify(a));var r=e.UPLOAD({url:t,data:o}),i=r.then(function(e){return e.data});return i.abort=r.abort,i}var n={};return _.extend(n,Backbone.Events),n.queue=function(){function e(e,t){return t?Math.max(0,Math.min(100,Math.round(e/t*100)))/100:0}return{collection:(new Backbone.Collection).on("add remove change:pct",function(){var t=0,a=0,n=[];this.each(function(e){t+=e.get("loaded"),a+=e.get("total"),e.get("loaded")<e.get("total")&&n.push({abort:e.get("abort")})}),this.trigger("progress",{count:this.length,loaded:t,pct:e(t,a),total:a,abort:_.invoke.bind(_,n,"abort")})}),add:function(t,a){if(!this.collection.get(t.get("id"))){var n=t.get("id"),o=t.get("attachments"),r=o.filter(function(e){return e.get("uploaded")<1}),i=r.reduce(function(e,t){return e+t.get("uploaded")},0),c=r.length+1,s=new Backbone.Model({id:n,loaded:i,pct:e(i,c),total:c,abort:a});o.on("change:uploaded",function(t){var a=s.get("loaded");a+=t.get("uploaded")-t.previous("uploaded"),s.set({loaded:a,pct:e(a,c)})}),this.collection.add(s)}},remove:function(e){var t=this.collection.get(e);this.collection.remove(t)},update:function(t,a,n,o){var r=this.collection.get(t);if(r){var i=r.get("total")-1+a/n;o=o||r.get("abort"),r.set({loaded:i,pct:e(i,r.get("total")),abort:o})}}}}(),n.space={add:function(t,a){var n=JSON.stringify([].concat(t.original||[]));return e.POST({module:"mail/compose",data:n,params:{type:t.type,vcard:!!a.vcard,originalAttachments:a.attachments},contentType:"application/json"})},get:function(t){return e.GET({url:"api/mail/compose/"+t})},list:function(){return e.GET({url:"api/mail/compose"})},remove:function(t){return e.DELETE({url:"api/mail/compose/"+t}).then(function(e){return e&&e.success?e:$.Deferred().reject({action:"remove",error:"unknown",id:t})})},reset:function(){return n.space.list().then(function(e){return _(e).map(function(e){return n.space.remove(e)}),$.when.apply($,e)})},send:function(a,o,r){o=_(o).clone(),n.trigger("before:send",a,o),ox.trigger("mail:send:start",o),o.sharedAttachments&&o.sharedAttachments.expiryDate&&(o.sharedAttachments=_(o.sharedAttachments).clone(),o.sharedAttachments.expiryDate=_.now()+parseInt(o.sharedAttachments.expiryDate,10));var i=new FormData;i.append("JSON",JSON.stringify(o)),(r||[]).forEach(function(e,t){e.name?i.append("file_"+t,e,e.name):i.append("file_"+t,e)});var c=e.UPLOAD({url:"api/mail/compose/"+a+"/send",data:i,params:{force_json_response:!0}});return c.progress(function(e){n.queue.update(a,e.loaded,e.total,c.abort)}).fail(function(){ox.trigger("mail:send:fail")}).always(function(){n.queue.remove(a)}).done(function(e){t.trigger("maybeNewContact"),n.trigger("after:send",o,e),ox.trigger("mail:send:stop",o),o.sharedAttachments&&o.sharedAttachments.enabled&&ox.trigger("please:refresh refresh^")}),c},save:function(t,a,o){n.trigger("before:save",t,a);var r=new FormData;return r.append("JSON",JSON.stringify(a)),(o||[]).forEach(function(e,t){e.name?r.append("file_"+t,e,e.name):r.append("file_"+t,e)}),e.UPLOAD({url:"api/mail/compose/"+t+"/save",data:r}).done(function(e){n.trigger("after:save",a,e)})},update:function(t,a){return e[_.browser.ie?"PUT":"PATCH"]({url:"api/mail/compose/"+t,data:$.extend({},a)})}},n.space.attachments={original:function(t){return e.POST({url:ox.apiRoot+"/mail/compose/"+t+"/attachments/original"})},vcard:function(t){return e.POST({url:ox.apiRoot+"/mail/compose/"+t+"/attachments/vcard"})},add:function(e,t,n){return a(ox.apiRoot+"/mail/compose/"+e+"/attachments",t,n)},update:function(e,t,n,o){return a(ox.apiRoot+"/mail/compose/"+e+"/attachments/"+o,t,n)},get:function(t,a){return e.GET({url:ox.apiRoot+"/mail/compose/"+t+"/attachments/"+a})},remove:function(t,a){return e.DELETE({url:ox.apiRoot+"/mail/compose/"+t+"/attachments/"+a})}},n});