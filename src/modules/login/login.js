require('./login.less');

var appFunc = require('../utils/appFunc');
var api = require('../api/api');
var storage = require('../utils/storage');
var authService = require('../services/authService');
var loginPopupHtml = require('./login.html');

var loginModule = {
    show: function() {
		nrApp.popup(loginPopupHtml);

		this.bindEvents();
    },

    bindEvents: function() {
        var bindings = [{
            element: '#loginPopup',
            selector: '.login-button',
            event: 'click',
            handler: loginModule.loginAction
        }];

        appFunc.bindEvents(bindings);
    },

    loginAction: function() {
        var usernameValue = $$('#loginPopup').find('.username').val();
        var passwordValue = $$('#loginPopup').find('.password').val();

        if (usernameValue == '') {
            nrApp.alert('用户名不能为空');
            return false;
        }

        if (passwordValue == '') {
            nrApp.alert('密码不能为空');
            return false;
        }

        api.login(function(user) {
			gUser = storage.setUser(user);
			nrApp.closeModal('#loginPopup');
        }, usernameValue, passwordValue);
    }
}

module.exports = loginModule;
