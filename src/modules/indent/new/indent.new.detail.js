var utils   = require('../../core/utils');
var api = require('../../core/api');
var indentNewDetailItemPopup = require('./indent.new.detail.Item.popup.html');


var indentNewDetailModule = {
    init: function () {
		this.bindEvents();
    },

	bindEvents: function () {
		var bindings = [{
			element: '#tabDetail',
			selector: '#detail-item-add',
			event: 'click',
			handler: indentNewDetailModule.addDetailItem
		}];

		utils.bindEvents(bindings);
	},

	addDetailItem: function() {
		var popup = utils.renderTpl(indentNewDetailItemPopup, {repository: gRepository});
		nrApp.popup(popup);
	}
};

module.exports = indentNewDetailModule;
