require('./quotation.less');

var utils = require('../core/utils');
var api = require('../core/api');
var quotationSupplyTemplate = require('./quotation.supply.tpl.html');
var quotationDetailPageHtml = require('./detail/quotation.detail.html');

var quotationModule = {
    pageInit: function() {
		nrApp.hideToolbar('.main-toolbar');

		this.renderSuppliers();
    },

	renderSuppliers: function() {
        api.getSuppliers(function(data) {
            var output = utils.renderTpl(quotationSupplyTemplate, {suppliers: data});
            $$('#quotation-list').html(output);

			utils.bindEvents([{
				element: '#quotation-list',
				selector: '.supply-button',
				event: 'click',
				handler: quotationModule.quotationDetailAction
			}]);
        });
    },

	quotationDetailAction: function (e) {
		nrApp.getCurrentView().router.load({
			content: quotationDetailPageHtml,
			context: {
				name: $$(e.target).data('name'),
				id: $$(e.target).data('id')
			}
		});
	}
};

module.exports = quotationModule;
