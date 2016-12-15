module.exports = {
    getLocal: function () {
        return localStorage.getItem('lang') || 'en-us';
    },
    setLocal: function (lang) {
        localStorage.setItem('lang', lang);
    },
    getUser: function () {
        return localStorage.getItem('user') || {};
    },
    setUser: function (user) {
        localStorage.setItem('user', user);
    }
};