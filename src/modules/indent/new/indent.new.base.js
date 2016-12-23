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
	},
	
	getBaseData: function () {
		var data = {
			company_: $$('select[name="company"]')[0].value,
			supplier_: $$('select[name="supplier"]')[0].value,
			employee_: gUser.employee_id,
			trade_: $$('select[name="tradeCompany"]')[0].value,
			billtrade_: $$('select[name="billCompany"]')[0].value,
			billdate: Date.now(),
			payingway_: $$('select[name="payment"]')[0].value,
			remark: $$('textarea[name="desc"]')[0].value
		};

		return data;
	}
};

module.exports = indentNewBaseModule;