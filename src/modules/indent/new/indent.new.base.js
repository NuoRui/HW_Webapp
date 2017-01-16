var utils = require('../../core/utils');
var api = require('../../core/api');
var indentNewBaseTemplate = require('./indent.new.base.tpl.html');


var indentNewBaseModule = {
    init: function () {
        var output = utils.renderTpl(indentNewBaseTemplate, {repository: gRepository});

        $$('#tabBase').html(output);

        $$('.bill-company').hide();
        $$('#billCompanyNull').show();

		this.bindEvents();
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
    	$$('.bill-company').hide();
		$$('#billCompany' + gRepository.billCompanies[$$('select[name="company"]')[0].selectedIndex - 1].id).show();
	},
	
	getBaseData: function () {
		var data = {
			company_: $$('select[name="company"]')[0].value,
			supplier_: $$('select[name="supplier"]')[0].value,
			employee_: gUser.employee_id,
			trade_: $$('select[name="tradeCompany"]')[0].value,
			billtrade_: $$('select[name="billCompany"]')[0].value,
			billdate: moment().format('YYYY-MM-DD'),
            rebate: $$('select[name="rebate"]')[0].value,
            type: $$('select[name="type"]')[0].value,
			payingway_: $$('select[name="payment"]')[0].value,
			remark: $$('textarea[name="remark"]')[0].value
		};

		return data;
	}
};

module.exports = indentNewBaseModule;