var xhr = require('./xhr');

module.exports = {

	login: function (callback, account, password) {
		xhr.simpleGet('login', {
			account: account,
			password: password
		}, function (res) {
			if (callback && typeof(callback) == 'function') {
				callback(res);
			}
		});
	}
};