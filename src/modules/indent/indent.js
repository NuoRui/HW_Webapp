require('./indent.less');

var utils = require('../core/utils');
var api = require('../core/api');
var indentItemTemplate = require('./indent.item.tpl.html');
var indentNewPageHtml = require('./new/indent.new.html');

var indentModule = {
    pageInit: function () {
		nrApp.hideToolbar('.toolbar');
    },

	pageAfterAnimation: function () {
		this.unbindEvents();
		this.bindEvents();

		$$('#indentPage .pull-to-refresh-content').scrollTop(0,300);

		nrApp.pullToRefreshTrigger('#indentPage .pull-to-refresh-content');
		this.refreshIndents();
	},

	bindEvents: function() {
    	var self = this;

		utils.bindEvents([{
			element: '#homeView',
			selector: '.indent-new-button',
			event: 'click',
			handler: self.indentNewAction
		}]);
	},

	unbindEvents: function() {
		var self = this;

		utils.unbindEvents([{
			element: '#homeView',
			selector: '.indent-new-button',
			event: 'click',
			handler: self.indentNewAction
		}]);
	},

	refreshIndents: function() {
    	var self = this;
		api.getIndents(function (data) {
			if (data.length > 0) {
				var output = utils.renderTpl(indentItemTemplate, {indents: data});
				$$('#indent-list').html(output);

				var bindings = [{
					element: '.swipeout',
					event: 'delete',
					handler: self.removeIndent
				}];

				utils.bindOnceEvents(bindings);
			}

			nrApp.pullToRefreshDone();
		}, gUser.employee_id);
	},

	removeIndent: function() {
		api.removeIndent(function (data) {

		}, gUser.employee_id, $$(this).data('id'));
	},

	indentNewAction: function() {
		nrApp.getCurrentView().router.loadContent(indentNewPageHtml);
	}
};

module.exports = indentModule;