require('./quotation.less');

var appFunc = require('../utils/appFunc'),
    apiServer = require('../api/apiServer'),
    template = require('./quotation.tpl.html');

var quotationModule = {
    init: function() {
        appFunc.hideToolbar();

        this.bindEvents();

        quotationModule.getSuppliers();
    },

    getSuppliers: function() {
        apiServer.getSuppliers(function(data) {
            var renderData = {
                suppliers: data,
            };
            var output = appFunc.renderTpl(template, renderData);
            $$('#quotation-list').html(output);
        });
    },

    bindEvents: function() {
        var bindings = [{
            element: '#quotation-page',
            event: 'show',
            handler: quotationModule.getSuppliers
        }];

        appFunc.bindEvents(bindings);
    },

    quotationAction: function() {
        var usernameValue = $$(this).find('.username').val(),
            passwordValue = $$(this).find('.password').val();

        if (usernameValue == '') {
            nrApp.alert('用户名不能为空');
            return false;
        }

        if (passwordValue == '') {
            nrApp.alert('密码不能为空');
            return false;
        }

    }
}

module.exports = quotationModule;
