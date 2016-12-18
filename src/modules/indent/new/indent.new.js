require('./indent.new.less');

var appFunc   = require('../../utils/appFunc');
var apiServer = require('../../api/apiServer');
var indentNewDetailModule = require('./detail/indent.new.detail.js');
var templateNewBase = require('./base/indent.new.base.tpl.html');
var templateNewDetail = require('./detail/indent.new.detail.tpl.html');

var indentNewModule = {
    init: function () {
		this.bindEvents();

		this.renderNewBase();
    },

	pageAfterAnimation: function (page) {
    	log('------')
    	log(page)
	},

	bindEvents: function(){
		var bindings = [{
			element: '#tabBase',
			event: 'show',
			handler: indentNewModule.renderNewBase
		},{
			element: '#tabDetail',
			event: 'show',
			handler: indentNewModule.renderNewDetail
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


	},

	renderNewDetail: function(){
		nrApp.showIndicator();

		var renderData = {
		};

		var output = appFunc.renderTpl(templateNewDetail, renderData);
		$$('#tabDetail').html(output);

		nrApp.hideIndicator();

		indentNewDetailModule.init();
	}
};

module.exports = indentNewModule;