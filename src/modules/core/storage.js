module.exports = {
    getUser: function() {
		return JSON.parse(localStorage.getItem('user') || '{}');
    },
    setUser: function(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },
    delUser: function() {
        localStorage.removeItem('user');
    }
};
