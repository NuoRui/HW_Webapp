var appFunc = require('./utils/appFunc');
var homeModule = require('./home/home');
var loginModule = require('./auth/login');
var aboutModule = require('./about/about');
var indentModule = require('./indent/indent');
var indentNewModule = require('./indent/new/indent.new');
var indentEditModule = require('./indent/edit/indent.edit');
var indentDetailItemModule = require('./indent/detailItem/indent.detailItem');


module.exports = {
    init: function () {
        var self = this;

		$$(document).on('pageInit', function (e) {
			var page = e.detail.page;
			self.pageInit(page);
		});

		$$(document).on('pageBeforeAnimation', function (e) {
			var page = e.detail.page;
			self.pageBeforeAnimation(page);
		});

        $$(document).on('pageAfterAnimation', function (e) {
            var page = e.detail.page;
			self.pageAfterAnimation(page);
        });

		$$(document).on('pageBack', function (e) {
			var page = e.detail.page;
			self.pageBack(page);
		});
    },

	pageInit: function (page) {
		var name = page.name;
log(name)
		switch (name) {
			case 'home.page':
				homeModule.pageInit && homeModule.pageInit(page);
				break;

			case 'login':
				loginModule.init && loginModule.init(page);
				break;
			case 'indent':
				indentModule.init && indentModule.init(page);
				break;
			case 'indent.new':
				indentNewModule.init && indentNewModule.init(page);
				break;
			case 'indent.edit':
				indentEditModule.init && indentEditModule.init(page);
				break;
			case 'indent.detailItem':
				indentDetailItemModule.init && indentDetailItemModule.init(page);
				break;
			case 'about':
				aboutModule.init && aboutModule.init(page);
				break;
		}
	},

	pageBeforeAnimation: function (page) {
		var name = page.name;

		switch (name) {
			case 'login':
				loginModule.pageBeforeAnimation && loginModule.pageBeforeAnimation(page);
				break;
			case 'indent':
				indentModule.pageBeforeAnimation && indentModule.pageBeforeAnimation(page);
				break;
			case 'indent.new':
				indentNewModule.pageBeforeAnimation && indentNewModule.pageBeforeAnimation(page);
				break;
			case 'indent.edit':
				indentEditModule.pageBeforeAnimation && indentEditModule.pageBeforeAnimation(page);
				break;
		}
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
				loginModule.pageAfterAnimation && loginModule.pageAfterAnimation();
				break;
			case 'indent':
				indentModule.pageAfterAnimation && indentModule.pageAfterAnimation();
				break;
			case 'indent.new':
				indentNewModule.pageAfterAnimation && indentNewModule.pageAfterAnimation(page);
				break;
			case 'indent.edit':
				indentEditModule.pageAfterAnimation && indentEditModule.pageAfterAnimation();
				break;
		}
    }
};