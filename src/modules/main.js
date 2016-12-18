var config = require('./config');
var router = require('./router');
var appFunc = require('./utils/appFunc');
var authService = require('./services/authService');
var setting = require('./setting/setting');
var home = require('./home/home');
var login = require('./login/login');

var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        if (appFunc.isPhonegap()) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            window.onload = this.onDeviceReady();
        }
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(event) {
        switch (event) {
            case 'deviceready':
                app.initFramework7();
                break;
        }
    },

    initFramework7: function() {
        window.$$ = Dom7;
        window.nrApp = new Framework7({
            pushState: false,
            popupCloseByOutside: false,
            animateNavBackIcon: true,
            modalTitle: '系统消息',
            modalButtonOk: '确定',
            modalButtonCancel: '取消',
            template7Pages: true
        });

		window.gConfig = config;
		window.gUser = {};

		window.log = function () {
			if (!config.debug) {
				return;
			}
			console.log(arguments);
		};

        nrApp.addView('#homeView', {
            dynamicNavbar: true
        });

        nrApp.addView('#settingView', {
            dynamicNavbar: true
        });

        router.init();
		setting.pageInit();
		home.pageInit();

		login.init();

        // authService.authentication();
    }
};

app.initialize();
