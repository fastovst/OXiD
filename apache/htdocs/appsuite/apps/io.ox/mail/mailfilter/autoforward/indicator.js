define("io.ox/mail/mailfilter/autoforward/indicator",["io.ox/mail/mailfilter/autoforward/model","io.ox/mail/mailfilter/vacationnotice/indicator","io.ox/core/extensions","gettext!io.ox/mail"],function(i,t,o,e){"use strict";var n=t.extend({point:"io.ox/mail/autoforward/indicator",events:{"click .btn-close":"onClose",'click a[data-action="edit-autoforward-notice"]':"onEdit"},onEdit:function(i){i.preventDefault(),require(["io.ox/mail/mailfilter/autoforward/view"],function(i){i.open()})},attachTo:function(t){this.model=new i,this.model.fetch().done(function(){t.before(this.render().$el.hide()),this.listenTo(ox,"mail:change:auto-forward",this.onChange),this.onChange(this.model)}.bind(this))}});return o.point("io.ox/mail/autoforward/indicator").extend({id:"link",index:100,render:function(){var i=e("Auto forwarding is active");this.$el.append($('<i class="fa fa-warning" aria-hidden="true">'),$('<span class="sr-only">').text(e("Warning")),$('<a href="#" data-action="edit-autoforward-notice">').text(i))}},{id:"close",index:200,render:function(){this.$el.append($('<button type="button" class="btn btn-link btn-close">').attr("title",e("Close")).append($('<i class="fa fa-times" aria-hidden="true">')))}}),n});