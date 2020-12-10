define("io.ox/mail/mailfilter/settings/filter/tests/util",["io.ox/core/extensions","io.ox/backbone/mini-views","io.ox/backbone/mini-views/dropdown","gettext!io.ox/mailfilter"],function(e,t,n,s){"use strict";var a=t.DropdownLinkView.extend({updateLabel:function(){this.$el.find(".dropdown-label").text(this.options.values[this.model.get(this.name)]||this.model.get(this.name))}}),i=function(){var e={B:2147483648,K:2097152,M:2048,G:2};return function(t){return/^[0-9]+$/.test(t.size)&&parseInt(t.size,10)>=0&&parseInt(t.size,10)<e[t.unit]}}(),o=t.InputView.extend({events:{change:"onChange",keyup:"onKeyup",paste:"onPaste"},validationForSize:function(){return i({size:parseInt(this.$el.val(),10),unit:this.model.get("unit")})},onChange:function(){"values"===this.name||"headers"===this.name||"source"===this.name?this.model.set(this.name,[this.$el.val()]):this.model.set(this.name,this.$el.val()),this.onKeyup()},onKeyup:function(){var e;e="sizeValue"===this.name?this.validationForSize()?"valid:":"invalid:":""===$.trim(this.$el.val())&&!1===this.$el.prop("disabled")?"invalid:":"valid:",this.model.trigger(e+this.name),this.$el.trigger("toggle:saveButton")}}),l=function(e){return $('<button type="button" class="btn btn-link remove">').attr({"data-action":"remove-"+e,"aria-label":s("Remove")}).append($('<i class="fa fa-trash-o" aria-hidden="true">').attr("title",s("Remove")))};return{Input:o,drawCondition:function(e){return"3"===e.layout?$('<li class="filter-settings-view row layout-3">').addClass(e.addClass).attr("data-test-id",e.conditionKey).append($('<div class="col-sm-2 doubleline">').append($('<span class="list-title">').text(e.title)),$('<div class="col-sm-10">').append($('<div class="row flex">').append($('<div class="col-sm-4 dualdropdown">').append($('<div class="row">').append($('<label class="col-sm-4">').text(s("Header")),$('<div class="col-sm-8">').append(new a(e.seconddropdownOptions).render().$el)),$('<div class="row">').append($('<label class="col-sm-4">').text(s("Part")),$('<div class="col-sm-8">').append(new a(e.thirddropdownOptions).render().$el))),$('<div class="col-sm-3">').append(new a(e.dropdownOptions).render().$el),$('<div class="col-sm-5 doubleline">').append($('<label class="sr-only">').attr("for",e.inputId).text(e.inputLabel),new o(e.inputOptions).render().$el,e.errorView?new t.ErrorView({selector:".row"}).render().$el:[]))),l("test")):e.secondInputId?$('<li class="filter-settings-view row">').addClass(e.addClass).attr("data-test-id",e.conditionKey).append($('<div class="col-sm-4 doubleline">').append($('<span class="list-title">').text(e.title)),$('<div class="col-sm-8">').append($('<div class="row">').append($('<label class="col-sm-4 control-label">').attr("for",e.inputId).text(e.InputLabel?e.InputLabel:s("Name")),$('<div class="first-label inline-input col-sm-8">').append(new o(e.inputOptions).render().$el,e.errorView?new t.ErrorView({selector:".row"}).render().$el:[])),$('<div class="row">').append($('<div class="col-sm-4">').append(new a(e.dropdownOptions).render().$el),$('<div class="col-sm-8">').append($('<label class="sr-only">').attr("for",e.secondInputId).text(e.secondInputLabel),new o(e.secondInputOptions).render().$el,e.errorView?new t.ErrorView({selector:".row"}).render().$el:[]))),l("test")):$('<li class="filter-settings-view row">').addClass(e.addClass).attr("data-test-id",e.conditionKey).append($('<div class="col-sm-4 singleline">').append($('<span class="list-title">').text(e.title)),$('<div class="col-sm-8">').append($('<div class="row">').append(e.seconddropdownOptions?$('<div class="col-sm-2">').append(new a(e.seconddropdownOptions).render().$el):[],$("<div>").addClass("size"===e.inputOptions.name?"col-sm-7":"col-sm-4").append(e.dropdownOptions?new a(e.dropdownOptions).render().$el:[]),$("<div>").addClass("size"===e.inputOptions.name?"col-sm-5":"col-sm-8").append($('<label class="sr-only">').attr("for",e.inputId).text(e.inputLabel),new o(e.inputOptions).render().$el,e.errorView?new t.ErrorView({selector:".row"}).render().$el:[]))),l("test"))},drawDeleteButton:l,returnContainsOptions:function(e,t){var n={contains:s("Contains"),"not contains":s("Contains not"),is:s("Is exactly"),"not is":s("Is not exactly"),matches:s("Matches"),"not matches":s("Matches not"),startswith:s("Starts with"),"not startswith":s("Starts not with"),endswith:s("Ends with"),"not endswith":s("Ends not with"),regex:s("Regex"),"not regex":s("Not Regex"),exists:s("Exists"),"not exists":s("Does not exist")};return _.extend(n,t)},drawDropdown:function(e,t,s){var a=t[e]||e;s.caret&&(a+='<b class="caret">');var i=$('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="menuitem" aria-haspopup="true" tabindex="0">').html(a),o=$('<ul class="dropdown-menu" role="menu">').append(s.sort?_(s.sort).map(function(e){if(e!==s.skip)return $("<li>").append($('<a href="#" data-action="change-dropdown-value" role="menuitemradio">').attr("data-value",e).data(s).append($.txt(t[e])))}):_(t).map(function(e,t){if(t!==s.skip)return $("<li>").append($('<a href="#" data-action="change-dropdown-value">').attr("data-value",t).data(s).append($.txt(e)))}));return new n({className:"action dropdown value "+(s.classes?s.classes:""),$toggle:i,$ul:o}).render().$el},returnDefaultToolTips:function(){return{contains:s("matches a substring"),"not contains":s("does not match a substring"),is:s("an exact, full match"),"not is":s("not an exact, full match "),matches:s("a full match (allows DOS-style wildcards)"),"not matches":s("not a full match (allows DOS-style wildcards)"),startswith:s("Starts with"),"not startswith":s("Starts not with"),endswith:s("Ends with"),"not endswith":s("Ends not with"),regex:s("Regex"),"not regex":s("Not Regex"),exists:s("Exists"),"not exists":s("Does not exist")}},filterHeaderValues:function(e,t,n){var s=_.findIndex(e,{id:t}),a={};return _.each(n,function(t,n){-1!==_.indexOf(e[s].headers,n)&&(a[n]=t)}),a},filterPartValues:function(e,t,n){var s=_.findIndex(e,{id:t}),a={};return _.each(n,function(t,n){-1!==_.indexOf(e[s].parts,n)&&(a[n]=t)}),a},returnDefault:function(e,t,n,s){var a=e[_.findIndex(e,{id:t})][n];return-1!==_.indexOf(a,s)?s:a[0]},DropdownLinkView:a,handleUnsupportedComparisonValues:function(e){var t=e.inputName?e.$li.find('[name="'+e.inputName+'"]'):e.$li.find("input"),n=e.$li.find('[data-name="comparison"]').first().closest(".dropdownlink").find(".dropdown-label");e.values[e.model.get("comparison")]||(t.prop("disabled",!0),n.addClass("unsupported")),e.model.on("change:comparison",function(){n.removeClass("unsupported")})},handleSpecialComparisonValues:function(e){var t=e.inputName?e.$li.find('[name="'+e.inputName+'"]'):e.$li.find("input"),n=["exists","not exists"];"not exists"!==e.model.get("comparison")&&"exists"!==e.model.get("comparison")||t.prop("disabled",!0),e.model.on("change:comparison",function(s,a){_.contains(n,a)?(t.prop("disabled",!0),t.val(""),e.model.set("values",[""],{silent:!0}),"header"!==e.defaults.id&&e.model.set("headers",[""],{silent:!0})):(t.prop("disabled",!1),"header"!==e.defaults.id&&e.model.set("headers",e.defaults.headers)),t.trigger("keyup")})},validateSize:i}});