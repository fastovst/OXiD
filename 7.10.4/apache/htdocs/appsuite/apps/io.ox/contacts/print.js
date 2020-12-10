define("io.ox/contacts/print",["io.ox/core/print","io.ox/contacts/api","io.ox/contacts/util","settings!io.ox/contacts","gettext!io.ox/contacts"],function(t,e,n,o,i){"use strict";function r(t){return _([t.department,t.city_business]).compact().join(", ")}function s(t,e){return _([t.telephone_business1,t.telephone_business2,t.telephone_company,t.telephone_home1,t.telephone_home2]).compact()[e]||""}function a(t,e){return _([t.cellular_telephone1,t.cellular_telephone2]).compact()[e]||""}function l(t,e){return _([t.email1,t.email2,t.email3]).compact()[e]||t.mail||""}function c(t){if(!t.mark_as_distributionlist)return"";var e=_(t.distribution_list||[]),n={};return _(e).chain().compact().filter(function(t){return!n[t.mail]&&(n[t.mail]=!0)}).map(function(t){return(t.display_name?' "'+t.display_name+'"':" ")+" <"+t.mail+">"}).value()}function u(t,o,i){return{original:t,name:n.getFullName(t)||"-",sort_name:n.getSortName(t),where:r(t),phone1:s(t,0),phone2:s(t,1),cellphone1:a(t,0),cellphone2:a(t,1),email1:l(t,0),email2:l(t,1),email3:l(t,2),isDistributionList:e.looksLikeDistributionList(t),distributionList:c(t),thumbIndex:i.thumbIndex}}function p(){var t,e="";return t=function(t){return(t=String(t).substr(0,1).toUpperCase())!==e&&(e=t,!0)},t.get=function(){return e},t}var m={getOptions:function(t,n){var r=o.get("features/printList","phone"),s={get:function(t){return e.get(t)},title:1===t.length?t[0].display_name:void 0,i18n:{phonelist:i("Phone list"),name:i("Name")+", "+i("Department")+", "+i("City"),phone:i("Phone"),cellphone:i("Cell phone"),email:i("Email"),filtered:function(t){return i.format(i.ngettext("Note: One contact is not shown due to missing phone numbers","Note: %1$d contacts are not shown due to missing phone numbers",t),t)},notPrinted:i("This note will not be printed")},process:u,selection:t,selector:"phone"===r?".phonelist":".contacts",sortBy:"sort_name",window:n,thumbIndex:p()};return"phone"===r&&(s.filter=function(t){return!t.mark_as_distributionlist&&!!(t.phone1||t.phone2||t.cellphone1||t.cellphone2)}),s},open:function(e,n){t.smart(m.getOptions(e,n))}};return m});