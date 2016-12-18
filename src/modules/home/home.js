require('./home.less');

var appFunc = require('../utils/appFunc');


var homeModule = {
	init: function() {
		this.bindEvent();
	},

    pageInit: function (page) {
        this.bindEvent();
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
		var self = this;

		nrApp.getCurrentView().router.loadPage('page/indent.html')
	},

	quotationSelector: function () {
		var self = this;

		nrApp.getCurrentView().router.loadPage('page/indent.html')
	}
};

module.exports = homeModule;