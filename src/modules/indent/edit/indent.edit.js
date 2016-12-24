require('./indent.edit.less');

var utils   = require('../../core/utils');
var api = require('../../core/api');


var indentEditModule = {
    pageInit: function (page) {
		this.getIndent(page.context.id);

		this.bindEvents();

		this.initRenderNewBaseItem();
		this.initRenderNewDetailItem();

		indentNewBaseModule.init();
		indentNewDetailModule.init();
    },

    getIndent: function (id) {
        api.getIndent(function (data) {
        	log(data)
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
    }
};

module.exports = indentEditModule;