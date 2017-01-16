require('./indent.new.less');

var utils = require('../../core/utils');
var api = require('../../core/api');
var indentNewBaseModule = require('./indent.new.base.js');
var indentNewDetailModule = require('./indent.new.detail.js');
// var indentNewBaseTemplate = require('./indent.new.base.tpl.html');
// var indentNewDetailTemplate = require('./indent.new.detail.tpl.html');

var indentNewModule = {
    pageBeforeInit: function () {
		this.bindEvents();

		// this.initRenderNewBaseItem();
		// this.initRenderNewDetailItem();

		indentNewBaseModule.init();
		indentNewDetailModule.init();
    },

	pageBack: function () {
		indentNewDetailModule.clearDetailItems();
	},

	bindEvents: function() {
    	var self = this;

		var bindings = [{
			element: '#indentNewPage',
			selector: '#tabDetail',
			event: 'refresh',
			handler: self.refreshNewDetailItemAction
		}, {
			element: '#indentNewPage',
			selector: '.indent-save-button',
			event: 'click',
			handler: self.indentSaveAction
		}];

		utils.bindEvents(bindings);
	},

	// initRenderNewBaseItem: function() {
	// 	var output = utils.renderTpl(indentNewBaseTemplate, {repository: gRepository});
	// 	$$('#tabBase').html(output);
    //
     //    $$('.bill-companies').hide();
     //    $$('#billCompanies0').show();
	// },
    //
	// initRenderNewDetailItem: function() {
	// 	var output = utils.renderTpl(indentNewDetailTemplate, {});
	// 	$$('#tabDetail').html(output);
	// },

	refreshNewDetailItemAction: function() {
        indentNewDetailModule.refreshDetailItems();
	},

	indentSaveAction: function () {
		var baseData = indentNewBaseModule.getBaseData();
		var detailItemsData = indentNewDetailModule.getDetailItems();
        var saveItemsData = detailItemsData.map(function (data) {
			return {
				material_: data.materialId,
				grade: data.gradeId,
				quantity: data.quantity,
				unit_: data.unitId,
				convert: data.convert,
				kilo: data.kilo,
                in_price: data.inPrice,
				price: data.price,
				fare_price: data.farePrice,
				remark: data.remark
			}
        });

		api.saveIndent(function (data) {
			nrApp.alert('订单保存成功', '', function () {
				nrApp.getCurrentView().router.back();
			});

		}, gUser.employee_id, {data: baseData, items: JSON.stringify(saveItemsData)});
	}
};

module.exports = indentNewModule;
