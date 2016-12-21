require('./quotation.detail.less');

var utils = require('../../core/utils');
var api = require('../../core/api');
var quotationDetailItemTemplate = require('./quotation.detail.item.tpl.html');

var quotationDetailModule = {
    pageInit: function(page) {
    },

	pageAfterAnimation: function (page) {
		$$('#quotationDetailPage .pull-to-refresh-content').scrollTop(0, 300);

		nrApp.pullToRefreshTrigger('#quotationDetailPage .pull-to-refresh-content');
		this.refreshQuotationDetail(page);
	},

	refreshQuotationDetail: function(page) {
		api.getQuotationDetail(function (data) {
			log(data)
			if (data.length > 0) {
				var output = utils.renderTpl(quotationDetailItemTemplate, {items: data});
				$$('#quotation-detail-list').html(output);
			}

			nrApp.pullToRefreshDone();
		}, page.context.id);
	}
};

module.exports = quotationDetailModule;
