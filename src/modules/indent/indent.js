require('./indent.less');

var utils = require('../core/utils');
var api = require('../core/api');
var indentItemTemplate = require('./indent.item.tpl.html');
var indentNewPageHtml = require('./new/indent.new.html');
var indentEditPageHtml = require('./edit/indent.edit.html');

var indentModule = {
    pageInit: function () {
    	var self = this;

		nrApp.hideToolbar('.main-toolbar');

		utils.bindEvents([
		// 	{
		// 	element: '#indentPage',
		// 	selector: '#indent-list div.item-content',
		// 	event: 'click',
		// 	handler: self.editIndentAction
		// },
			{
			element: '#indentPage',
			selector: '#indent-list .swipeout',
			event: 'delete',
			handler: self.removeIndentAction
		}, {
			element: '#indentPage',
			selector: '.pull-to-refresh-content',
			event: 'refresh',
			handler: self.refreshIndents
		}]);
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
			}

			nrApp.pullToRefreshDone();
		}, gUser.employee_id);
	},

	editIndentAction: function (e) {
		nrApp.getCurrentView().router.load({
			content: indentEditPageHtml,
			context: {
				id: $$(e.target).parents('li.indent-item').data('id'),
				customcode: $$(e.target).parents('li.indent-item').data('customcode')
			}
		});
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