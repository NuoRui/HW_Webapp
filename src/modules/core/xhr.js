var utils = require('./utils');
var networkStatus = require('../components/networkStatus');

module.exports = {

    checkConnection: function () {
		// if (utils.isPhonegap()) {
		// 	var network = networkStatus.checkConnection();
		// 	if (network === 'NoNetwork') {
		// 		nrApp.alert('无网络连接', function () {
		// 			nrApp.hideIndicator();
		// 			nrApp.hidePreloader();
		// 		});

		// 		return false;
		// 	}
		// }

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
	}
};