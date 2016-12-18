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
            } else {
                nrApp.alert(res.result);
            }
        });
    },

    getSuppliers: function(callback) {
        xhr.simpleGet('supplier/list', null, function(res) {

            if (res.status) {
                if (callback && typeof(callback) == 'function') {
                    callback(res.result);
                }
            } else {
                nrApp.alert(res.result);
            }
        });
    },

    getQuotation: function(callback, supplier_id) {
        xhr.simpleGet('supplier/listdata', {
            supplier_id:supplier_id
        }, function(res) {

            if (res.status) {
                if (callback && typeof(callback) == 'function') {
                    callback(res.result);
                }
            } else {
                nrApp.alert(res.result);
            }
        });
    },

    getIndents: function(callback, employeeId) {
		xhr.simpleGet('indent/list', {
			employee_id: employeeId
		}, function (res) {
			if (res.status) {
				if (callback && typeof(callback) == 'function') {
					callback(res.result);
				}
			} else {
				nrApp.alert(res.result);
			}
		});
	}

};
