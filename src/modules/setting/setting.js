require('./setting.less');

var appFunc = require('../utils/appFunc'),
    storageService = require('../services/storageService'),
    authService = require('../services/authService'),
    template = require('./setting.tpl.html');

var settingView = {
    pageInit: function () {
        settingView.bindEvents();
    },
    renderSetting: function () {
        if ($$('#settingView .page-content')[0]) return;

		nrApp.showIndicator();

        var user = storageService.getUser();

        var renderData = {
            username: user.username,
            employeeName: user.employee_name,
            avatarUrl: 'http://news.mydrivers.com/Img/20110518/04481549.png',
        };

        var output = appFunc.renderTpl(template, renderData);
        $$('#settingView .page[data-page="setting"]').html(output);

        nrApp.hideIndicator();
    },
    logOut: function () {
		nrApp.confirm('你确定要退出登录吗？', function () {
            authService.signOut()
        });
    },
    bindEvents: function () {
        var bindings = [{
            element: '#settingView',
            event: 'show',
            handler: settingView.renderSetting
        }, {
            element: '#settingView',
            selector: '.logout-button',
            event: 'click',
            handler: settingView.logOut
        }, {
            element: '#settingView',
            selector: '.update-button',
            event: 'click',
            //handler: settingView.checkVersion
        }];
        appFunc.bindEvents(bindings);
    }
};

module.exports = settingView;