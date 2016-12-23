var utils   = require('../../core/utils');
var api = require('../../core/api');
var indentNewDetailItemPopup = require('./indent.new.detail.Item.popup.html');


var detailItems = [];

var indentNewDetailModule = {
    init: function () {
		this.bindEvents();
    },

	bindEvents: function () {
		var bindings = [{
			element: '#tabDetail',
			selector: '#detail-item-add',
			event: 'click',
			handler: indentNewDetailModule.popupIndentDetailItem
		}];

		utils.bindEvents(bindings);
	},

	popupIndentDetailItem: function() {
		var popup = utils.renderTpl(indentNewDetailItemPopup, {repository: gRepository});
		nrApp.popup(popup);

		utils.bindEvents([{
			element: '.indent-detail-submit-button',
			event: 'click',
			handler: indentNewDetailModule.addIndentDetailItem
		}]);
	},

	addIndentDetailItem: function() {
    	detailItems.push({
			customcode: '111',
			supplier_name: 'zzzz',
			total_amount: 1234
		});

		nrApp.closeModal('#indentNewDetailItemPopup');

		$$('#tabDetail').trigger('show');
	},

	getDetailItems: function () {
		return detailItems;
	},

	clearDetailItems: function () {
		detailItems = [];
	}
};

module.exports = indentNewDetailModule;
