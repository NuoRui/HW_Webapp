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

for (var i = 0; i < data.length; i++) {
	(function(id) {
		api.getBillCompanies(function (data1) {
			log(id)
			log(data1)
				storage.setBillCompanies(id, data1);

				repository['billCompanies'] = storage.getBillCompanies();
			}, id, gUser.employee_id);
	})(data[i].id);
}

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

            data.forEach(function(material) {
                api.getMaterialLots(function (data) {
                    storage.setMaterialLots(material.id, data);

                    repository['materialLots'] = storage.getMaterialLots();
                }, material.id, gUser.employee_id);
            });
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

        var materialLots = storage.getMaterialLots();
        if (!utils.isEmpty(materialLots)) {
            repository['materialLots'] = materialLots;
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
        storage.delMaterialLots();
	}

};
