define("io.ox/core/pim/actions",["io.ox/core/api/attachment","io.ox/core/download","io.ox/files/api","io.ox/core/yell","io.ox/core/extensions","io.ox/backbone/views/actions/util","io.ox/core/viewer/views/types/typesutil","gettext!io.ox/core"],function(o,e,i,t,n,a,c,r){"use strict";var l={view:{collection:"some",matches:function(o){return o.array().some(function(o){var e=new i.Model(o);return c.canView(e)})},action:function(o){require(["io.ox/core/viewer/main"],function(e){(new e).launch({files:o.array(),opt:{disableFolderInfo:!0,disableFileDetail:!0}})})}},download:{collection:"one",action:function(i){var t=o.getUrl(i.first(),"download");_.device("ios >= 11")?e.window(t,{antivirus:!0}):e.url(t)}},downloadZip:{requires:function(o){return o.collection.has("multiple")},multiple:function(o){var i={folder:o[0].folder,module:o[0].module,attached:o[0].attached};e.pimAttachments(o,i)}},save:{capabilities:"infostore",collection:"some",action:function(e){e.array().forEach(function(e){o.save(e)}),setTimeout(function(){t("success",r("Attachments have been saved!"))},300)}}},s={view:r("View"),download:r("Download"),downloadZip:r("Download"),save:r("Save to %1$s",r.pgettext("app","Drive"))},d=0,u=a.Action;return _(l).each(function(o,e){var i="io.ox/core/tk/actions/"+e+"-attachment";new u(i,o),n.point("io.ox/core/tk/attachment/links").extend({id:e,index:d+=100,title:s[e],mobile:"hi",ref:i})}),l});