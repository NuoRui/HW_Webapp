var utils = require('../../core/utils');
var api = require('../../core/api');
var indentNewDetailItemPopupModule = require('./indent.new.detail.Item.popup.js');


var detailItems = [];

var indentNewDetailModule = {
    init: function () {
		this.bindEvents();
    },

	bindEvents: function () {
    	var self = this;

		var bindings = [{
			element: '#tabDetail',
			selector: '#detail-item-add',
			event: 'click',
			handler: self.popupIndentDetailItem
		}, {
			element: '#tabDetail',
			selector: '#indentDetailItems .swipeout',
			event: 'deleted',
			handler: self.removeDetailItemAction
		}];

		utils.bindEvents(bindings);
	},

	popupIndentDetailItem: function() {
        indentNewDetailItemPopupModule.init(indentNewDetailModule);
	},

	getDetailItems: function () {
		return detailItems;
	},
	
	addDetailItem: function (data) {
        detailItems.push(data);
    },

	removeDetailItemAction: function (e) {
		detailItems.splice($$(e.target).data('id'), 1);

		var items = $$('#indentDetailItems .swipeout');
		var counter = 0;
		items.each(function (idx, item) {
			if (!$$(item).hasClass('deleting')) {
				$$(item).attr('data-id', counter++);
			}
		})
	},

	clearDetailItems: function () {
		detailItems = [];
	}
};

module.exports = indentNewDetailModule;
