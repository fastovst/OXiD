define("plugins/portal/powerdns-parental-control/register",["io.ox/core/extensions","gettext!plugins/portal"],function(t,e){"use strict";var n="powerdns-parental-control",o=e("PowerDNS parental control");t.point("io.ox/portal/widget").extend({id:n}),t.point("io.ox/portal/widget/"+n).extend({title:o,preview:function(){this.append($('<div class="content">').append($('<div class="paragraph">').append($('<a role="button" class="action">').text(e("Open parental control settings")))).on("click",function(){}))}}),t.point("io.ox/portal/widget/"+n+"/settings").extend({title:o,type:n,unique:!0})});