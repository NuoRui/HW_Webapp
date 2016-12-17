require('./login.less');

var appFunc = require('../utils/appFunc'),
    apiServer = require('../api/apiServer'),
    authService = require('../services/authService');

var loginModule = {
    init: function() {
        appFunc.hideToolbar();

        this.bindEvents();
    },

    bindEvents: function() {
        var bindings = [{
            element: '#loginButton',
            selector: '.login-page',
            event: 'click',
            handler: loginModule.loginAction
        }];

        appFunc.bindEvents(bindings);
    },

    loginAction: function() {
        var usernameValue = $$(this).find('.username').val(),
            passwordValue = $$(this).find('.password').val();

        if (usernameValue == '') {
            nrApp.alert('用户名不能为空');
            return false;
        }

        if (passwordValue == '') {
            nrApp.alert('密码不能为空');
            return false;
        }

        apiServer.login(function(user) {
            authService.signIn(user);
        }, usernameValue, passwordValue);
    }
}

module.exports = loginModule;
