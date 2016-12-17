require('./indent.new.less');

var appFunc   = require('../../utils/appFunc');
var apiServer = require('../../api/apiServer');
var templateNewBase = require('./base/indent.new.base.tpl.html');


var indentNewModule = {
    init: function () {
		this.bindEvents();

		this.renderNewBase();
    },

	bindEvents: function(){
		var bindings = [{
			element: '#tabBase',
			event: 'show',
			handler: indentNewModule.renderNewBase
		}];
		appFunc.bindEvents(bindings);
	},

	renderNewBase: function(){
		nrApp.showIndicator();

		var renderData = {
		};

		var output = appFunc.renderTpl(templateNewBase, renderData);
		$$('#tabBase').html(output);

		nrApp.hideIndicator();
	}
};

module.exports = indentNewModule;