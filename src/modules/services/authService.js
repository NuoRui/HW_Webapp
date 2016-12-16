var appFunc = require('../utils/appFunc');
var storageService = require('./storageService');

function redirect() {
    homeF7View.router.loadPage('page/login.html');
    appFunc.hideToolbar();
}

var authService = {
    authentication: function() {
        var user = storageService.getUser();

        if (appFunc.isEmpty(user)) {
            redirect();
        }
    },
    signOut: function() {
        storageService.delUser();
        redirect();
    },

}

module.exports = authService;
