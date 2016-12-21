var utils   = require('../../../core/utils');
var api = require('../../../core/api');
var detailItemContent = require('../../detailItem/indent.detailItem.html');


var indentNewDetailModule = {
    init: function () {
		this.bindEvents();
    },

	bindEvents: function () {
		var bindings = [{
			element: '#tabDetail',
			selector: '#detail-item-add',
			event: 'click',
			handler: indentNewDetailModule.addItem
		}];
		utils.bindEvents(bindings);


	},

	addItem: function() {
    	nrApp.getCurrentView().router.loadContent(detailItemContent);
	}
};

module.exports = indentNewDetailModule;
