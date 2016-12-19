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
    	var self = this;

		var bindings = [{
			element: '#homeView',
			selector: '.indent-new-button',
			event: 'click',
			handler: self.indentNewAction
		}];

		utils.bindOnceEvents(bindings);
	},

	refreshIndents: function() {
    	var self = this;
		api.getIndents(function (data) {
			if (data.length > 0) {
				var output = utils.renderTpl(templateItem, {indents:data});
				$$('#indent-list').html(output);
			}

			nrApp.pullToRefreshDone();


			var bindings = [{
				element: '.swipeout',
				event: 'deleted',
				handler: self.removeIndent
			}];

			utils.bindOnceEvents(bindings);
		}, gUser.employee_id);
	},

	removeIndent: function() {

    	log(111)
	},

	indentNewAction: function(e) {
		log(e)
	}
};

module.exports = indentModule;