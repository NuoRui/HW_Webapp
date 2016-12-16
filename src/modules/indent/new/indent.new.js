require('./indent.new.less');

var appFunc   = require('../../utils/appFunc');
var apiServer = require('../../api/apiServer');


var indentNewModule = {
    init: function () {

    },

	bindEvents: function(){
    	var self = this;
		var bindings = [{
			element: '#tabBase',
			event: 'show',
			handler: self.renderNewBase
		}];
		appFunc.bindEvents(bindings);
	},

	renderNewBase: function(){
		if($$('#settingView .page-content')[0]) return;

		hiApp.showIndicator();

		var renderData = {
			avatarUrl: 'http://lorempixel.com/68/68/people/7/',
			nickName: 'HiApp',
			points: '100'
		};

		var output = appFunc.renderTpl(template, renderData);
		$$('#settingView .page[data-page="setting"]').html(output);

		hiApp.hideIndicator();
	}
};

module.exports = indentNewModule;