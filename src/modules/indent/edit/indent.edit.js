require('./indent.edit.less');

var utils = require('../../core/utils');
var api = require('../../core/api');
var indentEditBaseModule = require('./indent.edit.base.js');
var indentEditDetailModule = require('./indent.edit.detail.js');
var indentEditBaseTemplate = require('./indent.edit.base.tpl.html');
var indentEditDetailTemplate = require('./indent.edit.detail.tpl.html');

var indentEditModule = {
    pageInit: function (page) {
		this.getIndent(page.context.id);

		// this.bindEvents();
    },

    getIndent: function (id) {
    	var self = this;

        api.getIndent(function (data) {
        	log(data)

			var src = {
				tradeCompanyId: data.trade_,
				supplierId: parseInt(data.supplier_)
			};

			self.initRenderEditBaseItem(src);
			self.initRenderEditDetailItem();

			// indentNewBaseModule.init();
			// indentNewDetailModule.init();
            // var code = data.err_code;
            // if (code === undefined || code === null || isNaN(code)) {
            //     alert('code is null');
            //     return;
            // } else if (code > 0) {
            //     alert('code is error');
            //     return;
            // }
			//
            // var renderData = {
            //     indents: data.data,
            //     rtime: function () {
            //         return appFunc.timeFormat(this.time);
            //     }
            // };
            // var output = appFunc.renderTpl(template, renderData);
            // $$('#commentContent').html(output);
        }, gUser.employee_id, id);
    },

	initRenderEditBaseItem: function(baseSource) {
    	log(gRepository)
    	log(baseSource)
		var output = utils.renderTpl(indentEditBaseTemplate, {repository: gRepository, source: baseSource});
		$$('#tabBase').html(output);
	},

	initRenderEditDetailItem: function() {
		var output = utils.renderTpl(indentEditDetailTemplate, {});
		$$('#tabDetail').html(output);
	},
};

module.exports = indentEditModule;