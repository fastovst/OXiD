define("io.ox/core/extPatterns/dnd",["io.ox/core/extensions","io.ox/core/tk/upload"],function(n,e){"use strict";return{UploadZone:function(o){function i(n,e,o,i){i.extension&&i.extension.action&&i.extension.action.apply(i.extension,[o].concat(l))}function t(n,e,o){e.extension&&e.extension.multiple&&e.extension.multiple.apply(e.extension,[o].concat(l))}function c(){var n=[];s&&a&&a.remove(),a&&(a.off("drop",i),a.off("drop",t)),d.each(function(e){e.isEnabled&&!e.isEnabled.apply(e,l)||n.push({id:e.id,label:e.metadata("label",l),extension:e})}),(a=e.dnd.createDropZone({type:"multiple",actions:n}))&&_.isFunction(a.on)&&(a.on("drop",i),a.on("drop-multiple",t)),s&&a.include&&a.include()}var a,l=$.makeArray(arguments).slice(1),d=n.point(o.ref),s=!1;c(),d.on("extended",c),this.update=function(){c()},this.include=function(){a.include(),s=!0},this.remove=function(){a.remove(),s=!1}}}});