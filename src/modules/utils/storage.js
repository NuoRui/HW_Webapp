module.exports = {
    getUser: function() {
    	var user = JSON.parse(localStorage.getItem('user') || '{}');
        return user;
    },
    setUser: function(user) {
    	var user = JSON.stringify(user);
        localStorage.setItem('user', user);
        return user;
    },
    delUser: function() {
        localStorage.removeItem('user');
    }
};
