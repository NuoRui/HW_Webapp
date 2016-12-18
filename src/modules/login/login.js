require('./login.less');

var appFunc = require('../utils/appFunc');
var apiServer = require('../api/apiServer');
var authService = require('../services/authService');
var loginPopupHtml = require('./login.html');

var loginModule = {
    init: function() {

		var a = nrApp.popup(loginPopupHtml);
		log(a)

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

    loginAction: function(e) {
		nrApp.closeModal('.login-popup');
        // var usernameValue = $$(this).find('.username').val(),
        //     passwordValue = $$(this).find('.password').val();
		//
        // if (usernameValue == '') {
        //     nrApp.alert('用户名不能为空');
        //     return false;
        // }
		//
        // if (passwordValue == '') {
        //     nrApp.alert('密码不能为空');
        //     return false;
        // }
		//
        // apiServer.login(function(user) {
        //     authService.signIn(user);
		//
        // }, usernameValue, passwordValue);
    }
}

module.exports = loginModule;
