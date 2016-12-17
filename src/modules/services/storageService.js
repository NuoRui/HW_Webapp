module.exports = {
    getUser: function() {
    	var user = JSON.parse(localStorage.getItem('user') || '{}');
    	log('storageService.getUser:', user);
        return user;
    },
    setUser: function(user) {
    	var user = JSON.stringify(user);
        localStorage.setItem('user', user);
    },
    delUser: function() {
        localStorage.removeItem('user');
    }
};
