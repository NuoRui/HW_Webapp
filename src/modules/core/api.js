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

    getQuotationDetail: function(callback, supplier_id) {
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
	},

	removeIndent: function(callback, employeeId, indentId) {
		xhr.simpleGet('indent/del', {
			employee_id: employeeId,
			id: indentId
		}, function (res) {
			if (res.status) {
				if (callback && typeof(callback) == 'function') {
					callback(res.result);
				}
			} else {
				nrApp.alert(res.result);
			}
		});
	},
	
	getSuppliers: function (callback, employeeId) {
		xhr.simpleGet('supplier/list', {
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
	},

	getUnits: function (callback, employeeId) {
		xhr.simpleGet('material/unitlist', {
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
	},

	getGrades: function (callback, employeeId) {
		xhr.simpleGet('grade/list', {
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
	},

	getTradeCompanies: function (callback, employeeId) {
		xhr.simpleGet('company/tradelist', {
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
	},

	getBillCompanies: function (callback, employeeId) {
		xhr.simpleGet('company/billist', {
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
	},

	getPayments: function (callback, employeeId) {
		xhr.simpleGet('pay/list', {
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
