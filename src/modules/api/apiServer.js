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
	},

    getIndents: function (callback, employeeId) {
		callback({
			result: [
				{id:1,name:'zhuzheng'},
				{id:2,name:'zhuzheng2'},
				{id:3,name:'zhuzheng3'},
				{id:4,name:'zhuzheng4'},
				{id:5,name:'zhuzheng5'},
				{id:6,name:'zhuzheng6'},
			]
		});

        // xhr.simpleGet('list/indent', {
			// employee_id: employeeId
        // }, function (res) {
        //     if (callback && typeof(callback) == 'function') {
        //         callback(res);
        //     }
        // });
    }
};