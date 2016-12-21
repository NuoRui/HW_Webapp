require('./indent.new.less');

var utils = require('../../core/utils');
var api = require('../../core/api');
var indentNewDetailModule = require('./detail/indent.new.detail.js');
var indentNewBaseTemplate = require('./base/indent.new.base.tpl.html');
var indentNewDetailTemplate = require('./detail/indent.new.detail.tpl.html');

var indentNewModule = {
    pageInit: function () {
		this.bindEvents();


		this.renderNewBaseItemAction();
    },

	bindEvents: function() {
    	var self = this;

		var bindings = [{
			element: '#indentNewPage',
			selector: '#tabBase',
			event: 'show',
			handler: self.renderNewBaseItemAction
		},{
			element: '#indentNewPage',
			selector: '#tabDetail',
			event: 'show',
			handler: self.renderNewDetailItemAction
		}];

		utils.bindEvents(bindings);
	},

	renderNewBaseItemAction: function() {
		var output = utils.renderTpl(indentNewBaseTemplate, {repository: gRepository});
		$$('#tabBase').html(output);
	},

	renderNewDetailItemAction: function(){
		var output = utils.renderTpl(indentNewDetailTemplate, {});
		$$('#tabDetail').html(output);


		indentNewDetailModule.init();

		log($$('select[name="archer"]'))
	}
};

module.exports = indentNewModule;
