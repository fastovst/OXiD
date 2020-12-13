define("io.ox/multifactor/settings/views/smsRegistrationView",["io.ox/backbone/views","io.ox/core/extensions","io.ox/backbone/mini-views","io.ox/backbone/views/modal","io.ox/multifactor/api","gettext!io.ox/core/boot"],function(e,i,o,t,n,r){"use strict";function a(e,i){return new t({async:!0,point:f,title:r("Confirm Code"),enter:"OK",model:new Backbone.Model({device:i})}).build(function(){}).addCancelButton().addButton({label:r("Ok"),action:"OK"}).on("OK",function(){var o=$("#verification").val().replace(/\s/g,"");o&&""!==o?d(e,i,o):l.reject()}).on("cancel",function(){l.reject()}).open()}function c(e){$(e.target).toggleClass("mfInputError",e.target.value.match(/[0-9\s]*/)[0]!==e.target.value)}function s(e){require(["io.ox/core/notifications"],function(i){i.yell("error",e)})}function d(e,i,o){var t={secret_code:o};n.finishRegistration(e,i.deviceId,t).then(function(e){if(e&&e.enabled)return u.close(),void l.resolve();var i;e&&e.error&&(i=r("Bad input or server error. Please try again.")+" "+e.error),s(i),u.idle(),$("#verification").focus()},function(e){if(e&&"MFA-0021"===e.code)return s(r("Bad verification code. Please try again")),u.idle(),void $("#verification").focus();s(r("Bad input or server error. Please try again.")+" "+(e?e.error:"")),u.close(),l.reject()})}var u,l,f="multifactor/settings/views/smsRegistrationView",v=0;return i.point(f).extend({index:v+=100,id:"header",render:function(){var e=$('<label for="verification">').append(r("Please enter the validation code we just sent to your device.")).append("<br>");this.$body.append(e)}},{index:v+=100,id:"selection",render:function(){var e=$('<input type="text" class="form-control mfInput" id="verification">').keyup(c),i=$('<div class="multifactorSelector">').append(e);this.$body.append(i),window.setTimeout(function(){e.focus()},100)}}),{open:function(e,i,o){return u=a(e,i),l=o,u}}});