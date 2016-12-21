module.exports = {
    getUser: function() {
		return JSON.parse(localStorage.getItem('user') || '{}');
    },
    setUser: function(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },
    delUser: function() {
        localStorage.removeItem('user');
    },
	getRepository: function() {
		return JSON.parse(localStorage.getItem('repository') || '{}');
	},
	setRepository: function(repository) {
		localStorage.setItem('repository', JSON.stringify(repository));
	},
	delRepository: function() {
		localStorage.removeItem('repository');
	}
};
