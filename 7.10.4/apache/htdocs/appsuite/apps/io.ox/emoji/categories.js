define("io.ox/emoji/categories",["gettext!io.ox/mail","raw!io.ox/emoji/unified.json","raw!io.ox/emoji/softbank.json","raw!io.ox/emoji/japan_carrier.json"],function(e,o,a,i){"use strict";return{unified:JSON.parse(o),softbank:JSON.parse(a),japan_carrier:JSON.parse(i),recently:{name:"recently",iconClass:"emoji-unified emoji1f552"},translations:{unified:e("Unified"),softbank:e("SoftBank"),japan_carrier:e("Japanese Carrier"),recently:e("Recently used"),Face:e("Face"),Feeling_Decoration:e("Feeling • Decoration"),Weather_Season:e("Weather • Season"),Character:e("Character"),Food:e("Food"),Life:e("Life"),Tool:e("Tool"),Hobby:e("Hobby"),Letters_Symbols:e("Letters • Symbols"),People:e("People"),Symbols:e("Symbols"),Nature:e("Nature"),Objects:e("Objects"),Places:e("Places"),commonEmoji:e("Common Emoji"),allEmoji:e("All Emoji")}}});