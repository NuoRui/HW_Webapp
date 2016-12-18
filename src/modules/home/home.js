require('./home.less');

var appFunc = require('../utils/appFunc');
var indentPageHtml = require('../indent/indent.html');


var homeModule = {
	init: function() {
		this.bindEvent();
	},

    pageInit: function (page) {
        this.bindEvent();
    },

	pageAfterAnimation: function (page) {
		nrApp.showToolbar('.toolbar');
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

		appFunc.bindEvents(bindings);
	},

	indentSelector: function () {
		nrApp.getCurrentView().router.loadContent(indentPageHtml);
	},

	quotationSelector: function () {
		var self = this;

		nrApp.getCurrentView().router.loadPage('page/indent.html')
	}
};

module.exports = homeModule;