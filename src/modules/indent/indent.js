require('./indent.less');

var appFunc      = require('../utils/appFunc');
var apiServer    = require('../api/apiServer');
var templateItem = require('./indent.item.tpl.html');

var indentModule = {
    init: function () {
		appFunc.hideToolbar();

		this.bindEvents();
    },

	pageAfterAnimation: function () {
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
		// appFunc.bindEvents(bindings);
	},

	refreshIndents: function() {
		apiServer.getIndents(function (data) {
			var renderData = {
				indents: data
			};
			var output = appFunc.renderTpl(templateItem, renderData);
			$$('#indent-list').html(output);
		}, gUser.employee_id);
	},

	removeIndent: function() {
		apiServer.getIndents(function (data) {
			var renderData = {
				indents: data.result
			};
			var output = appFunc.renderTpl(templateItem, renderData);
			$$('#indent-list').html(output);
		}, gUser.employee_id);
	}
};

module.exports = indentModule;