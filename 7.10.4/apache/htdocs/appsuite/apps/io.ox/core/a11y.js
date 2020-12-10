define("io.ox/core/a11y",[],function(){"use strict";function e(){var e=$(".folder-tree:visible .folder.selected");e.is(":visible")?e.focus():$(".window-container:visible").length>0&&a($(".window-container:visible"))}function t(e){(e=$(e)).is(".scrollable[tabindex],.listbox[tabindex]")?_.device("ie")?(e.css("border-style","none").on("blur",o),e.hasClass("default-content-padding")&&e.addClass("no-padding-adjustment")):e.css("box-shadow","none").on("blur",n):e.is(".focusable")&&e.css("outline",0).on("blur",i)}function i(){$(this).css("outline","")}function n(){$(this).css("box-shadow","")}function o(){$(this).css("border-style",""),$(this).removeClass("no-padding-adjustment")}function a(e){return e.find(".list-item.selectable.selected, .list-item.selectable:first, .vgrid-cell.selectable.selected, .vgrid-cell.selectable:first, .vgrid-scrollpane-container, .rightside, .scrollpane.f6-target").first().visibleFocus()}function s(e){var t={},i=$(e).find("input, select, textarea, button, a[href], [tabindex], iframe"),n=i.filter(function(){if(!$(this).is(":radio"))return!0;var e=$(this).attr("name");if(this===document.activeElement||$(this).is(":checked"))return t[e]=!0;if(t[e])return!1;var n=i.filter('[name="'+$.escape(e)+'"]:radio');return!(n.index(document.activeElement)>-1||n.filter(":checked").length)&&(t[e]=!0)}).filter(function(){return!$(this).closest('[contenteditable="true"]').length}).filter(":visible");return $($.map(n,function(e){return $(e).is("iframe")?s($(e).contents().find("html")).toArray():e}))}function r(e){var t=arguments[1]||e.parent(),i=s(t).filter('[tabindex!="-1"]'),n=i.index(e);return n>0?i.eq(n-1):t.is("body")?i.eq(i.length-1):(t=t.parent(),r(e,t))}function l(e){var t=arguments[1]||e.parent(),i=s(t).filter('[tabindex!="-1"]'),n=i.index(e);return n<i.length-1?i.eq(n+1):t.is("body")?i.eq(0):(t=t.parent(),l(e,t))}function c(e){if(9!==e.which){var t=$(e.target).closest("ul.dropdown-menu").find("li:visible > a"),i=t.first(),n=t.last(),o=$(e.target).is(n),a=$(e.target).is(i);if(1!==t.length)return 38===e.which&&a||34===e.which||35===e.which?(e.stopImmediatePropagation(),n.focus()):40===e.which&&o||33===e.which||36===e.which?(e.stopImmediatePropagation(),i.focus()):void d(e,t)}}function d(e,t){if(t.filter(":focus").length){var i,n=t.map(function(){var t=$(this).text()||$(this).attr("aria-label");if(t)return t.substring(0,1).toLowerCase()===String.fromCharCode(e.which).toLowerCase()?$(this):void 0});if(n.length){if(1===n.length)return n[0].focus();_.find(n,function(e,t){e.is(":focus")&&t>=0&&t<n.length-1&&(i=n[t+1])}),(i||n[0]).focus()}}}function u(e,t){if(/^(37|39)$/.test(e.which)){var i=t.index(t.filter(":focus"));37===e.which?i--:i++,i<0&&(i=t.length-1),i===t.length&&(i=0);var n=t.eq(i).removeAttr("tabindex");return $(e.currentTarget).is("ul")?n.parent().siblings().find("> a,> button").attr("tabindex",-1):n.siblings().attr("tabindex",-1),n.focus()}}function f(e){if(!($(e.currentTarget).parents(".mce-tinymce").length>0||9===e.which||16===e.which&&e.shiftKey)){var t=$(e.currentTarget).is("ul"),i=$(e.currentTarget).find(t?"> li > a, > li > button:not([disabled])":"> a, > button:not([disabled])").filter(":visible");u(e,i),d(e,i)}}$(document).on("keydown.role.button",'a[role="button"]',function(e){!/32/.test(e.which)||13===e.which&&e.isDefaultPrevented()||(e.preventDefault(),$(this).click())}),$(document).on("click",".skip-links",function(t){t.preventDefault(),e()}),$(document).on("keydown.quicklaunch","#io-ox-quicklaunch button",function(t){var i=ox.ui.App.getCurrentApp();13===t.which&&i.get("name")===$(this).attr("data-app-name")&&e()}),$(document).on("keydown.foldertree",".folder-tree .folder.selected",function(e){if(/13|32|27/.test(e.which)&&"false"!==$(e.target).attr("aria-expanded")&&("true"!==$(e.target).attr("aria-expanded")||!$(e.target).hasClass("virtual"))&&$(e.target).is("li")){var t=$(e.target).closest(".window-container");if(27===e.which&&$('#io-ox-quicklaunch button:not([tabindex="-1"])').focus(),/^(13|32)$/.test(e.which)){if(t.hasClass("io-ox-mail-window")||t.hasClass("io-ox-files-window"))return;e.preventDefault(),a(t)}}}),$(document).on("keydown.focusFolderTree",".list-item, .vgrid-scrollpane-container",function(e){if(/13|32|27/.test(e.which)){var t=$(e.target).closest(".window-container");t.hasClass("io-ox-mail-window")||t.hasClass("io-ox-files-window")||(27===e.which&&(ox.ui.App.getCurrentApp().folderView.isVisible()?t.find(".folder-tree .folder.selected").focus():$('#io-ox-quicklaunch button:not([tabindex="-1"])').focus()),/13|32/.test(e.which)&&t.find(".rightside, .list-item.focusable:first").last().visibleFocus())}}),$(document).on("keydown.rightside",".rightside,.scrollpane.f6-target",function(e){if(27===e.which){var t=$(e.target).closest(".window-container");t.hasClass("io-ox-mail-window")||t.hasClass("io-ox-files-window")||t.find(".folder-tree .folder.selected, .list-item.selectable.selected, .vgrid-cell.selectable.selected:first, .vgrid-scrollpane-container").last().focus()}}),$(document).on("keydown.bs.dropdown.data-api",'ul.dropdown-menu[role="menu"]',c),$(document).on("keydown.launchers",'ul[role="menubar"], ul[role="tablist"], [role="toolbar"], ul.launchers',f),$(document).on("blur.listbox",'ul[role="listbox"].listbox',function(){$(this).removeAttr("aria-activedescendant")}),$(document).on("keydown.listbox",'ul[role="listbox"].listbox',function(e){var t=$(e.target).closest(".window-container"),i=$(this),n=$("#"+i.attr("aria-activedescendant"));if(/^27$/.test(e.which))return t.find(".folder-tree .folder.selected").focus();if(/^(13|32)$/.test(e.which))return e.preventDefault(),a(t);if(/^(8|46)$/.test(e.which)){var o=n.attr("data-cid");o&&i.trigger("remove",o)}else if(/^(37|38|39|40)$/.test(e.which)){var s=i.children(),r=/39|40/.test(e.which)?n.next():n.prev(),l=/39|40/.test(e.which)?s.first():s.last();return r.length||(r=l),r.addClass("focussed").attr("aria-selected",!0).trigger("click",{inputdevice:"keyboard"}).siblings().removeClass("focussed").removeAttr("aria-selected"),i.attr("aria-activedescendant",r.attr("id"))}}),$(document).on("click.listbox",'ul[role="listbox"].listbox li',function(){$(this).parent().attr("aria-activedescendant",$(this).attr("id"))}),$(document).on("mousedown",".focusable, .scrollable[tabindex]",function(e){t(e.currentTarget)}),$(document).on("click",".expandable-toggle",function(e){e.preventDefault();var t=$(this).closest(".expandable").toggleClass("open"),i=t.hasClass("open");i&&t.trigger("open"),$(this).attr("aria-expanded",i)});var h=$.fn.focus;return $.fn.focus=function(){return h.apply(this,arguments),document.activeElement===this[0]&&t(this[0]),this},$.fn.visibleFocus=function(){return h.apply(this)},$(document).on("keydown.f6",function(e){if(117===e.which&&(_.device("macos")||e.ctrlKey)){e.preventDefault();var t,i=$("#io-ox-core .f6-target:visible"),n=$(document.activeElement).closest(".f6-target"),o=i.index(n)||0,a=o;do{if((a+=e.shiftKey?-1:1)>=i.length&&(a=0),a<0&&(a=i.length-1),(t=i.eq(a)).is("input, select, textarea, button, .launcher a[href], [tabindex]:visible")){t.visibleFocus();break}if((t=s(t).first()).length){t.visibleFocus();break}}while(o!==a)}}),{collapse:function(e,t,i){i=_.extend({expanded:!1},i);var n=_.uniqueId("action"),o=_.uniqueId("content");e.addClass("collapsed").prop("id",n).attr({"data-target":"#"+o,"data-toggle":"collapse","aria-expanded":!1,"aria-controls":o}),t.addClass("collapse").addClass(i.expanded?"in":"").prop("id",o).attr({role:"region","aria-labelledby":n}).append(t),i.onChange&&_.isFunction(i.onChange)&&(t.on("show.bs.collapse shown.bs.collapse hide.bs.collapse hidden.bs.collapse",function(e){i.onChange.call(t,e.type)}),i.onChange.call(t,i.expanded?"show":"hide"))},dropdownTrapFocus:c,focusListSelection:a,getTabbable:s,getPreviousTabbable:r,getNextTabbable:l,menubarKeydown:f,trapFocus:function(e,t){var i=s(e);if(i.length){var n=$(document.activeElement).is("iframe")?i.index($(document.activeElement).contents()[0].activeElement):i.index(document.activeElement),o=t.shiftKey&&0===n,a=n===i.length-1;(o||a)&&(t.preventDefault(),n=((n+=t.shiftKey?-1:1)+i.length)%i.length,i.eq(n).focus())}}}});