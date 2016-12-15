require('./login.less');

var appFunc = require('../utils/appFunc'),
    template = require('./login.tpl.html');

var login = {
    init: function() {
        appFunc.hideToolbar();
        this.bindEvents();
    },

    bindEvents: function() {
        var bindings = [{
            element: '#commentContent',
            selector: '.comment-item',
            event: 'click',
            handler: commentModule.createActionSheet
        }, {
            element: '#homeView .item-comment-btn',
            event: 'click',
            handler: commentModule.commentPopup
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = login;
