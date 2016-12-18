require('./home.less');

var appFunc = require('../utils/appFunc');


var homeModule = {
    pageInit: function (page) {
        this.bindEvent();
    },

	bindEvent: function () {
		var bindings = [{
			element: '#homePage',
			selector: '.indent-selector',
			event: 'click',
			handler: this.indentSelector
		}];

		appFunc.bindEvents(bindings);
	},

	indentSelector: function () {
        var self = this;

        nrApp.getCurrentView().router.loadPage('page/indent.html')
    }
};

module.exports = homeModule;