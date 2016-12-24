var utils   = require('../../core/utils');
var api = require('../../core/api');
var indentEditDetailItemPopup = require('./indent.edit.detail.Item.popup.html');


var detailItems = [];

var indentEditDetailModule = {
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
		var popup = utils.renderTpl(indentEditDetailItemPopup, {repository: gRepository});
		nrApp.popup(popup);

		utils.bindEvents([{
			element: '.indent-detail-submit-button',
			event: 'click',
			handler: indentNewDetailModule.addIndentDetailItem
		}]);
	},

	addIndentDetailItem: function() {
		var data = {
			material_: $$('#indentNewDetailItemPopup select[name="detailMaterial"]')[0].value,
			grade: $$('#indentNewDetailItemPopup select[name="detailGrade"]')[0].value,
			quantity: $$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].value,
			unit_: $$('#indentNewDetailItemPopup select[name="detailUnit"]')[0].value,
			convert: $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].value,
			kilo: $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value,
			price: $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].value,
			fare_price: $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].value,
			remark: $$('#indentNewDetailItemPopup textarea[name="detailRemark"]')[0].value
		};

    	detailItems.push(data);

		nrApp.closeModal('#indentNewDetailItemPopup');

		$$('#tabDetail').trigger('refresh');
	},



	getDetailItems: function () {
		return detailItems;
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

module.exports = indentEditDetailModule;
