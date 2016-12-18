require('./indent.edit.less');

var appFunc   = require('../../utils/appFunc');
var api = require('../../api/api');


var indentEditModule = {
    init: function () {
        this.getIndents();
    },

    getIndents: function () {
        api.getIndents(function (data) {
            var code = data.err_code;
            if (code === undefined || code === null || isNaN(code)) {
                alert('code is null');
                return;
            } else if (code > 0) {
                alert('code is error');
                return;
            }

            var renderData = {
                indents: data.data,
                rtime: function () {
                    return appFunc.timeFormat(this.time);
                }
            };
            var output = appFunc.renderTpl(template, renderData);
            $$('#commentContent').html(output);
        }, 1);
    }
};

module.exports = indentEditModule;