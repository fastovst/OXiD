define("io.ox/core/settings/defaults",function(){"use strict";var e;if(ox.serverConfig&&ox.serverConfig.languages){var o=Object.keys(ox.serverConfig.languages);e=_(o).contains("en_US")?"en_US":o[0]}else e="en_US";var n=_.getCookie("language");return n&&(e=n),{language:e,region:"",refreshInterval:3e5,design:"primary",autoStart:"io.ox/mail/main",coloredIcons:!1,autoOpenNotification:"noEmail",autoLogout:0,showDesktopNotifications:!0,settings:{downloadsDisabled:!1}}});