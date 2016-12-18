require('./setting.less');

var appFunc = require('../utils/appFunc');
var storage = require('../utils/storage');
var aboutPageHtml = require('../about/about.html');

var settingModule = {
	init: function () {
		this.bindEvents();
	},

    pageInit: function (page) {
		this.bindEvents();
    },

	pageAfterAnimation: function (page) {
		nrApp.showToolbar('.toolbar');
	},

	bindEvents: function () {
		var self = this;

		var bindings = [{
			element: '#settingView',
			event: 'show',
			handler: self.renderSetting
		}, {
			element: '#settingPage',
			selector: '.logout-button',
			event: 'click',
			handler: self.logoutAction
		}, {
			element: '#settingPage',
			selector: '.about-button',
			event: 'click',
			handler: self.aboutAction
		}];
		appFunc.bindEvents(bindings);
	},

    renderSetting: function () {
		if (appFunc.isEmpty(gUser)) {
			window.location.href = '/';
			return;
		}

		$$('.account span.val').html(gUser.username);
		$$('.name span.val').html(gUser.employee_name);
    },

	aboutAction: function () {
		nrApp.getCurrentView().router.loadContent(aboutPageHtml);
	},

    logoutAction: function () {
		nrApp.confirm('你确定要退出登录吗？', function () {
			storage.delUser();
			window.location.href = '/';
        });
    }

};

module.exports = settingModule;