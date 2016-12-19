require('./indent.less');

var utils = require('../core/utils');
var api = require('../core/api');
var templateItem = require('./indent.item.tpl.html');

var indentModule = {
    pageInit: function () {
		nrApp.hideToolbar('.toolbar');

		this.bindEvents();
    },

	pageAfterAnimation: function () {
		$$('#indentPage .pull-to-refresh-content').scrollTop(0,300);

		nrApp.pullToRefreshTrigger('#indentPage .pull-to-refresh-content');
		this.refreshIndents();
	},

	bindEvents: function() {
		// var bindings = [{
		// 	element: '#loginButton',
		// 	selector: '.login-page',
		// 	event: 'click',
		// 	handler: loginModule.loginAction
		// }];
		//
		// utils.bindEvents(bindings);
	},

	refreshIndents: function() {
		api.getIndents(function (data) {
			if (data.length > 0) {
				var output = utils.renderTpl(templateItem, {indents:data});
				$$('#indent-list').html(output);
			}

			nrApp.pullToRefreshDone();
		}, gUser.employee_id);
	},

	removeIndent: function() {
		api.getIndents(function (data) {
			var renderData = {
				indents: data.result
			};
			var output = utils.renderTpl(templateItem, renderData);
			$$('#indent-list').html(output);
		}, gUser.employee_id);
	}
};

module.exports = indentModule;