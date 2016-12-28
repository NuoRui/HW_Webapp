var config = require('./config');
var router = require('./router');
var utils = require('./core/utils');
var storage = require('./core/storage');
var repository = require('./core/repository');
var setting = require('./setting/setting');
var home = require('./home/home');
var login = require('./login/login');

var app = {
	initialize: function () {
		// document.ontouchmove = function (e) {
		// 	e.preventDefault();
		// };
		this.bindEvents();
	},

	bindEvents: function () {
		if (utils.isPhonegap()) {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		} else {
			window.onload = this.onDeviceReady();
		}
	},

	onDeviceReady: function () {
		app.receivedEvent('deviceready');
	},

	receivedEvent: function (event) {
		switch (event) {
			case 'deviceready':
				app.initApp();
				break;
		}
	},

	initApp: function () {
		Template7.registerHelper('if_compare', function (a, operator, b, options) {
			var match = false;
			if ((operator === '==' && a == b) || (operator === '===' && a === b) || (operator === '!=' && a != b)
				|| (operator === '>' && a > b) || (operator === '<' && a < b) || (operator === '>=' && a >= b)
				|| (operator === '<=' && a <= b)) {
				match = true;
			}

			if (match) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		});

		window.$$ = Dom7;
		window.gConfig = config;
		window.gUser = storage.getUser();
		window.gRepository = repository.getRepository();
console.log(gRepository)

		window.nrApp = new Framework7({
			pushState: false,
			smartSelectInPopup: true,
			smartSelectPopupCloseText: '',
			smartSelectPopupCloseTemplate: '<div class="left"></div>',
			animateNavBackIcon: true,
			modalTitle: config.modalTitle,
			modalButtonOk: config.modalButtonOk,
			modalButtonCancel: config.modalButtonCancel,
			template7Pages: true
		});

		window.log = function () {
			if (!config.debug) {
				return;
			}
			console.log.apply(console, arguments);
		};

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
