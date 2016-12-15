require('./setting.less');

var appFunc = require('../utils/appFunc'),
    storageService = require('../services/storageService'),
    template = require('./setting.tpl.html');

var settingView = {
    init: function () {
        settingView.bindEvents();
    },
    renderSetting: function () {
        if ($$('#settingView .page-content')[0]) return;

        hiApp.showIndicator();

        var renderData = {
            avatarUrl: 'http://lorempixel.com/68/68/people/7/',
            nickName: 'HiApp',
            points: '100'
        };

        var output = appFunc.renderTpl(template, renderData);
        $$('#settingView .page[data-page="setting"]').html(output);

        hiApp.hideIndicator();
    },
    logOut: function () {
        hiApp.confirm('你确定要退出登录吗？', function () {
            storageService.delUser();
            settingF7View.router.loadPage('../page/login.html');
            appFunc.hideToolbar();
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