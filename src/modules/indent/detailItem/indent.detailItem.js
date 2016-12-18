var appFunc      = require('../../utils/appFunc');
var apiServer    = require('../../api/apiServer');

var detailItemModule = {
    init: function () {
		this.bindEvents();
    },

	pageAfterAnimation: function () {
		this.refreshIndents();
	},

	bindEvents: function() {

		var bindings = [{
			element: '#indent-detailItem-save',
			event: 'click',
			handler: detailItemModule.saveItem
		}];

		appFunc.bindEvents(bindings);
	},

	saveItem: function() {
		nrApp.getCurrentView().router.back();
	}
};

module.exports = detailItemModule;