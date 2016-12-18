var appFunc = require('../utils/appFunc');
var storageService = require('./storageService');

function redirect() {
    // var currentView = appFunc.getCurrentView();
    appFunc.getCurrentView().router.loadPage('page/login.html');
}

var authService = {
    authentication: function() {
		window.gUser = storageService.getUser();
        if (appFunc.isEmpty(window.gUser)) {
            redirect();
        }
    },
    signOut: function() {
        storageService.delUser();
        redirect();
    },
    signIn: function(user) {
        storageService.setUser(user);
        appFunc.getCurrentView().router.back();
        // homeF7View.router.loadPage('index.html');
    }
};

module.exports = authService;
