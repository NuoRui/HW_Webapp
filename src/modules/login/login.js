require('./login.less');

var utils = require('../core/utils');
var api = require('../core/api');
var storage = require('../core/storage');
var loginPopupHtml = require('./login.html');

var loginModule = {
    show: function() {
		nrApp.popup(loginPopupHtml);

		this.bindEvents();
    },

    bindEvents: function() {
    	var self = this;

        var bindings = [{
            element: '#loginPopup',
            selector: '.login-button',
            event: 'click',
            handler: self.loginAction
        }];

		utils.bindEvents(bindings);
    },

    loginAction: function() {
        var usernameValue = $$('#loginPopup').find('.username').val();
        var passwordValue = $$('#loginPopup').find('.password').val();

        if (usernameValue == '') {
            nrApp.alert('用户名不能为空');
            return;
        }

        if (passwordValue == '') {
            nrApp.alert('密码不能为空');
            return;
        }

        api.login(function(user) {
			storage.setUser(user);
			gUser = user;

			nrApp.showIndicator();
			loginModule.loadData();
			setTimeout(function () {
				nrApp.closeModal('#loginPopup');
				nrApp.hideIndicator();
			}, 1000);

        }, usernameValue, passwordValue);
    },

	loadData: function () {
    	api.getSuppliers(function (data) {
			gRepository.suppliers = data;
			storage.setRepository(gRepository);
		}, gUser.employee_id);
	}
};

module.exports = loginModule;
