define("io.ox/search/model",["io.ox/search/api","io.ox/search/items/main","io.ox/backbone/modelFactory","io.ox/search/util","io.ox/core/extensions","gettext!io.ox/search"],function(e,t,o,i,s,n){"use strict";function r(e){var t=e.get("pool").folder,o=t?t.values.custom.custom||!e.isMandatory("folder"):void 0,i=e.get("pooldisabled").folder;return o||i}var a,l,u,c={},f=t.create(),p={virtual:n("The selected folder is virtual and can not be searched. Please select another folder.")};return s.point("io.ox/search/main").invoke("config",$(),c),a={mode:"",app:"",query:"",autocomplete:[],items:f,active:[],pool:{},poollist:[],pooldisabled:{},options:c,start:0,size:100,extra:1,showadv:!1,extensions:{}},u=function(){var e,t=_.extend({},this.get("pool")),o=[].concat(this.get("poollist")),i={},s={},n={};o.reverse();var r=_.filter(o,function(e){var o=t[e.facet];return!!("folder"!==e.facet||"custom"!==o.values.custom.custom&&o.values.custom.custom)});_.each(r,function(e){var o=t[e.facet];_.each(o.flags,function(e){if(0===e.indexOf("conflicts:")&&!i[o.id]){var t=e.split(":")[1];i[t]=!0}})}),_.each(i,function(e,i){if("folder"===i){t.folder.values.custom.custom="custom";var n;(o=_.filter(o,function(e){return"folder"!==e.facet||(e.custom="custom",n=e,!1)})).unshift(n)}else delete t[i],o=_.filter(o,function(e){return e.facet!==i});s[i]=l}),o.reverse();var a,l;for(e=o.length-1;e>=0;e--)a=o[e],l=t[a.facet],_.contains(l.flags,"highlander")&&Object.keys(l.values).length>1&&(n[a.facet]?(o.splice(e,1),delete l.values[a.value]):n[a.facet]=!0);var u;if(_.contains(this.getOptions().flags,"singleton"))for(e=o.length-1;e>=0;e--)a=o[e],"folder"===(l=t[a.facet]).id||_.contains(l.flags,"advanced")||(u?(o.splice(e,1),delete l.values[a.value]):u=!0);this.set("pooldisabled",s,{silent:!0}),this.set("pool",t),this.set("poollist",o)},l=new o({ref:"io.ox/search/model",api:e,model:{defaults:a,getApp:function(){var e,t=ox.ui.App.getCurrentApp(),o=t?t.get("name"):c.defaultApp;return"io.ox/search"!==o&&this.setModule(o),e=this.get("app"),c.mapping||s.point("io.ox/search/main").invoke("config",$(),c),c.mapping[e]||c.mapping[e+"/edit"]||e},getModule:function(){return this.getApp().split("/")[1]},add:function(e,t,o,i){var s=this.get("pool"),n=this.get("poollist"),r=this.get("autocomplete"),a="global"===e||e===t;r.length||(r=_.copy(c.sticky,!0)),_.each(r,function(i){if(i.id===e){var r,l=_.copy(i,!0);if(r=_.find(l.values,function(e){return e.id===t||!!l.custom}),!a&&!r)return void(ox.debug&&console.error("missing value for facet"));l.custom&&(r.custom=o.custom,r.name=o.name,_.extend(i.values[0],r)),l.values={},s[e]=s[e]||l,a&&(t=Date.now(),i.id=t);var u={facet:e,value:t,option:"simple"===i.style||r.filter||!r.options?"":o||r.options[0].id};(r||i)._compact=u,s[e].values[t]=r||i,"folder"===e?n.unshift(u):n.push(u)}}),u.call(this),this.trigger("facet:add",e,t,o),"folder"===e||i||this.trigger("query",this.getApp())},remove:function(e,t){for(var o=this.get("pool"),i=this.get("poollist"),s=!e&&!t,n=i.length-1;n>=0;n--){var r=i[n];(s||r.facet===e&&r.value===t)&&(delete o[r.facet].values[r.value],_.isEmpty(o[r.facet].values)&&delete o[r.facet],i.splice(n,1))}u.call(this),f.empty(),_.find(o,function(e){return!_.contains(e.flags,"advanced")})||"io.ox/search"===ox.ui.App.getCurrentApp().get("name")?this.trigger("query",this.getApp()):this.trigger("cancel")},update:function(e,t,o){var i=this.get("pool")[e],s=i.custom,n=this.get("poollist");if(s)$.extend(this.get("pool")[e].values.custom,o);else for(var r=n.length-1;r>=0;r--){var a=n[r];a.facet===e&&a.value===t&&_.extend(a,"exclusive"===i.style?{value:o.option}:{},o)}"exclusive"===i.style&&i.options&&(i.values={},_.each(i.options,function(t){t.id===o.option&&(i.values[t.id]=_.extend({},t,{options:i.options,_compact:{facet:e,value:o.option,option:o.option}}))})),u.call(this),this.trigger("query",this.getApp())},fetch:function(){var e=this.get("pool"),t=this.get("poollist"),o=[];return _.each(t,function(t){var i,s=e[t.facet],n=s.values[t.value];t.option&&n&&n.options?_.each(n.options,function(e){e.id===t.option&&(i=_.copy(e,!0))}):i=_.copy(n,!0),n&&("custom"!==n.id||n.custom&&"custom"!==n.custom)&&o.push({facet:s.id.split(".")[0],value:n.custom||n.id,filter:s.custom?null:i.filter})}),o},setModule:function(e){var t=this.get("app");this.set("app",e,{silent:!0}),t!==e&&this.reset()},getFolder:function(){var e,t=this.getApp()+"/main";return require.defined(t)&&(e=require(t).getApp().folder.get()||void 0,/^virtual/.test(e)&&(e=void 0)),e},ensure:function(){var e=this;return(!r(e)?i.getFirstChoice(this):$.Deferred().resolve({})).then(function(t){t=t||{},r(e)||(e.get("pool").folder&&(t.id||t.custom)?e.update("folder","custom",t):e.add("folder","custom",t))},function(){throw new Error({message:p.virtual})})},getFacets:function(){var e=this;return this.ensure().then(function(){return e.fetch()})},getCompositeId:function(){return _(this.fetch()).chain().map(function(e){var t=e.filter;return e.facet+(t&&_.isArray(t.fields)?"("+t.fields.join(",")+")":"")+"="+(t&&_.isArray(t.queries)?t.queries.join(","):e.value)}).value().sort().join("&")},isMandatory:function(e){if(void 0===c.mandatory)return!1;var t=this.getModule();return"files"===t&&(t="drive"),(c.mandatory[e]||[]).indexOf(t)>=0},setItems:function(e,t){var o=this.getApp(),i=this,s=_.map(e.results,function(e){return{id:e.id,folder:e.folder||e.folder_id,application:o,data:e}});f.reset(s),f.timestamp=t||Date.now(),i.stopListening(),i.listenTo(f,"needs-refresh",function(){i.trigger("query",this.getApp())})},getOptions:function(){return _.copy(c)},reset:function(e){var t=e||{};f.empty();var o={folder:this.get("pool").folder},i=_.filter(this.get("poollist"),function(e){return"folder"===e.facet});o.folder.values.custom.id="custom",o.folder.values.custom.custom=void 0,o.folder.values.custom.name=void 0,i[0].value="custom",this.set({query:"",autocomplete:[],active:[],pool:this.isMandatory("account")?{}:o,poollist:this.isMandatory("account")?[]:i,pooldisabled:{},start:0},{silent:!0}),t.silent||this.trigger("reset")}}}),{defaults:a,factory:l}});