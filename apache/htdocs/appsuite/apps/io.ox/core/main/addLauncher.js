define("io.ox/core/main/addLauncher",[],function(){return function(e,t,n,a){var i=$('<li role="presentation" class="launcher">');return n&&i.on("click","a",function(e){e.preventDefault();var t,a=$(this),i=$(document.activeElement);t=a.contents().detach(),a.css("width",a.width()+"px").text(" ").busy(),(n.call(this)||$.when()).done(function(){a.idle().empty().append(t).css("width",""),$(document.activeElement).filter("body").length>0&&i.focus()})}),i.append(function(){return _.isString(t)?$('<a href="#" class="apptitle" tabindex="-1">').text(t):"I"===t[0].tagName?$('<a href="#" class="apptitle" role="button" tabindex="-1">').attr("aria-label",a?_.escape(a):null).append(t):t}),"left"===e&&i.hide(),i.appendTo($("#io-ox-toprightbar"))}});