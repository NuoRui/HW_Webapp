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
    }
};

module.exports = indentNewDetailItemPopupModule;
