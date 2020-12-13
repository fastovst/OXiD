define("io.ox/backbone/mini-views/colorpicker",["io.ox/backbone/mini-views/dropdown","gettext!io.ox/core","less!io.ox/backbone/mini-views/colorpicker"],function(e,a){"use strict";var n=[{value:"#000000",name:a("Black")},{value:"#993300",name:a("Burnt orange")},{value:"#333300",name:a("Dark olive")},{value:"#003300",name:a("Dark green")},{value:"#003366",name:a("Dark azure")},{value:"#000080",name:a("Navy Blue")},{value:"#333399",name:a("Indigo")},{value:"#333333",name:a("Very dark gray")},{value:"#800000",name:a("Maroon")},{value:"#FF6600",name:a("Orange")},{value:"#808000",name:a("Olive")},{value:"#008000",name:a("Green")},{value:"#008080",name:a("Teal")},{value:"#0000FF",name:a("Blue")},{value:"#666699",name:a("Grayish blue")},{value:"#808080",name:a("Gray")},{value:"#FF0000",name:a("Red")},{value:"#FF9900",name:a("Amber")},{value:"#99CC00",name:a("Yellow green")},{value:"#339966",name:a("Sea green")},{value:"#33CCCC",name:a("Turquoise")},{value:"#3366FF",name:a("Royal blue")},{value:"#800080",name:a("Purple")},{value:"#999999",name:a("Medium gray")},{value:"#FF00FF",name:a("Magenta")},{value:"#FFCC00",name:a("Gold")},{value:"#00CCFF",name:a("Sky blue")},{value:"#993366",name:a("Red violet")},{value:"#FF99CC",name:a("Pink")},{value:"#99CCFF",name:a("Light sky blue")},{value:"#CC99FF",name:a("Plum")},{value:"transparent",name:a("No color")}],t=e.extend({setup:function(e){var a=$("<tbody>");e.$ul=$('<table class="dropdown-menu colorpicker-table" role="list">').append(a),e.noDetach=!0,t.__super__.setup.call(this,e),this.options=_.extend({defaultColors:n,itemsPerRow:8},e);for(var i=[],l=0;l<this.options.defaultColors.length/this.options.itemsPerRow;l++){i.push($('<tr role="presentation">'));for(var o=0;o<this.options.itemsPerRow;o++){var r=this.options.defaultColors[l*this.options.itemsPerRow+o];if(!r)break;var u;i[l].append($('<td role="listitem">').append(u=$('<div tabindex="-1" class="colorpicker-item" role="option">').data("value",r.value).attr({"data-name":this.name,title:r.name,"data-value":r.value}).css("background-color",r.value))),"transparent"===r.value&&u.append($('<i class="fa fa-times" aria-hidden="true">'))}}a.append(i),this.$ul.on("click","td .colorpicker-item",this.onClick.bind(this)),this.$ul.on("keydown","td .colorpicker-item",this.onKeydownItem.bind(this))},setDropdownOverlay:function(){t.__super__.setDropdownOverlay.call(this),_.defer(function(){var e=this.$ul.find("td .colorpicker-item"),a=this.model?e.filter('[data-value="'+this.model.get(this.name)+'"]'):void 0;return $(a.length?a:e).first().focus()}.bind(this))},onKeydownItem:function(e){if(13===e.which)return $(e.target).trigger("click");if(/(9|37|38|39|40)/.test(e.which)){var a=$(e.target),n=this.$ul.find("td .colorpicker-item"),t=n.index(a);(37===e.which||38===e.which||9===e.which&&e.shiftKey)&&t--,(39===e.which||40===e.which||9===e.which&&!e.shiftKey)&&t++,9===e.which&&e.preventDefault(),t<0&&(t+=n.length),t>=n.length&&(t-=n.length),_.defer(function(){n.eq(t).focus()})}}});return t});