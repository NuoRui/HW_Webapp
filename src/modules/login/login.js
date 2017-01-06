require('./login.less');

var utils = require('../core/utils');
var api = require('../core/api');
var storage = require('../core/storage');
var repository = require('../core/repository');
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
        var usernameValue = $$('#loginPopup').find('[name=username]').val();
        var passwordValue = $$('#loginPopup').find('[name=password]').val();

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
			repository.loadData(window.gRepository);

			setTimeout(function () {
				nrApp.closeModal('#loginPopup');
				nrApp.hideIndicator();
			}, 1000);

        }, usernameValue, passwordValue);
    },

	logout: function () {
		nrApp.confirm('你确定要退出登录吗？', function () {
			storage.delUser();
			repository.delRepository();
            if (utils.isPhonegap()) {
                window.location.reload();
            } else {
                window.location.href = gConfig.root;
            }
		});
	}
};

module.exports = loginModule;
