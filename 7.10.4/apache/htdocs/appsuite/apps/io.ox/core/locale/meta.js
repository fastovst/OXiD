define("io.ox/core/locale/meta",function(){"use strict";function e(){return ox.serverConfig&&ox.serverConfig.locales||r}function n(e){if(_.isEmpty(ox.serverConfig))return!1;var n=ox.serverConfig.languages,s=ox.serverConfig.locales||n;return!(!n[e]||!s[e])||(!!(n.de_DE&&s.de_DE&&/^de_(AT|CH)$/.test(e))||(!!(n.en_GB&&s.en_GB&&/^en_(GB|AU|CA|DE|IE|NZ|SG|ZA)$/.test(e))||(!!(n.es_MX&&s.es_MX&&/^es_(AR|BO|CL|CO|CR|DO|EC|SV|GT|HN|NI|PA|PE|PR|US)$/.test(e))||(!!(n.fr_FR&&s.fr_FR&&/^fr_(CH|BE)$/.test(e))||(!(!n.it_IT||!s.it_IT||"it_CH"!==e)||!(!n.nl_NL||!s.nl_NL||"nl_BE"!==e))))))}function s(){var n=_.getCookie("locale");if(n)return n;if(n=String(navigator.language||navigator.userLanguage),E[n])return E[n];var s=n.split("-");return(n=s[0]+"_"+(s[1]||s[0]).toUpperCase())in e()?n:"en_US"}function a(e){return"text!3rd.party/cldr-dates/"+(o[e]||"en-US")+"/ca-gregorian.json"}var r={ca_ES:"Català (Espanya)",cs_CZ:"Čeština (Česko)",da_DK:"Dansk (Danmark)",de_DE:"Deutsch (Deutschland)",de_AT:"Deutsch (Österreich)",de_CH:"Deutsch (Schweiz)",en_US:"English (United States)",en_GB:"English (United Kingdom)",en_AU:"English (Australia)",en_CA:"English (Canada)",en_DE:"English (Germany)",en_IE:"English (Ireland)",en_NZ:"English (New Zealand)",en_SG:"English (Singapore)",en_ZA:"English (South Africa)",es_ES:"Español (Espana)",es_MX:"Español (México)",es_AR:"Español (Argentina)",es_BO:"Español (Bolivia)",es_CL:"Español (Chile)",es_CO:"Español (Colombia)",es_CR:"Español (Costa Rica)",es_DO:"Español (Républica Dominicana)",es_EC:"Español (Ecuador)",es_SV:"Español (El Salvador)",es_GT:"Español (Guatemala)",es_HN:"Español (Honduras)",es_NI:"Español (Nicaragua)",es_PA:"Español (Panamá)",es_PY:"Español (Paraguay)",es_PE:"Español (Perú)",es_PR:"Español (Puerto Rico)",es_US:"Español (United States)",fi_FI:"Suomi (Suomi)",fr_FR:"Français (France)",fr_CA:"Français (Canada)",fr_CH:"Français (Suisse)",fr_BE:"Français (Belgique)",hu_HU:"Magyar (Magyarország)",it_IT:"Italiano (Italia)",it_CH:"Italiano (Svizzera)",lv_LV:"Latviešu (Latvija)",nl_NL:"Nederlands (Nederland)",nl_BE:"Nederlands (België)",nb_NO:"Norsk (Norge)",pl_PL:"Polski (Polska)",pt_BR:"Português (Brasil)",ru_RU:"Pусский (Россия)",ro_RO:"Română (România)",sk_SK:"Slovenčina (Slovensko)",sv_SE:"Svenska (Sverige)",tr_TR:"Türkçe (Türkiye)",ja_JP:"日本語 (日本)",zh_CN:"中文 (简体)",zh_TW:"中文 (繁體)"},t={ca_ES:"ca",cs_CZ:"cs",da_DK:"da",de_DE:"de",de_AT:"de-at",de_CH:"de-ch",en_US:"en",en_GB:"en-gb",en_AU:"en-au",en_CA:"en-ca",en_DE:"en-gb",en_IE:"en-ie",en_NZ:"en-nz",en_SG:"en-SG",en_ZA:"en-gb",es_ES:"es",es_MX:"es-do",es_AR:"es-do",es_BO:"es-do",es_CL:"es-do",es_CO:"es-do",es_CR:"es-do",es_DO:"es-do",es_EC:"es-do",es_SV:"es-do",es_GT:"es-do",es_HN:"es-do",es_NI:"es-do",es_PA:"es-do",es_PY:"es-do",es_PE:"es-do",es_PR:"es-do",es_US:"es-us",fi_FI:"fi",fr_FR:"fr",fr_CA:"fr-ca",fr_CH:"fr-ch",fr_BE:"fr",hu_HU:"hu",it_IT:"it",it_CH:"it-ch",lv_LV:"lv",nl_NL:"nl",nl_BE:"nl-be",nb_NO:"nb",pl_PL:"pl",pt_BR:"pt-br",ru_RU:"ru",ro_RO:"ro",sk_SK:"sk",sv_SE:"sv",tr_TR:"tr",ja_JP:"ja",zh_CN:"zh-cn",zh_TW:"zh-tw"},o={ca_ES:"ca",cs_CZ:"cs",da_DK:"da",de_DE:"de",de_AT:"de-AT",de_CH:"de-CH",en_US:"en",en_GB:"en-GB",en_AU:"en-AU",en_CA:"en-CA",en_DE:"en-DE",en_IE:"en-IE",en_NZ:"en-NZ",en_SG:"en-SG",en_ZA:"en-ZA",es_ES:"es",es_MX:"es-MX",es_AR:"es-AR",es_BO:"es-BO",es_CL:"es-CL",es_CO:"es-CO",es_CR:"es-CR",es_DO:"es-DO",es_EC:"es-EC",es_SV:"es-SV",es_GT:"es-GT",es_HN:"es-HN",es_NI:"es-NI",es_PA:"es-PA",es_PY:"es-PY",es_PE:"es-PE",es_PR:"es-PR",es_US:"es-US",fi_FI:"fi",fr_FR:"fr",fr_CA:"fr-CA",fr_CH:"fr-CH",fr_BE:"fr-BE",hu_HU:"hu",it_IT:"it",it_CH:"it-CH",lv_LV:"lv",nl_NL:"nl",nl_BE:"nl-BE",nb_NO:"nb",pl_PL:"pl",pt_BR:"pt",ru_RU:"ru",ro_RO:"ro",sk_SK:"sk",sv_SE:"sv",tr_TR:"tr",ja_JP:"ja",zh_CN:"zh",zh_TW:"zh"},i=["M/d/yy","M/d/yyyy","MM/dd/yy","MM/dd/yyyy","d.M.yy","d.M.yyyy","dd.MM.yy","dd.MM.yyyy","dd.MM.yyyy.","d/M/yy","dd/MM/yy","dd/MM/yyyy","dd-MM-yyyy","yyyy/MM/dd","yyyy.MM.dd.","yyyy-MM-dd"],d={"1,234.56":"en-us","1.234,56":"de-de","1’234.56":"de-ch","1 234,56":"de-at",1234.56:"en-us","1234,56":"de-de"},l={1234.56:!1,"1234,56":!1},u="sunday monday tuesday wednesday thursday friday saturday".split(" "),E={ca:"ca_ES",cs:"cs_CZ",da:"da_DK",en:"en_US",ja:"ja_JP",no:"nb_NO",nb:"nb_NO",sv:"sv_SE"},c={};return{getLocales:e,dateFormats:i,numberFormats:d,grouping:l,getLocaleName:function(n){return e()[n]||""},deriveMomentLocale:function(e){return t[e]||"en"},isSupportedLocale:n,getSupportedLocales:function(){return _(e()).map(function(e,n){return{id:n,name:e}}).filter(function(e){return n(e.id)}).sort(function(e,n){return e.name.localeCompare(n.name)})},getDefaultLocale:s,getValidDefaultLocale:function(){var e=s();if(n(e))return e;if(_.isEmpty(ox.serverConfig))return"en_US";var a=ox.serverConfig.locales||ox.serverConfig.languages;return a.en_US?"en_US":_(a).keys()[0]||"en_US"},deriveSupportedLanguageFromLocale:function(e){var n={en_DE:"en_US"},s={de:"de_DE",en:"en_GB",es:"es_MX",fr:"fr_FR",it:"it_IT",nl:"nl_NL"},a=function(e){return/^(en_US|es_ES|fr_CA)$/.test(e)?e:n[e]||s[String(e).substr(0,2)]||e}(e);return!_.isEmpty(ox.serverConfig)&&a in ox.serverConfig.languages?a:"en_US"},translateCLDRToMoment:function(e){return e=e.replace(/d/g,"D").replace(/EEEE/g,"dddd").replace(/E/g,"ddd").replace(/a/g,"A").replace(/y/g,"Y"),_(e.split("'")).reduce(function(e,n,s){return e+(s%2==1?"[":"]")+n})},translateMomentToCLDR:function(e){return e.replace(/dddd/g,"EEEE").replace(/(ddd|dd|d)/g,"E").replace(/A/g,"a").replace(/D/g,"d").replace(/Y/g,"y").replace(/(\[|\])/,"'")},getCLDRDateFilePath:a,mapToCLDRFiles:o,CLDRDefinitions:c,loadCLDRData:function(e){var n=$.Deferred();return c[e]&&n.resolve(c[e]),require([a(e)],function(s){c[e]=JSON.parse(s).main[o[e]].dates.calendars.gregorian,n.resolve(c[e])}),n},weekday:{index:function(e){return u.indexOf(e)},name:function(e){return u[e]}}}});