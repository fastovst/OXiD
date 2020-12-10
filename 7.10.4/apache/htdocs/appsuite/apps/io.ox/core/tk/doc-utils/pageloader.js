define("io.ox/core/tk/doc-utils/pageloader",["io.ox/core/pdf/pdfview","io.ox/core/tk/doc-utils/baseobject","io.ox/core/tk/doc-utils/timermixin"],function(e,t,i){"use strict";function a(e,t,i){var a=$(e).attr(t);return _.isString(a)?parseInt(a,10):i}var o=_.device("touch")?2:5,r=0,n={visibility:"visible"};return t.extend({constructor:function(e,d){function s(e,t,i){var a=$.Deferred(),o=$(e),r=i&&i.format||"png";if(i=$.extend({pageNumber:t,pageZoom:1},i||{}),"pdf"===r){o.data("data-rendertype","pdf"),o.data("data-pagezoom",i.pageZoom);var n=d.createPDFPageNode(o,i);n?a.resolve(n):a.reject()}return a.promise()}var u=this,c={high:[],medium:[],low:[]},l={},f=null;t.call(this),i.call(this),this.abortQueuedRequests=function(){return _.each(c,function(e,t){_.each(e,function(e){e.node.empty(),delete l[e.page]}),c[t]=[]}),this},this.loadPage=this.createDebouncedMethod(function(e,t,i){var a=null,o=$(e),r=i&&i.priority||"medium";if(t in l)return l[t].def.promise();var n=$("<div>").addClass("abs").busy();return o.empty().append(n),a={node:o,page:t,options:i,def:$.Deferred()},c[r].push(a),l[t]=a,a.def.promise().always(function(){n.remove()})},function(){f||(f=u.repeatDelayed(function(){var e=null;if(!(r>o||r===o&&0===c.high.length)){if(!(e=c.high.shift()||c.medium.shift()||c.low.shift()))return i.BREAK;++r,s(e.node,e.page,e.options).done(function(t){e.node.removeClass("page-error"),e.def.resolve(t)}).fail(function(t){e.node.addClass("page-error").html('<div class="error-icon"><i class="fa-times" aria-hidden="true"></i></div>').css(n),e.def.reject(t)}).always(function(){--r,l&&delete l[e.page]})}},20)).always(function(){f=null})}),this.getPageZoom=function(e){return $(e).data("page-zoom")||1},this.setPageZoom=function(t,i){var o=a(t,"data-page",1),r=$(t),s=e.getOriginalPageSize(o),u=r.data("data-rendertype"),c={width:Math.ceil(s.width*i),height:Math.ceil(s.height*i)},l=null;return r.data("page-zoom",i).attr(c).css(c),"pdf"===u&&(l=d.renderPDFPage(r,o,i).then(function(){r.data("page-zoom",i).attr(c).css(n)})),l||$.when()},this.registerDestructor(function(){u=c=l=f=null})}})});