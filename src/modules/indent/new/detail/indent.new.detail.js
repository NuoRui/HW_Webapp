var appFunc   = require('../../../utils/appFunc');
var api = require('../../../api/api');
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
		appFunc.bindEvents(bindings);


	},

	addItem: function() {
    	nrApp.getCurrentView().router.loadContent(detailItemContent);
	}
};

module.exports = indentNewDetailModule;
