define("io.ox/contacts/common-extensions",["io.ox/contacts/util","gettext!io.ox/contacts"],function(t,i){"use strict";return{fullname:function(i){var a=i.data,e=$.trim(t.getFullName(a)),n=$.trim(a.yomiLastName||a.yomiFirstName||a.display_name||t.getMail(a));return e?this.append($('<div class="fullname">').html(t.getFullName(a,!0))):this.append($('<div class="fullname">').text(n))},bright:function(a){var e=a.data.mark_as_distributionlist?i("Distribution list"):$.trim(t.getJob(a.data));this.append($('<span class="bright">').text(e))}}});