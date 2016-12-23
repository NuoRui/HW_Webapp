require('./home.less');

var utils = require('../core/utils');
var indentPageHtml = require('../indent/indent.html');
var quotationPageHtml = require('../quotation/quotation.html');


var homeModule = {
	init: function() {
		this.bindEvent();
	},

    pageInit: function (page) {
        this.bindEvent();
    },

	pageAfterAnimation: function (page) {
		nrApp.showToolbar('.main-toolbar');
	},

	bindEvent: function () {
		var bindings = [{
			element: '#homePage',
			selector: '.indent-selector',
			event: 'click',
			handler: this.indentSelector
		},{
			element: '#homePage',
			selector: '.quotation-selector',
			event: 'click',
			handler: this.quotationSelector
		}];

		utils.bindEvents(bindings);
	},

	indentSelector: function () {
		nrApp.getCurrentView().router.loadContent(indentPageHtml);
	},

	quotationSelector: function () {
		nrApp.getCurrentView().router.loadContent(quotationPageHtml)
	}
};

module.exports = homeModule;