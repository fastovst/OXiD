define("io.ox/core/api/conversion",["io.ox/core/api/factory","io.ox/core/http"],function(o,e){"use strict";var t=o({module:"convert",requests:{get:{action:"get"}}});return t.convert=function(o,t){return e.PUT({module:"conversion",params:{action:"convert"},data:{datasource:o,datahandler:t}})},t});