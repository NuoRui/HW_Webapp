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
            }else{
            	nrApp.alert(res.result);
            }
        });
    },

    getIndents: function(callback, sessionId) {
        xhr.simpleGet('list/indent', {
            sessionId: sessionId
        }, function(res) {
            if (callback && typeof(callback) == 'function') {
                callback(res);
            }
        });

    // getIndents: function (callback, employeeId) {
		// callback({
		// 	result: [
		// 		{id:1,name:'zhuzheng'},
		// 		{id:2,name:'zhuzheng2'},
		// 		{id:3,name:'zhuzheng3'},
		// 		{id:4,name:'zhuzheng4'},
		// 		{id:5,name:'zhuzheng5'},
		// 		{id:6,name:'zhuzheng6'},
		// 	]
		// });

        // xhr.simpleGet('list/indent', {
			// employee_id: employeeId
        // }, function (res) {
        //     if (callback && typeof(callback) == 'function') {
        //         callback(res);
        //     }
        // });

    }
};
