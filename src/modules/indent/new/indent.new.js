require('./indent.new.less');

var utils = require('../../core/utils');
var api = require('../../core/api');
var indentNewBaseModule = require('./indent.new.detail.js');
var indentNewDetailModule = require('./indent.new.detail.js');
var indentNewBaseTemplate = require('./indent.new.base.tpl.html');
var indentNewDetailTemplate = require('./indent.new.detail.tpl.html');

var indentNewModule = {
    pageBeforeInit: function () {
		this.bindEvents();

		indentNewBaseModule.init();
		indentNewDetailModule.init();

		this.renderNewBaseItemAction();
		this.renderNewDetailItemAction();
    },

	bindEvents: function() {
    	var self = this;

		var bindings = [{
			element: '#indentNewPage',
			selector: '#tabBase',
			event: 'show',
			handler: self.renderNewBaseItemAction
		}, {
			element: '#indentNewPage',
			selector: '#tabDetail',
			event: 'show',
			handler: self.renderNewDetailItemAction
		}];

		utils.bindEvents(bindings);
	},

	renderNewBaseItemAction: function() {
    	log(gRepository)
		var output = utils.renderTpl(indentNewBaseTemplate, {repository: gRepository});
		$$('#tabBase').html(output);
	},

	renderNewDetailItemAction: function(){
		var output = utils.renderTpl(indentNewDetailTemplate, {});
		$$('#tabDetail').html(output);


	}
};

module.exports = indentNewModule;
