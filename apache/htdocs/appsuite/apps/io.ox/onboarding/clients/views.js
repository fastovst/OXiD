define("io.ox/onboarding/clients/views",["io.ox/onboarding/clients/extensions","io.ox/core/extensions"],function(n,e){"use strict";var i="io.ox/onboarding/clients/views",t={list:function(e){var i=new n.ActionsListView(e);this.append(i.render().$el)},download:function(e,i){var t=new n.DownloadActionView(e,{baton:i});this.append(t.render().$el)},shortmessage:function(e,i){var t=new n.ShortMessageActionView(e,{baton:i});this.append(t.render().$el)},email:function(e,i){var t=new n.EmailActionView(e,{baton:i});this.append(t.render().$el)},display:function(e,i){var t=new n.DisplayActionView(e,{baton:i});this.append(t.render().$el)},client:function(e,i){var t=new n.ClientActionView(e,{baton:i});this.append(t.render().$el)}};return e.point(i).extend({draw:t.list}),e.point(i+"/download").extend({draw:t.download}),e.point(i+"/email").extend({draw:t.email}),e.point(i+"/sms").extend({draw:t.shortmessage}),e.point(i+"/display").extend({draw:t.display}),e.point(i+"/link").extend({draw:t.client}),t});