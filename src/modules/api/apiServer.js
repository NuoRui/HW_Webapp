var xhr = require('./xhr');

module.exports = {

    login: function(callback, username, password) {
        xhr.simplePost('auth/login', null, {
            username: username,
            password: password
        }, function(res) {

            if (res.status) {
                if (callback && typeof(callback) == 'function') {
                    callback(res.result);
                }
            }else{
            	nrApp.alert(res.result);
            }
        });
    },

    getIndents: function(callback, sessionId) {
        xhr.simpleGet('list/indent', {
            sessionId: sessionId
        }, function(res) {
            if (callback && typeof(callback) == 'function') {
                callback(res);
            }
        });
    }
};
