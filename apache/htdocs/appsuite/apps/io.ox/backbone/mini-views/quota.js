define("io.ox/backbone/mini-views/quota",["gettext!io.ox/core","io.ox/core/api/quota","io.ox/core/strings","io.ox/backbone/mini-views/upsell","io.ox/core/capabilities","settings!io.ox/mail"],function(e,t,i,o,s,a){"use strict";return Backbone.View.extend({tagName:"div",initialize:function(e){this.options=_.extend({module:"mail",quotaField:"quota",usageField:"use",renderUnlimited:!0,sizeFunction:function(e){return i.fileSize(e,"smart")},upsellLimit:-1},e),this.$el.addClass("io-ox-quota-view"),t.mailQuota.on("change",this.updateQuota.bind(this)),t.fileQuota.on("change",this.updateQuota.bind(this)),this.$el.hide()},close:function(){t.mailQuota.off("change",this.updateQuota),t.fileQuota.off("change",this.updateQuota)},getQuota:function(e){var i=this.options,o=i.module,s=i.quotaField,a=i.usageField;return!e&&i.quota&&i.usage?$.when({quota:i.quota,usage:i.usage}):(e&&("file"===i.module&&t.requestFileQuotaUpdates(),t.reload()),t.load().then(function(e){return{quota:e[o][s],usage:e[o][a]}}))},updateQuota:function(){var e=this.options,i=t.getModel(e.module).toJSON();void 0!==i[e.quotaField]&&void 0!==i[e.usageField]&&(e.quota=i[e.quotaField],e.usage=i[e.usageField],this.render())},renderTitle:function(t){var i;this.$el.append($('<div class="quota-description">').append($('<div class="title">').text(this.options.title),i=$('<div class="numbers">'))),t.quota<=0?i.text(e("mail"!==this.options.module||a.get("folder/inbox")?"unlimited":"unknown")):i.text(t.usage<t.quota?e("%1$s of %2$s",this.options.sizeFunction(t.usage),this.options.sizeFunction(t.quota)):e("100%"))},renderBar:function(e){if(!(e.quota<=0)){var t=Math.max(5,Math.min(100,Math.round(e.usage/e.quota*100)));e.quota||(t=100),e.usage||(t=0),this.$el.append($('<div class="progress">').append($('<div class="progress-bar">').css("width",t+"%").addClass(t<90?"default":"bar-danger")))}},renderUpsell:function(e){if(this.options.upsell){var t=new o(this.options.upsell),i=t.opt.upsellLimit||this.options.upsellLimit;i<=0||e.quota>=i||this.$el.append(t.render().$el)}},render:function(){return s.has("guest")?this:(this.getQuota().done(function(e){_.isUndefined(e.quota)||_.isUndefined(e.usage)||!this.options.renderUnlimited&&e.quota<=0||(this.$el.empty(),this.renderTitle(e),this.renderBar(e),this.renderUpsell(e),this.$el.show())}.bind(this)),this)}})});