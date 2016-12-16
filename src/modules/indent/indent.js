require('./indent.less');

var appFunc   = require('../utils/appFunc');
var apiServer = require('../api/apiServer');
var template = require('./indent.item.tpl.html');


var indentModule = {
    init: function () {
		appFunc.hideToolbar();

		this.refreshIndents();
    },

	refreshIndents: function() {
    	var self = this;

		apiServer.getIndents(function (data) {
			var renderData = {
				indents: data.result
			};
			var output = appFunc.renderTpl(template, renderData);
			$$('#indent-list').html(output);
		}, 1);
	}
};

module.exports = indentModule;