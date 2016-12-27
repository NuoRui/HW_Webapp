var api = require('./api');
var utils = require('./utils');
var storage = require('./storage');

module.exports = {

	loadData: function (repository) {
		api.getTradeCompanies(function (data) {
			storage.setTradeCompanies(data);

			repository['tradeCompanies'] = storage.getTradeCompanies();
		}, gUser.employee_id);

		api.getCompanies(function (data) {
			storage.setCompanies(data);
			repository['companies'] = storage.getCompanies();

			data.forEach(function(company) {
				api.getBillCompanies(function (data) {
					storage.setBillCompanies(company.id, data);

					repository['billCompanies'] = storage.getBillCompanies();
				}, company.id, gUser.employee_id);
			});
		}, gUser.employee_id);

		api.getSuppliers(function (data) {
			storage.setSuppliers(data);

			repository['suppliers'] = storage.getSuppliers();
		}, gUser.employee_id);

		api.getPayments(function (data) {
			storage.setPayments(data);

			repository['payments'] = storage.getPayments();
		}, gUser.employee_id);

		api.getMaterials(function (data) {
			storage.setMaterials(data);

			repository['materials'] = storage.getMaterials();
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
