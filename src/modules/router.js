var homeModule = require('./home/home');
var settingModule = require('./setting/setting');
var aboutModule = require('./about/about');
var quotationModule = require('./quotation/quotation');
var quotationDetailModule = require('./quotation/detail/quotation.detail');
var indentModule = require('./indent/indent');
var indentNewModule = require('./indent/new/indent.new');
var indentEditModule = require('./indent/edit/indent.edit');



module.exports = {
    init: function () {
        var self = this;

		$$(document).on('pageBeforeInit', function (e) {
			var page = e.detail.page;
			self.pageBeforeInit(page);
		});

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

		$$(document).on('pageBeforeRemove', function (e) {
			var page = e.detail.page;
			self.pageBeforeRemove(page);
		});
    },

	pageBeforeInit: function (page) {
		var name = page.name;

		switch (name) {
			case 'home.page':
				homeModule.pageBeforeInit && homeModule.pageBeforeInit(page);
				break;

			case 'setting.page':
				settingModule.pageBeforeInit && settingModule.pageBeforeInit(page);
				break;

			case 'about.page':
				aboutModule.pageBeforeInit && aboutModule.pageBeforeInit(page);
				break;

			case 'quotation.page':
				quotationModule.pageBeforeInit && quotationModule.pageBeforeInit(page);
				break;

			case 'quotation.detail.page':
				quotationDetailModule.pageBeforeInit && quotationDetailModule.pageBeforeInit(page);
				break;

			case 'indent.page':
				indentModule.pageBeforeInit && indentModule.pageBeforeInit(page);
				break;

			case 'indent.new.page':
				indentNewModule.pageBeforeInit && indentNewModule.pageBeforeInit(page);
				break;

			case 'indent.edit.page':
				indentEditModule.pageBeforeInit && indentEditModule.pageBeforeInit(page);
				break;
		}
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

			case 'quotation.page':
				quotationModule.pageInit && quotationModule.pageInit(page);
				break;

			case 'quotation.detail.page':
				quotationDetailModule.pageInit && quotationDetailModule.pageInit(page);
				break;

			case 'indent.page':
				indentModule.pageInit && indentModule.pageInit(page);
				break;

			case 'indent.new.page':
				indentNewModule.pageInit && indentNewModule.pageInit(page);
				break;

			case 'indent.edit.page':
				indentEditModule.pageInit && indentEditModule.pageInit(page);
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

			case 'quotation.page':
				quotationModule.pageBeforeAnimation && quotationModule.pageBeforeAnimation(page);
				break;

			case 'quotation.detail.page':
				quotationDetailModule.pageBeforeAnimation && quotationDetailModule.pageBeforeAnimation(page);
				break;

			case 'indent.page':
				indentModule.pageBeforeAnimation && indentModule.pageBeforeAnimation(page);
				break;

			case 'indent.new.page':
				indentNewModule.pageBeforeAnimation && indentNewModule.pageBeforeAnimation(page);
				break;

			case 'indent.edit.page':
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

			case 'quotation.page':
				quotationModule.pageAfterAnimation && quotationModule.pageAfterAnimation(page);
				break;

			case 'quotation.detail.page':
				quotationDetailModule.pageAfterAnimation && quotationDetailModule.pageAfterAnimation(page);
				break;

			case 'indent.page':
				indentModule.pageAfterAnimation && indentModule.pageAfterAnimation(page);
				break;

			case 'indent.new.page':
				indentNewModule.pageAfterAnimation && indentNewModule.pageAfterAnimation(page);
				break;

			case 'indent.edit.page':
				indentEditModule.pageAfterAnimation && indentEditModule.pageAfterAnimation(page);
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

			case 'quotation.page':
				quotationModule.pageBack && quotationModule.pageBack(page);
				break;

			case 'quotation.detail.page':
				quotationDetailModule.pageBack && quotationDetailModule.pageBack(page);
				break;

			case 'indent.page':
				indentModule.pageBack && indentModule.pageBack(page);
				break;

			case 'indent.new.page':
				indentNewModule.pageBack && indentNewModule.pageBack(page);
				break;

			case 'indent.edit.page':
				indentEditModule.pageBack && indentEditModule.pageBack(page);
				break;
		}
	},

	pageBeforeRemove: function (page) {
		var name = page.name;

		switch (name) {
			case 'home.page':
				homeModule.pageBeforeRemove && homeModule.pageBeforeRemove(page);
				break;

			case 'setting.page':
				settingModule.pageBeforeRemove && settingModule.pageBeforeRemove(page);
				break;

			case 'about.page':
				aboutModule.pageBeforeRemove && aboutModule.pageBeforeRemove(page);
				break;

			case 'quotation.page':
				quotationModule.pageBeforeRemove && quotationModule.pageBeforeRemove(page);
				break;

			case 'quotation.detail.page':
				quotationDetailModule.pageBeforeRemove && quotationDetailModule.pageBeforeRemove(page);
				break;

			case 'indent.page':
				indentModule.pageBeforeRemove && indentModule.pageBeforeRemove(page);
				break;

			case 'indent.new.page':
				indentNewModule.pageBeforeRemove && indentNewModule.pageBeforeRemove(page);
				break;

			case 'indent.edit.page':
				indentEditModule.pageBeforeRemove && indentEditModule.pageBeforeRemove(page);
				break;
		}
	}
};
