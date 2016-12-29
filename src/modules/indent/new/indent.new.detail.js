var utils = require('../../core/utils');
var api = require('../../core/api');
var indentNewDetailTemplate = require('./indent.new.detail.tpl.html');
var indentNewDetailItemPopupModule = require('./indent.new.detail.Item.popup.js');


var detailItems = [];

var indentNewDetailModule = {
    init: function () {
        var output = utils.renderTpl(indentNewDetailTemplate, {});
        $$('#tabDetail').html(output);

        this.bindEvents();
    },

    bindEvents: function () {
        var self = this;

        var bindings = [{
            element: '#tabDetail',
            selector: 'a.detail-item-add',
            event: 'click',
            handler: self.popupIndentDetailAction
        }, {
            element: '#tabDetail',
            selector: '#indentDetailItems .swipeout',
            event: 'deleted',
            handler: self.removeIndentDetailAction
        }];

        utils.bindEvents(bindings);
    },

    popupIndentDetailAction: function (e) {
        indentNewDetailItemPopupModule.init(indentNewDetailModule);
    },

    removeIndentDetailAction: function (e) {
        detailItems.splice($$(e.target).data('idx'), 1);

        var counter = 0;
        var items = $$('#indentDetailItems .swipeout');
        items.each(function (idx, item) {
            if (!$$(item).hasClass('deleting')) {
                $$(item).attr('data-idx', counter++);
            }
        });
    },

    getDetailItems: function () {
        return detailItems;
    },

    addDetailItem: function (data) {
        detailItems.push(data);
    },

    clearDetailItems: function () {
        detailItems = [];
    },

    refreshDetailItems: function () {
        var output = utils.renderTpl(indentNewDetailTemplate, {detailItems: detailItems});
        $$('#tabDetail').html(output);
    }
};

module.exports = indentNewDetailModule;
