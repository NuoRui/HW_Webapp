
var index = require('./app/app');
var indentModule = require('./indent/indent');
var indentNewModule = require('./indent/new/indent.new');
var indentEditModule = require('./indent/edit/indent.edit');
var loginModule = require('./auth/login');
var appFunc = require('./utils/appFunc'),
    tweetModule = require('./tweet/tweet'),
    feedbackModule = require('./feedback/feedback'),
    aboutModule = require('./about/about'),
    languageModule = require('./language/language'),
    messageModule = require('./message/message');

module.exports = {
    init: function () {
        var self = this;
        $$(document).on('pageBeforeInit', function (e) {
            var page = e.detail.page;
			self.pageBeforeInit(page);
        });

        $$(document).on('pageAfterAnimation', function (e) {
            var page = e.detail.page;
			self.pageAfterAnimation(page);
        });
    },

    pageAfterAnimation: function (page) {
        var name = page.name;
        var from = page.from;

        if (name === 'homeView' || name === 'setting') {
            if (from === 'left') {
                appFunc.showToolbar();
            }
        }

		switch (name) {
			case 'login':
				loginModule.pageAfterAnimation && indentModule.pageAfterAnimation();
				break;
			case 'indent':
				indentModule.pageAfterAnimation ? indentModule.pageAfterAnimation() : '';
				break;
			case 'indent.new':
				indentNewModule.pageAfterAnimation ? indentModule.pageAfterAnimation() : '';
				break;
			case 'indent.edit':
				indentEditModule.pageAfterAnimation ? indentModule.pageAfterAnimation() : '';
				break;
		}
    },

    pageBeforeInit: function (page) {
        var name = page.name;
        var query = page.query;

        switch (name) {
            case 'about':
                aboutModule.init();
				break;
            case 'login':
                loginModule.init();
				break;
            case 'indent':
                indentModule.init();
                break;
			case 'indent.new':
				indentNewModule.init();
				break;
			case 'indent.edit':
				indentEditModule.init();
				break;
			case 'about':
				aboutModule.init();
				break;
            case 'feedback':
                feedbackModule.init();
                break;
            case 'item':
                tweetModule.init(query);
                break;
            case 'message':
                messageModule.init(query);
                break;
            case 'language':
                languageModule.init();
                break;
        }
    }
};