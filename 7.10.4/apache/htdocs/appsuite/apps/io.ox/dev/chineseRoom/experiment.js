define("io.ox/dev/chineseRoom/experiment",["io.ox/dev/chineseRoom/room","io.ox/realtime/rt"],function(e,o){"use strict";return console.log("Setting up experiment"),window.rooms=e,window.r=e.getRoom("a"),window.rt=o,window.rtExperiments={run:function(){function e(){var n=!1;_(i).each(function(e,r){if(console.log(r,e),e>4)return console.log("MISSING MESSAGE: ",ox.base+"///"+r),clearInterval(o),window.r.leave(),void(n=!0);i[r]++}),n||setTimeout(e,1e3)}window.r.join();var o,n=0,i={};o=setInterval(function(){window.r.sayAndTrace(n,ox.base+"///"+n),i[n]=0,n++},500),window.r.on("received",function(e,o){delete i[Number(o.message)],console.log("Received: ",o,i)}),setTimeout(e,1e3)}},console.log("Done"),!0});