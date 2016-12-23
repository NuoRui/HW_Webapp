require('./indent.new.less');

var utils = require('../../core/utils');
var api = require('../../core/api');
var indentNewBaseModule = require('./indent.new.base.js');
var indentNewDetailModule = require('./indent.new.detail.js');
var indentNewBaseTemplate = require('./indent.new.base.tpl.html');
var indentNewDetailTemplate = require('./indent.new.detail.tpl.html');

var indentNewModule = {
    pageBeforeInit: function () {
		this.bindEvents();

		this.renderNewBaseItemAction();
		this.renderNewDetailItemAction();

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
			selector: '#tabBase',
			event: 'show',
			handler: self.renderNewBaseItemAction
		}, {
			element: '#indentNewPage',
			selector: '#tabDetail',
			event: 'show',
			handler: self.renderNewDetailItemAction
		}, {
			element: '#indentNewPage',
			selector: '.indent-save-button',
			event: 'click',
			handler: self.indentSaveAction
		}];

		utils.bindEvents(bindings);
	},

	renderNewBaseItemAction: function() {
		var output = utils.renderTpl(indentNewBaseTemplate, {repository: gRepository});
		$$('#tabBase').html(output);
	},

	renderNewDetailItemAction: function() {
		var detailItems = indentNewDetailModule.getDetailItems();
		var output = utils.renderTpl(indentNewDetailTemplate, {detailItems: detailItems});
		$$('#tabDetail').html(output);
	},

	indentSaveAction: function () {
		// var data = {};
		//
		// data[company_] = dataBase.company;
		// data[supplier_] = dataBase.supplier;
		// data[employee_] = employeeId;
		// data[trade_] = dataBase.trade;
		// data[billtrade_] = dataBase.billtrade;
		// data[payingway_] = dataBase.payingway;
		// data[remark] = dataBase.remark;
		// data[billdate] = Date.now();
	}
};

module.exports = indentNewModule;
