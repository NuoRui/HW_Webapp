require('./indent.new.detail.item.popup.less');

var utils = require('../../core/utils');
var api = require('../../core/api');
var indentNewDetailItemPopup = require('./indent.new.detail.Item.popup.html');

var indentNewDetailModule;

var indentNewDetailItemPopupModule = {
    init: function (module) {
        indentNewDetailModule = module;

        var popup = utils.renderTpl(indentNewDetailItemPopup, {repository: gRepository});
        nrApp.popup(popup);

        $$('.material-lot').hide();
        $$('#materialLotNull').show();

        this.bindEvents();
    },

    bindEvents: function () {
        var self = this;

        var bindings = [{
            element: '#indentNewDetailItemPopup',
            selector: '.indent-detail-submit-button',
            event: 'click',
            handler: self.addIndentDetailItemAction
        }, {
            element: '#indentNewDetailItemPopup',
            selector: 'select[name="detailMaterial"]',
            event: 'change',
            handler: self.detailMaterialChangeAction
        }, {
            element: '#indentNewDetailItemPopup',
            selector: 'select[name="detailGrade"]',
            event: 'change',
            handler: self.detailGradeChangeAction
        }, {
            element: '#indentNewDetailItemPopup',
            selector: 'select[name="detailUnit"]',
            event: 'change',
            handler: self.detailUnitChangeAction
        }, {
            element: '#indentNewDetailItemPopup',
            selector: 'input[name="detailConvert"]',
            event: 'input propertychange',
            handler: self.detailConvertChangeAction
        }, {
			element: '#indentNewDetailItemPopup',
			selector: 'input[name="detailQuantity"]',
			event: 'input propertychange',
			handler: self.detailQuantityChangeAction
		}, {
			element: '#indentNewDetailItemPopup',
			selector: 'input[name="detailKilo"]',
			event: 'input propertychange',
			handler: self.detailKiloChangeAction
		}, {
			element: '#indentNewDetailItemPopup',
			selector: 'input[name="detailPrice"]',
			event: 'input propertychange',
			handler: self.detailPriceChangeAction
		}, {
			element: '#indentNewDetailItemPopup',
			selector: 'input[name="detailFarePrice"]',
			event: 'input propertychange',
			handler: self.detailFarePriceChangeAction
		}];

        utils.bindEvents(bindings);
    },

    addIndentDetailItemAction: function (e) {
        var lots = $$('#indentNewDetailItemPopup a.material-lot');
        $$.each(lots, function (idx, item) {
            log(item)
        });

        var data = {
            material_: $$('#indentNewDetailItemPopup select[name="detailMaterial"]')[0].value,
            materialName: $$('#indentNewDetailItemPopup select[name="detailMaterial"]')[0].selectedOptions[0].innerText,
            materialLotName: $$('#indentNewDetailItemPopup select[name="detailMaterialLot"]')[0].selectedOptions[0].innerText,
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
        $$('.material-lot').hide();
        $$('#materialLot' + gRepository.materialLots[$$('select[name="detailMaterial"]')[0].selectedIndex - 1].id).show();

        var materialObj = {};
        $$.each(gRepository.materials, function (idx, item) {
            if (item.id == $$('#indentNewDetailItemPopup select[name="detailMaterial"]')[0].value) {
                materialObj = item;
            }
        });

        var unit = $$('#indentNewDetailItemPopup select[name="detailUnit"]')[0].value;
        var convert = 0;

        if (unit == 1) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].value = materialObj.convert;
            convert = materialObj.convert;
        } else if (unit == 2) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].value = materialObj.convert1;
            convert = materialObj.convert1;
        } else if (unit == 3) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].value = materialObj.convert2;
            convert = materialObj.convert2;
        }

        if (isNaN($$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber)) {
            $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = '';
            $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            return;
        }

        $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = $$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber * convert;

        var detailKilo = $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber;
        var detailPrice = $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].valueAsNumber;
        var detailFarePrice = $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].valueAsNumber;

        if (isNaN(detailPrice)) {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailFarePrice * detailKilo);
            }
        } else {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo + detailFarePrice * detailKilo);
            }
        }


    },

    detailGradeChangeAction: function (e) {
        if (e.target.value != 'AA') {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').removeAttr('disabled');
            return;
        }

        $$('#indentNewDetailItemPopup input[name="detailConvert"]').attr('disabled', 'disabled');

        var materialObj = {};
        $$.each(gRepository.materials, function (idx, item) {
            if (item.id == $$('#indentNewDetailItemPopup select[name="detailMaterial"]')[0].value) {
                materialObj = item;
            }
        });

        if (utils.isEmpty(materialObj)) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].value = '';
            return;
        }

        $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].value = materialObj.convert;

        if (isNaN($$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber)) {
            $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = '';
            $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            return;
        }

        $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = $$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber * $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].valueAsNumber;

        var detailKilo = $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber;
        var detailPrice = $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].valueAsNumber;
        var detailFarePrice = $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].valueAsNumber;

        if (isNaN(detailPrice)) {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailFarePrice * detailKilo);
            }
        } else {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo + detailFarePrice * detailKilo);
            }
        }
    },

    detailUnitChangeAction: function (e) {
        var materialObj = {};
        $$.each(gRepository.materials, function (idx, item) {
            if (item.id == $$('#indentNewDetailItemPopup select[name="detailMaterial"]')[0].value) {
                materialObj = item;
            }
        });

        if (utils.isEmpty(materialObj)) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].value = '';
            return;
        }

        var unit = $$('#indentNewDetailItemPopup select[name="detailUnit"]')[0].value;
        var convert = 0;
        if (unit == 1) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').val(materialObj.convert);
            convert = materialObj.convert;
        } else if (unit == 2) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').val(materialObj.convert1);
            convert = materialObj.convert1;
        } else if (unit == 3) {
            $$('#indentNewDetailItemPopup input[name="detailConvert"]').val(materialObj.convert2);
            convert = materialObj.convert2;
        }

        if (isNaN($$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber)) {
            $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = '';
            $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            return;
        }

        $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = $$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber * convert;

        var detailKilo = $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber;
        var detailPrice = $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].valueAsNumber;
        var detailFarePrice = $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].valueAsNumber;

        if (isNaN(detailPrice)) {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailFarePrice * detailKilo);
            }
        } else {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo + detailFarePrice * detailKilo);
            }
        }
    },

    detailConvertChangeAction: function (e) {
        if (isNaN(e.target.valueAsNumber) || isNaN($$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber)) {
            $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = '';
            $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            return;
        }

        if (isNaN($$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber)) {
            $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = '';
            $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            return;
        }

        $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = $$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber * e.target.valueAsNumber;

        var detailKilo = $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber;
        var detailPrice = $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].valueAsNumber;
        var detailFarePrice = $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].valueAsNumber;

        if (isNaN(detailPrice)) {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailFarePrice * detailKilo);
            }
        } else {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo + detailFarePrice * detailKilo);
            }
        }
    },

	detailQuantityChangeAction: function (e) {
        if (isNaN(e.target.valueAsNumber) || isNaN($$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].valueAsNumber)) {
            $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = '';
            $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            return;
        }

        $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].value = e.target.valueAsNumber * $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].valueAsNumber;

        var detailKilo = $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber;
        var detailPrice = $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].valueAsNumber;
        var detailFarePrice = $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].valueAsNumber;

        if (isNaN(detailPrice)) {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailFarePrice * detailKilo);
            }
        } else {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo + detailFarePrice * detailKilo);
            }
        }
	},

	detailKiloChangeAction: function (e) {
        if (isNaN(e.target.valueAsNumber)) {
            $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            return;
        }

        var grade = $$('#indentNewDetailItemPopup select[name="detailGrade"]')[0].value;
        var convert = $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].valueAsNumber;
        var quantity = $$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].valueAsNumber;
        if (grade == 'AA') {
            if (convert > 0) {
                $$('#indentNewDetailItemPopup input[name="detailQuantity"]')[0].value = e.target.valueAsNumber / convert;
            }
        } else {
            if (!isNaN(quantity) && quantity > 0) {
                $$('#indentNewDetailItemPopup input[name="detailConvert"]')[0].value = e.target.valueAsNumber / quantity;
            }
        }


        var detailKilo = e.target.valueAsNumber;
        var detailPrice = $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].valueAsNumber;
        var detailFarePrice = $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].valueAsNumber;

        if (isNaN(detailPrice)) {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailFarePrice * detailKilo);
            }
        } else {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo + detailFarePrice * detailKilo);
            }
        }
	},

	detailPriceChangeAction: function (e) {
        if (isNaN($$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber)) {
            totalPriceDom.html(0);
            return;
        }

        var detailKilo = $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber;
        var detailPrice = $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].valueAsNumber;
        var detailFarePrice = $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].valueAsNumber;

        if (isNaN(detailPrice)) {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailFarePrice * detailKilo);
            }
        } else {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo + detailFarePrice * detailKilo);
            }
        }
	},

	detailFarePriceChangeAction: function (e) {
        if (isNaN($$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber)) {
            totalPriceDom.html(0);
            return;
        }

        var detailKilo = $$('#indentNewDetailItemPopup input[name="detailKilo"]')[0].valueAsNumber;
        var detailPrice = $$('#indentNewDetailItemPopup input[name="detailPrice"]')[0].valueAsNumber;
        var detailFarePrice = $$('#indentNewDetailItemPopup input[name="detailFarePrice"]')[0].valueAsNumber;

        if (isNaN(detailPrice)) {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(0);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailFarePrice * detailKilo);
            }
        } else {
            if (isNaN(detailFarePrice)) {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo);
            } else {
                $$('#indentNewDetailItemPopup span.total-price-value').html(detailPrice * detailKilo + detailFarePrice * detailKilo);
            }
        }
	}
};

module.exports = indentNewDetailItemPopupModule;
