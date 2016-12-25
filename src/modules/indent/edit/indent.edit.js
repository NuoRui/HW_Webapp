require('./indent.edit.less');

var utils = require('../../core/utils');
var api = require('../../core/api');
var indentEditBaseModule = require('./indent.edit.base.js');
var indentEditDetailModule = require('./indent.edit.detail.js');
var indentEditBaseTemplate = require('./indent.edit.base.tpl.html');
var indentEditDetailTemplate = require('./indent.edit.detail.tpl.html');

var indentEditModule = {
    pageInit: function (page) {
		this.getIndent(page.context.id);

		this.bindEvents();
    },

	pageBack: function () {
		indentEditDetailModule.clearDetailItems();
	},

	bindEvents: function() {
		var self = this;

		var bindings = [{
			element: '#indentEditPage',
			selector: '#tabDetail',
			event: 'refresh',
			handler: self.refreshEditDetailItemAction
		}, {
			element: '#indentEditPage',
			selector: '.indent-update-button',
			event: 'click',
			handler: self.indentUpdateAction
		}];

		utils.bindEvents(bindings);
	},

	refreshBillCompanies: function () {
		$$('.bill-companies').hide();
		var dom = '#billCompanies' + gRepository.billCompanies[$$('select[name="company"]')[0].selectedIndex].id;
		$$(dom).show();
	},


	getIndent: function (id) {
    	var self = this;

        api.getIndent(function (data) {
        	log(data)

			var base = {
				tradeCompanyId: data.trade_,
				supplierId: parseInt(data.supplier_),
				companyId: data.customer_,
				billCompanyId: data.billtrade_,
				paymentId: data.payingway,
				remark: data.remark
			};

        	var detail = data.items;


			self.initRenderEditBaseItem(base);
			self.initRenderEditDetailItem(detail);

			indentEditBaseModule.init();
			indentEditDetailModule.init();
            // var code = data.err_code;
            // if (code === undefined || code === null || isNaN(code)) {
            //     alert('code is null');
            //     return;
            // } else if (code > 0) {
            //     alert('code is error');
            //     return;
            // }
			//
            // var renderData = {
            //     indents: data.data,
            //     rtime: function () {
            //         return appFunc.timeFormat(this.time);
            //     }
            // };
            // var output = appFunc.renderTpl(template, renderData);
            // $$('#commentContent').html(output);
        }, gUser.employee_id, id);
    },

	initRenderEditBaseItem: function(baseSource) {
		var output = utils.renderTpl(indentEditBaseTemplate, {repository: gRepository, source: baseSource});
		$$('#tabBase').html(output);

		this.refreshBillCompanies();
	},

	initRenderEditDetailItem: function(detailSource) {

		var output = utils.renderTpl(indentEditDetailTemplate, {detailItems: detailSource});
		$$('#tabDetail').html(output);
	},

	refreshEditDetailItemAction: function() {

		var output = utils.renderTpl(indentEditDetailTemplate, {detailItems: indentEditDetailModule.getDetailItems()});
		$$('#tabDetail').html(output);
	},

	indentUpdateAction: function () {
		var baseData = indentEditBaseModule.getBaseData();
		var detailItemsData = indentEditDetailModule.getDetailItems();

		// api.saveIndent(function (data) {
		// 	nrApp.alert('订单保存成功', '', function () {
		// 		nrApp.getCurrentView().router.back();
		// 	});
		//
		// }, gUser.employee_id, {data: baseData, items: JSON.stringify(detailItemsData)});
	}
};

module.exports = indentEditModule;