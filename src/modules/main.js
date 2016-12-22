var config = require('./config');
var router = require('./router');
var utils = require('./core/utils');
var storage = require('./core/storage');
var repository = require('./core/repository');
var setting = require('./setting/setting');
var home = require('./home/home');
var login = require('./login/login');

var app = {
    initialize: function() {
		document.ontouchmove = function(e){ e.preventDefault(); };
		this.bindEvents();
    },

    bindEvents: function() {
        if (utils.isPhonegap()) {
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
			smartSelectInPopup: true,
			smartSelectBackText: '',
			smartSelectPopupCloseText: '',
			smartSelectPopupCloseTemplate: '<div class="left"></div>',
            popupCloseByOutside: true,
            animateNavBackIcon: true,
            modalTitle: '系统消息',
            modalButtonOk: '确定',
            modalButtonCancel: '取消',
            template7Pages: true
        });

		window.gConfig = config;

		window.gUser = storage.getUser();
		window.gRepository = repository.getRepository();

		window.log = function () {
			if (!config.debug) {
				return;
			}
			console.log.apply(console, arguments);
		};
		log(gRepository)
        nrApp.addView('#homeView', {
            dynamicNavbar: true
        });

        nrApp.addView('#settingView', {
            dynamicNavbar: true
        });

        router.init();

		home.init();
		setting.init();

        if (utils.isEmpty(gUser)) {
			login.show();
		}
    }
};

app.initialize();
