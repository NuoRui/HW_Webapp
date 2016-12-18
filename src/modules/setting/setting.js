require('./setting.less');

var appFunc = require('../utils/appFunc');
var storage = require('../utils/storage');

var settingModule = {
	init: function () {
		this.bindEvents();
	},

    pageInit: function () {
		this.bindEvents();
    },

	bindEvents: function () {
		var self = this;

		var bindings = [{
			element: '#settingView',
			event: 'show',
			handler: self.renderSetting
		}, {
			element: '#settingView',
			selector: '.logout-button',
			event: 'click',
			handler: self.logOut
		}, {
			element: '#settingView',
			selector: '.update-button',
			event: 'click',
			//handler: settingView.checkVersion
		}];
		appFunc.bindEvents(bindings);
	},

    renderSetting: function () {
		if (appFunc.isEmpty(gUser)) {
			window.location.href = '/';
			return;
		}

		$$('.account span.val').html(gUser.id);
		$$('.name span.val').html(gUser.name);
    },

    logOut: function () {
		nrApp.confirm('你确定要退出登录吗？', function () {
			storage.delUser();
			window.location.href = '/';
        });
    }

};

module.exports = settingModule;