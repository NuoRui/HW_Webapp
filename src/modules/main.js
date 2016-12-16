require('../style/less/app.less');

var appFunc = require('./utils/appFunc');
var authService = require('./services/authService');
var config = require('./config');
var router = require('./router');
var homeView = require('./home/home');
var settingView = require('./setting/setting');


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

        window.gHomeView = nrApp.addView('#homeView', {
            dynamicNavbar: true
        });

        window.gSettingView = nrApp.addView('#settingView', {
            dynamicNavbar: true
        });

        window.gConfig = config;

        router.init();
        homeView.init();
        settingView.init();

        authService.authentication();
    }
};

app.initialize();
