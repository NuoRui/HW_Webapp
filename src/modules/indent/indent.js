require('./indent.less');

var appFunc      = require('../utils/appFunc');
var api    = require('../api/api');
var templateItem = require('./indent.item.tpl.html');

var indentModule = {
    pageInit: function () {
		nrApp.hideToolbar('.toolbar');

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
		api.getIndents(function (data) {
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