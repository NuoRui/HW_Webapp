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

		this.initRenderNewBaseItem();
		this.initRenderNewDetailItem();

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

	initRenderNewBaseItem: function() {
		var output = utils.renderTpl(indentNewBaseTemplate, {repository: gRepository});
		$$('#tabBase').html(output);
	},

	initRenderNewDetailItem: function() {
		var output = utils.renderTpl(indentNewDetailTemplate, {});
		$$('#tabDetail').html(output);
	},

	refreshNewDetailItemAction: function() {
		var output = utils.renderTpl(indentNewDetailTemplate, {detailItems: indentNewDetailModule.getDetailItems()});
		$$('#tabDetail').html(output);


	},

	indentSaveAction: function () {
		var baseData = indentNewBaseModule.getBaseData();
		var detailItemsData = indentNewDetailModule.getDetailItems();
		log(baseData)
		log(detailItemsData)

		api.saveIndent(function (data) {
			log(data)

		}, gUser.employee_id, {data: baseData, items: detailItemsData});
	}
};

module.exports = indentNewModule;
