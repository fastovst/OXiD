define("io.ox/core/tk/visibility-api-util",[],function(){var i,d,e={isHidden:!1,isSupported:!1,hiddenAttribute:"",visibilityChangeEvent:""};return void 0!==document.hidden?(i="hidden",d="visibilitychange"):void 0!==document.mozHidden?(i="mozHidden",d="mozvisibilitychange"):void 0!==document.msHidden?(i="msHidden",d="msvisibilitychange"):void 0!==document.webkitHidden&&(i="webkitHidden",d="webkitvisibilitychange"),void 0!==document[i]&&(e.isSupported=!0,e.hiddenAttribute=i,e.visibilityChangeEvent=d,e.isHidden=!!document[i],$(document).on(d,function(){var i=e.isHidden;e.isHidden=!!document[e.hiddenAttribute],$(e).trigger("visibility-changed",{currentHiddenState:e.isHidden,oldState:i})})),e});