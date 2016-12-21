var utils = require('./utils');
var networkStatus = require('../components/networkStatus');

module.exports = {

    checkConnection: function () {
		if (utils.isPhonegap()) {
			var network = networkStatus.checkConnection();
			if (network === 'NoNetwork') {
				nrApp.alert('无网络连接', function () {
					nrApp.hideIndicator();
					nrApp.hidePreloader();
				});

				return false;
			}
		}

		return true;
    },

    getRequestURL: function (path) {
    	return gConfig.url + '/' + path;
    },

    simpleGet: function (path, params, callback) {
    	var self = this;

		if (!self.checkConnection()) {
			return;
		}

        $$.ajax({
            url: self.getRequestURL(path),
            method: 'GET',
            data: params,
            success: function (data) {
            	data = data ? JSON.parse(data) : '';
				if (callback && typeof(callback) == 'function') {
					callback(data);
				}
            },
			error: function () {
				nrApp.alert('网络异常', function () {
					nrApp.hideIndicator();
					nrApp.hidePreloader();
				});
			}
        });
    },

	simplePost: function (path, params, data, callback) {
		var self = this;

		if (!self.checkConnection()) {
			return;
		}

		$$.ajax({
			url: self.getRequestURL(path) + ($$.param(params) ? '?' + $$.param(params) : ''),
			method: 'POST',
			data: data,
			success: function (data) {
				data = data ? JSON.parse(data) : '';
				if (callback && typeof(callback) == 'function') {
					callback(data);
				}
			},
			error: function () {
				nrApp.alert('网络异常', function () {
					nrApp.hideIndicator();
					nrApp.hidePreloader();
				});
			}
		});
	},

	simpleCall: function (options, callback) {
		var that = this;

		options = options || {};
		options.data = options.data ? options.data : '';

		//If you access your server api ,please user `post` method.
		options.method = options.method || 'GET';
		//options.method = options.method || 'POST';

		if (utils.isPhonegap()) {
			//Check network connection
			var network = networkStatus.checkConnection();
			if (network === 'NoNetwork') {

				hiApp.alert(i18n.error.no_network, function () {
					hiApp.hideIndicator();
					hiApp.hidePreloader();
				});

				return false;
			}
		}

		$$.ajax({
			url: that.getRequestURL(options),
			method: options.method,
			data: options.data,
			success: function (data) {
				data = data ? JSON.parse(data) : '';

				var codes = [
					{ code: 10000, message: 'Your session is invalid, please login again', path: '/' },
					{ code: 10001, message: 'Unknown error,please login again', path: 'tpl/login.html' },
					{ code: 20001, message: 'User name or password does not match', path: '/' }
				];

				var codeLevel = that.search(data.err_code, codes);

				if (!codeLevel) {

					(typeof (callback) === 'function') ? callback(data) : '';

				} else {

					hiApp.alert(codeLevel.message, function () {
						hiApp.hideIndicator();
						hiApp.hidePreloader();
					});
				}
			}
		});

	}
};