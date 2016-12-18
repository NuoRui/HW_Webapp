require('./quotation.detail.less');

var appFunc = require('../../utils/appFunc'),
    apiServer = require('../../api/apiServer'),
    template = require('./quotation.detail.tpl.html');

var quotationDetailModule = {
    init: function(query) {
        appFunc.hideToolbar();

        this.getQuotation(query);

        //this.bindEvents();
    },

    getQuotation: function(query) {
        apiServer.getQuotation(function(data) {
            var renderData = {
                suppliers: data,
            };
            var output = appFunc.renderTpl(template, renderData);
            $$('#quotation-list').html(output);
        }, query.id);
    },

    bindEvents: function() {
        var bindings = [{
            element: '#quotationButton',
            selector: '.quotation-page',
            event: 'click',
            handler: quotationDetailModule.quotationAction
        }];

        appFunc.bindEvents(bindings);
    },

    quotationAction: function() {

    }
}

module.exports = quotationDetailModule;
