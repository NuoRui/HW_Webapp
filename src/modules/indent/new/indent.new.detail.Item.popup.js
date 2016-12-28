var utils = require('../../core/utils');
var api = require('../../core/api');
var indentNewDetailItemPopup = require('./indent.new.detail.Item.popup.html');

var indentNewDetailModule;

var indentNewDetailItemPopupModule = {
    init: function (module) {
        indentNewDetailModule = module;

        var popup = utils.renderTpl(indentNewDetailItemPopup, {repository: gRepository});
        nrApp.popup(popup);

        this.bindEvents();
    },

    bindEvents: function () {
        var self = this;

        var bindings = [{
            element: '#indentNewDetailItemPopup',
            selector: '.indent-detail-submit-button',
            event: 'click',
            handler: self.addIndentDetailItem
        }, {
            element: '#indentNewDetailItemPopup',
            selector: 'select[name="detailMaterial"]',
            event: 'change',
            handler: self.detailMaterialChangeAction
        }, {
            element: '#indentNewDetailItemPopup',
            selector: 'select[name="detailUnit"]',
            event: 'change',
            handler: self.detailUnitChangeAction
        }, {
			element: '#indentNewDetailItemPopup',
			selector: 'input[name="detailQuantity"]',
			event: 'input propertychange',
			handler: self.detailQuantityChangeAction
		}, {
			element: '#indentNewDetailItemPopup',
			selector: 'input[name="detailConvert"]',
			event: 'change',
			handler: self.detailConvertChangeAction
		}, {
			element: '#indentNewDetailItemPopup',
			selector: 'input[name="detailKilo"]',
			event: 'change',
			handler: self.detailKiloChangeAction
		}, {
			element: '#indentNewDetailItemPopup',
			selector: 'input[name="detailPrice"]',
			event: 'change',
			handler: self.detailPriceChangeAction
		}, {
			element: '#indentNewDetailItemPopup',
			selector: 'input[name="detailFarePrice"]',
			event: 'change',
			handler: self.detailFarePriceChangeAction
		}];

        utils.bindEvents(bindings);
    },

    addIndentDetailItem: function () {
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

        indentNewDetailModule.addDetailItem(data);

        nrApp.closeModal('#indentNewDetailItemPopup');

        $$('#tabDetail').trigger('refresh');
    },

    detailMaterialChangeAction: function (e) {
        var materialObj = {};
        gRepository.materials.forEach(function (item, idx) {
            if (item.id == $$('#indentNewDetailItemPopup select[name="detailMaterial"]')[0].value) {
                materialObj = item;
            }
        });

        var unit = $$('#indentNewDetailItemPopup select[name="detailUnit"]')[0].value;
        if (unit == 1) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').val(materialObj.convert);
        } else if (unit == 2) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').val(materialObj.convert1);
        } else if (unit == 3) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').val(materialObj.convert2);
        }
    },

    detailUnitChangeAction: function (e) {
        var materialObj = {};
        gRepository.materials.forEach(function (item, idx) {
            if (item.id == $$('#indentNewDetailItemPopup select[name="detailMaterial"]')[0].value) {
                materialObj = item;
            }
        });

        if (utils.isEmpty(materialObj)) {
            return;
        }

        var unit = $$('#indentNewDetailItemPopup select[name="detailUnit"]')[0].value;
        if (unit == 1) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').val(materialObj.convert);
        } else if (unit == 2) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').val(materialObj.convert1);
        } else if (unit == 3) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').val(materialObj.convert2);
        }
    },

	detailQuantityChangeAction: function (e) {
    	log(111)
    	var totalPriceDom = $$('#indentNewDetailItemPopup input[name="totalPrice"]');
    	if (isNaN(e.target.valueAsNumber)) {
    		nrApp.alert('数量需输入数字');
			e.target.value = NaN;
		}

		var detailConvert = $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].valueAsNumber;

		if (isNaN(detailConvert)) {
			totalPriceDom.value = 0;
			return;
		}

		$$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = e.target.valueAsNumber * detailConvert;

		var detailKilo = $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber;
		if (isNaN(detailKilo)) {
			totalPriceDom.value = 0;
			return;
		}

		var detailPrice = $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].valueAsNumber;
		var detailFarePrice = $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].valueAsNumber;

		if (isNaN(detailPrice)) {
			if (isNaN(detailFarePrice)) {
				totalPriceDom.value = 0;
			} else {
				totalPriceDom.value = detailFarePrice * detailKilo;
			}
		} else {
			if (isNaN(detailFarePrice)) {
				totalPriceDom.value = detailPrice * detailKilo;
			} else {
				totalPriceDom.value = detailPrice * detailKilo + detailFarePrice * detailKilo;
			}
		}
	},

	detailConvertChangeAction: function (e) {
		
	},

	detailKiloChangeAction: function (e) {
		
	},

	detailPriceChangeAction: function (e) {
		
	},

	detailFarePriceChangeAction: function (e) {
		
	}
};

module.exports = indentNewDetailItemPopupModule;
