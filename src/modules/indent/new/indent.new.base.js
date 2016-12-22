var utils = require('../../core/utils');
var api = require('../../core/api');


var indentNewBaseModule = {
    init: function () {
		this.bindEvents();
		this.refreshBillCompanies();
    },

	bindEvents: function() {
    	var self = this;

		var bindings = [{
			element: '#tabBase',
			selector: 'select[name="company"]',
			event: 'change',
			handler: self.refreshBillCompanies
		}];

		utils.bindEvents(bindings);
	},

	refreshBillCompanies: function () {
    	$$('.bill-companies').hide();
    	var dom = '#billCompanies' + gRepository.billCompanies[$$('select[name="company"]')[0].selectedIndex].id;
		$$(dom).show();
	}
};

module.exports = indentNewBaseModule;