define("io.ox/mail/folderview-extensions",["io.ox/core/extensions","io.ox/core/capabilities","gettext!io.ox/mail"],function(i,e,o){"use strict";function t(i){i.preventDefault(),require(["io.ox/mail/accounts/settings"],function(e){e.mailAutoconfigDialog(i)})}e.has("multiple_mail_accounts")&&i.point("io.ox/mail/folderview/sidepanel/links").extend({id:"add-account",index:300,draw:function(){_.device("!smartphone")&&this.append($("<div>").append($('<a href="#" data-action="add-mail-account" role="button">').text(o("Add mail account")).on("click",t)))}})});