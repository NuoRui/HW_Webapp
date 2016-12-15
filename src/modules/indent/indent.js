
require('./indent.less');

var appFunc   = require('../utils/appFunc');
var apiServer = require('../api/apiServer');
var template = require('./comment.tpl.html');
var popupTpl = require('./commentPopup.tpl.html');

var indentModule = {
    init: function () {
        this.getIndents();
    },

    getIndents: function () {
        apiServer.getIndents(function (data) {
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
        }, gUser.sessionId);
    },
    commentPopup: function (params) {
        var renderData = {
            comment: i18n.timeline.comment
        };

        if (params.name) {
            renderData.title = i18n.comment.reply_comment;
            renderData.placeholder = i18n.comment.reply + '@' + params.name + ':';
        } else {
            renderData.title = i18n.timeline.comment;
            renderData.placeholder = i18n.comment.placeholder;
        }

        var output = appFunc.renderTpl(popupTpl, renderData);
        hiApp.popup(output);

        var bindings = [{
            element: '#commentBtn',
            event: 'click',
            handler: commentModule.sendComment
        }];

        appFunc.bindEvents(bindings);
    },
    sendComment: function () {
        var text = $$('#commentText').val();

        if (appFunc.getCharLength(text) < 4) {
            hiApp.alert(i18n.index.err_text_too_short);
            return false;
        }

        hiApp.showPreloader(i18n.comment.commenting);

        setTimeout(function () {
            hiApp.hidePreloader();
            hiApp.closeModal('.comment-popup');

            //Refresh comment content
        }, 1500);
    },
    createActionSheet: function () {
        var replyName = $$(this).find('.comment-detail .name').html();
        var buttons1 = [
            {
                text: i18n.comment.reply_comment,
                bold: true,
                onClick: function () {
                    commentModule.commentPopup({ name: replyName });
                }
            },
            {
                text: i18n.comment.copy_comment,
                bold: true
            }
        ];
        var buttons2 = [
            {
                text: i18n.global.cancel,
                color: 'red'
            }
        ];

        var groups = [buttons1, buttons2];
        hiApp.actions(groups);
    }
};

module.exports = commentModule;