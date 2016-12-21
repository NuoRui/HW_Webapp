var utils = require('./utils');

module.exports = {
    getUser: function () {
		return JSON.parse(localStorage.getItem('user') || '{}');
    },
    setUser: function (user) {
        localStorage.setItem('user', JSON.stringify(user));
    },
    delUser: function () {
        localStorage.removeItem('user');
    },

	getTradeCompanies: function () {
		return JSON.parse(localStorage.getItem('tradeCompanies') || '{}');
	},
	setTradeCompanies: function (tradeCompanies) {
		localStorage.setItem('tradeCompanies', JSON.stringify(tradeCompanies));
	},
	delTradeCompanies: function () {
		localStorage.removeItem('tradeCompanies');
	},

	getCompanies: function () {
		return JSON.parse(localStorage.getItem('companies') || '{}');
	},
	setCompanies: function (companies) {
		localStorage.setItem('companies', JSON.stringify(companies));
	},
	delCompanies: function () {
		localStorage.removeItem('companies');
	},

	getBillCompanies: function () {
		return JSON.parse(localStorage.getItem('billCompanies') || '{}');
	},
	setBillCompanies: function (companies) {
		localStorage.setItem('billCompanies', JSON.stringify(billCompanies));
	},
	delBillCompanies: function () {
		localStorage.removeItem('billCompanies');
	},

	getSuppliers: function () {
		return JSON.parse(localStorage.getItem('suppliers') || '{}');
	},
	setSuppliers: function (suppliers) {
		localStorage.setItem('suppliers', JSON.stringify(suppliers));
	},
	delSuppliers: function () {
		localStorage.removeItem('suppliers');
	},

	getPayments: function () {
		return JSON.parse(localStorage.getItem('payments') || '{}');
	},
	setPayments: function (payments) {
		localStorage.setItem('payments', JSON.stringify(payments));
	},
	delPayments: function () {
		localStorage.removeItem('payments');
	}



};
