var api = require('./api');
var utils = require('./utils');
var storage = require('./storage');

module.exports = {

	loadData: function () {
		api.getTradeCompanies(function (data) {
			storage.setTradeCompanies(data);
		}, gUser.employee_id);

		api.getCompanies(function (data) {
			storage.setCompanies(data);

			data.forEach(function(company) {
				api.getBillCompanies(function (data) {
					storage.setBillCompanies(company.id, data);
				}, company.id, gUser.employee_id);
			});
		}, gUser.employee_id);

		api.getSuppliers(function (data) {
			storage.setSuppliers(data);
		}, gUser.employee_id);

		api.getPayments(function (data) {
			storage.setPayments(data);
		}, gUser.employee_id);

		api.getMaterials(function (data) {
			storage.setMaterials(data);
		}, gUser.employee_id);
	},

	getRepository: function() {
		var repository = {};

		var tradeCompanies = storage.getTradeCompanies();
		if (!utils.isEmpty(tradeCompanies)) {
			repository['tradeCompanies'] = tradeCompanies;
		}

		var companies = storage.getCompanies();
		if (!utils.isEmpty(companies)) {
			repository['companies'] = companies;
		}

		var billCompanies = storage.getBillCompanies();
		if (!utils.isEmpty(billCompanies)) {
			repository['billCompanies'] = billCompanies;
		}

		var suppliers = storage.getSuppliers();
		if (!utils.isEmpty(suppliers)) {
			repository['suppliers'] = suppliers;
		}

		var payments = storage.getPayments();
		if (!utils.isEmpty(payments)) {
			repository['payments'] = payments;
		}

		var materials = storage.getMaterials();
		if (!utils.isEmpty(materials)) {
			repository['materials'] = materials;
		}

		return repository;
	},

	delRepository: function() {
		storage.delTradeCompanies();
		storage.delCompanies();
		storage.delBillCompanies();
		storage.delSuppliers();
		storage.delPayments();
		storage.delMaterials();
	}

};
