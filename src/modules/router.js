var appFunc = require('./utils/appFunc');
var homeModule = require('./home/home');
var settingModule = require('./setting/setting');
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

		switch (name) {
			case 'home.page':
				homeModule.pageInit && homeModule.pageInit(page);
				break;

			case 'setting.page':
				settingModule.pageInit && settingModule.pageInit(page);
				break;

			case 'about.page':
				aboutModule.pageInit && aboutModule.pageInit(page);
				break;

			case 'indent.page':
				indentModule.pageInit && indentModule.pageInit(page);
				break;


			case 'quotation':
				quotationModule.init();
				break;
			case 'quotation.detail':
				quotationDetailModule.init(query);
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

		}
	},

	pageBeforeAnimation: function (page) {
		var name = page.name;

		switch (name) {
			case 'home.page':
				homeModule.pageBeforeAnimation && homeModule.pageBeforeAnimation(page);
				break;

			case 'setting.page':
				settingModule.pageBeforeAnimation && settingModule.pageBeforeAnimation(page);
				break;

			case 'about.page':
				aboutModule.pageBeforeAnimation && aboutModule.pageBeforeAnimation(page);
				break;

			case 'indent.page':
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

		switch (name) {
			case 'home.page':
				homeModule.pageAfterAnimation && homeModule.pageAfterAnimation(page);
				break;

			case 'setting.page':
				settingModule.pageAfterAnimation && settingModule.pageAfterAnimation(page);
				break;

			case 'about.page':
				aboutModule.pageAfterAnimation && aboutModule.pageAfterAnimation(page);
				break;

			case 'indent.page':
				indentModule.pageAfterAnimation && indentModule.pageAfterAnimation(page);
				break;



			case 'indent.new':
				indentNewModule.pageAfterAnimation && indentNewModule.pageAfterAnimation(page);
				break;
			case 'indent.edit':
				indentEditModule.pageAfterAnimation && indentEditModule.pageAfterAnimation();
				break;
		}
    },

	pageBack: function (page) {
		var name = page.name;

		switch (name) {
			case 'home.page':
				homeModule.pageBack && homeModule.pageBack(page);
				break;

			case 'setting.page':
				settingModule.pageBack && settingModule.pageBack(page);
				break;

			case 'about.page':
				aboutModule.pageBack && aboutModule.pageBack(page);
				break;

			case 'indent.page':
				indentModule.pageBack && indentModule.pageBack(page);
				break;





			case 'indent.new':
				indentNewModule.pageBack && indentNewModule.pageBack(page);
				break;

			case 'indent.edit':
				indentEditModule.pageBack && indentEditModule.pageBack();
				break;
		}
	}
};
