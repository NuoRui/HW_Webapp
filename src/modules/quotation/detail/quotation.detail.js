require('./quotation.detail.less');

var utils = require('../../core/utils');
var api = require('../../core/api');
var quotationDetailItemTemplate = require('./quotation.detail.item.tpl.html');

var quotationDetailModule = {
    pageInit: function(page) {
    	var self = this;
		utils.bindEvents([{
			element: '#quotationDetailPage',
			selector: '.pull-to-refresh-content',
			event: 'refresh',
			handler: self.refreshQuotationDetail
		}]);
    },

	pageAfterAnimation: function (page) {
		$$('#quotationDetailPage .pull-to-refresh-content').scrollTop(0, 300);

		nrApp.pullToRefreshTrigger('#quotationDetailPage .pull-to-refresh-content');
	},

	refreshQuotationDetail: function(e) {
		api.getQuotationDetail(function (data) {
			if (data.length > 0) {
				var output = utils.renderTpl(quotationDetailItemTemplate, {items: data});
				$$('#quotation-detail-list').html(output);
			}

			nrApp.pullToRefreshDone();
		}, $$(e.target).data('id'));
	}
};

module.exports = quotationDetailModule;
