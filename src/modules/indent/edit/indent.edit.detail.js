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
			handler: indentEditDetailModule.addIndentDetailItem
		}]);
	},

	addIndentDetailItem: function() {
		var data = {
			material_: $$('#indentEditDetailItemPopup select[name="detailMaterial"]')[0].value,
			grade: $$('#indentEditDetailItemPopup select[name="detailGrade"]')[0].value,
			quantity: $$('#indentEditDetailItemPopup input[name="detailQuantity"]')[0].value,
			unit_: $$('#indentEditDetailItemPopup select[name="detailUnit"]')[0].value,
			convert: $$('#indentEditDetailItemPopup input[name="detailConvert"]')[0].value,
			kilo: $$('#indentEditDetailItemPopup input[name="detailKilo"]')[0].value,
			price: $$('#indentEditDetailItemPopup input[name="detailPrice"]')[0].value,
			fare_price: $$('#indentEditDetailItemPopup input[name="detailFarePrice"]')[0].value,
			remark: $$('#indentEditDetailItemPopup textarea[name="detailRemark"]')[0].value
		};

    	detailItems.push(data);

		nrApp.closeModal('#indentEditDetailItemPopup');

		$$('#tabDetail').trigger('refresh');
	},



	getDetailItems: function () {
    	log(detailItems)
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
