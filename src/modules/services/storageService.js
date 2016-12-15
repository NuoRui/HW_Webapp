module.exports = {
    getUser: function() {
        return localStorage.getItem('user') || {};
    },
    setUser: function(user) {
        localStorage.setItem('user', user);
    },
    delUser: function() {
        localStorage.removeItem('user');
    }
};
