require('./indent.less');

var utils = require('../core/utils');
var api = require('../core/api');
var indentItemTemplate = require('./indent.item.tpl.html');
var indentNewPageHtml = require('./new/indent.new.html');

var indentModule = {
    pageInit: function () {
		nrApp.hideToolbar('.main-toolbar');
    },

	pageAfterAnimation: function () {
		this.unbindEvents();
		this.bindEvents();

		$$('#indentPage .pull-to-refresh-content').scrollTop(0, 300);

		nrApp.pullToRefreshTrigger('#indentPage .pull-to-refresh-content');
		this.refreshIndents();
	},

	bindEvents: function() {
    	var self = this;

		utils.bindEvents([{
			element: '#homeView',
			selector: '.indent-new-button',
			event: 'click',
			handler: self.newIndentAction
		}, {
			element: '#indentPage',
			selector: '.pull-to-refresh-content',
			event: 'refresh',
			handler: self.refreshIndents
		}]);
	},

	unbindEvents: function() {
		var self = this;

		utils.unbindEvents([{
			element: '#homeView',
			selector: '.indent-new-button',
			event: 'click',
			handler: self.newIndentAction
		}]);
	},

	refreshIndents: function() {
		api.getIndents(function (data) {
			if (data.length > 0) {
				var output = utils.renderTpl(indentItemTemplate, {indents: data});
				$$('#indent-list').html(output);

				var bindings = [{
					element: '#indentPage',
					selector: '#indent-list .indent-item',
					event: 'click',
					handler: indentModule.editIndentAction
				}, {
					element: '#indentPage',
					selector: '#indent-list .swipeout',
					event: 'delete',
					handler: indentModule.removeIndentAction
				}];

				utils.bindEvents(bindings);
			}

			nrApp.pullToRefreshDone();
		}, gUser.employee_id);
	},

	editIndentAction: function () {

	},

	removeIndentAction: function() {
		api.removeIndent(function (data) {
		}, gUser.employee_id, $$(this).data('id'));
	},

	newIndentAction: function() {
		nrApp.getCurrentView().router.loadContent(indentNewPageHtml);
	}
};

module.exports = indentModule;