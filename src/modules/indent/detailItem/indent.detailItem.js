var utils = require('../../core/utils');
var api = require('../../core/api');

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

		utils.bindEvents(bindings);
	},

	saveItem: function() {
		nrApp.getCurrentView().router.back();
	}
};

module.exports = detailItemModule;