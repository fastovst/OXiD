define("io.ox/core/folder/sort",["io.ox/core/extensions","io.ox/core/api/account"],function(t,i){"use strict";var n=t.point("io.ox/core/folder/sort");return n.extend({id:"1",sort:function(t){if("1"===t.id){var n=t.data,o=new Array(6),r="inbox sent drafts trash spam".split(" ");_(n).find(function(t){return i.isUnified(t.id)&&!!(o[0]=t)}),_(n).each(function(t){_(r).find(function(n,r){return i.is(n,t.id)&&!!(o[r+1]=t)})}),(n=_(n).reject(function(t){return i.isUnified(t.id)||i.isStandardFolder(t.id)})).sort(function(t,n){var o=i.isExternal(t.id),r=i.isExternal(n.id),e=t.title.toLowerCase()>n.title.toLowerCase()?1:-1;return o&&r?e:o?1:r?-1:e}),n.unshift.apply(n,_(o).compact()),t.data=n}}}),{apply:function(i,o){var r=t.Baton({id:i,data:o});return n.invoke("sort",null,r),r.data}}});