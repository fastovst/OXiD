define("io.ox/mail/settings/signatures/migration/register",["io.ox/core/extensions"],function(e){"use strict";e.point("io.ox/core/updates").extend({id:"migrate-signatures",run:function(){var e=$.Deferred();return require(["io.ox/core/config","io.ox/core/api/snippets"],function(i,t){var n=i.get("gui.mail.signatures"),o=_(n).map(function(e){return t.create({type:"signature",module:"io.ox/mail",displayname:e.signature_name,content:e.signature_text,misc:{insertion:e.position},meta:{imported:e}})});$.when.apply($,o).done(e.resolve).fail(e.reject)}).fail(e.reject),e}})});