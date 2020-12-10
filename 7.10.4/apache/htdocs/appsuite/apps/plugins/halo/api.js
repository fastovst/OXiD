define.async("plugins/halo/api",["io.ox/core/http","plugins/halo/config","io.ox/core/extensions"],function(n,t,e){"use strict";var o,c=[],a=new function(){var n=e.point("io.ox/halo/contact:renderer");this.filterProviders=function(t){var e=[];return _(t).each(function(t){n.each(function(n){n.handles(t)&&e.push(t)})}),e},this.draw=function(t){var e=n.map(function(n){if(n.handles(t.provider))return n.draw.call(t.ray,t)}).compact().value();return $.when.apply($,e)}};return o={halo:new function(t){var a=t.providerFilter||{filterProviders:function(n){return n}},i=e.point("io.ox/halo/contact:requestEnhancement");this.investigate=function(t,e){var o={},r=_.copy(t);r.id&&r.contact_id&&r.id!==r.contact_id&&(r.id=r.contact_id,delete r.contact_id);var h=e?[e]:a.filterProviders(c);return _(h).each(function(t){var e={module:"halo/contact",params:{action:"investigate",provider:t,timezone:"utc"},appendColumns:!1,contact:r};i.each(function(n){if(n.enhances(t)){var o=n.enhance(e,t);o&&(e=o)}}),r=e.contact,delete e.contact,e.data=r,o[t]=n.PUT(e)}),e?o[e]:o},this.refreshServices=function(){return n.GET({module:"halo/contact",params:{action:"services"}}).then(function(n){return(n=_(n).without("com.openexchange.halo.contacts")).unshift("com.openexchange.halo.contacts"),c=n,o})}}({providerFilter:a}),viewer:a},n.GET({module:"halo/contact",params:{action:"services"}}).then(function(n){return(n=_(n).without("com.openexchange.halo.contacts")).unshift("com.openexchange.halo.contacts"),c=n,o})});