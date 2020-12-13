define("io.ox/participants/add",["io.ox/core/extensions","io.ox/participants/model","io.ox/participants/views","io.ox/core/tk/typeahead","io.ox/mail/util","io.ox/contacts/util","io.ox/core/util","io.ox/calendar/util","io.ox/core/yell","gettext!io.ox/core","io.ox/core/capabilities","settings!io.ox/contacts","io.ox/backbone/mini-views/addresspicker","static/3rd.party/jquery-ui.min.js"],function(t,i,e,n,o,a,s,r,l,d,c,p,h){"use strict";function u(t){return _(t).map(f)}function f(t){return _.isString(t)?t={email1:t}:t instanceof Backbone.Model&&(t=t.toJSON()),a.getMail(t)}t.point("io.ox/participants/add/autoCompleteItem").extend({id:"view",index:100,draw:function(t,i){var n=new e.ParticipantEntryView({model:t,closeButton:!1,halo:!1,field:!0,isMail:i.isMail});this.append(n.render().$el)}});var v={validate:function(t,i){if(this.options.blacklist){var e=_.extend({yell:!0},i),n=this.getInvalid(t);if(0!==n.length)return e.yell&&this.yell(t,n),n}},getInvalid:function(t){var i=this.options.blacklist;return _(u(t)).filter(function(t){return!!i[t]})},yell:function(t,i){l("warning",d.format(d.ngettext("This email address cannot be used","The following email addresses cannot be used: %1$d",t.length),i.join(", ")))}};return Backbone.View.extend({tagName:"div",events:{"keydown input":"resolve","blur input":"resolve"},typeahead:null,options:{placeholder:d("Add contact/resource")+" …",label:d("Add contact/resource"),extPoint:"io.ox/participants/add",blacklist:!1},initialize:function(t){if(this.options=$.extend({},this.options,t||{}),_.isString(this.options.blacklist)){var e={};_(this.options.blacklist.split(/,/)).each(function(t){e[t.trim().toLowerCase()]=!0}),this.options.blacklist=e,_.extend(this,v)}this.options.click=_.bind(this.addParticipant,this),this.options.harmonize=_.bind(function(t){t=_(t).map(function(t){return new i.Participant(t)});var e=this.collection;return _(t).filter(function(t){return!e.get(t)})},this),this.initialRendering=!0;var n=_.debounce(function(){this.initialRendering?this.initialRendering=!1:this.typeahead.el.scrollIntoView()}.bind(this),0);this.collection.on("render",n)},resolve:function(t){if(!t||"keydown"!==t.type||13===t.which){var i=this.typeahead.$el.typeahead("val"),e=s.getAddresses(i),n=[];return _.each(e,function(t){_.isEmpty(t)||n.push({display_name:o.parseRecipient(t)[0],email1:o.parseRecipient(t)[1],field:"email1",type:5})}),this.addParticipant(t,n,i)}},setFocus:function(){this.typeahead&&this.typeahead.$el.focus()},addParticipant:function(t,i,e){var n=[].concat(i),o=[],s=!!this.validate&&this.validate(n),l=this;if(!s)return(n=this.getValidAddresses(n)).length!==[].concat(i).length&&(s="invalid addresses"),this.options.convertToAttendee&&(n=_(n).chain().map(function(t){if(!t.attributes||!t.attributes.mark_as_distributionlist)return r.createAttendee(t);o.push(t)}).flatten().compact().value()),_.isEmpty(n)||this.collection.add(n),_.isEmpty(o)||_.each(o,function(t){l.collection.resolveDistList(t.attributes.distribution_list).done(function(t){_.each(a.validateDistributionList(t),function(t){l.collection.add(r.createAttendee(t))})})}),e&&this.typeahead.$el.typeahead("val",""),s},getValidAddresses:function(t){return _(t).filter(function(t){var i=f(t);return!!s.isValidMailAddress(i)||(l("error",d("Cannot add contact with an invalid mail address: %1$s",i)),!1)})},render:function(){var t=_.uniqueId("form-control-label-"),i=this;if(this.typeahead=new n(this.options),this.$el.append($('<label class="sr-only">').attr({for:t}).text(this.options.label),this.typeahead.$el.attr({id:t}).addClass("add-participant")),this.typeahead.render(),this.options.scrollIntoView){var e=this.$el;this.typeahead.on("typeahead-custom:dropdown-rendered",function(){var t=e.find(".tt-dropdown-menu"),i=t.scrollParent(),n=t.offset().top-i.offset().top;t.is(":visible")&&(n<0||n+t.height()>i.height())&&i.scrollTop(i.scrollTop()+n-16)})}return this.options.usePicker=!_.device("smartphone")&&c.has("contacts")&&p.get("picker/enabled",!0),this.options.usePicker&&(this.addresspicker=new h({process:function(t,e){if(i.options.convertToAttendee)return e.magic(),void i.options.collection.add(r.createAttendee(e));i.options.collection.add(e)}}),this.$el.append(this.addresspicker.render().$el),this.$el.wrapInner($('<div class="input-group has-picker">'))),this}})});