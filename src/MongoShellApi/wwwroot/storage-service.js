(function () {
    var ls = {};

    ls.get = function (key, defaultValue) {
        var value = window.localStorage.getItem(key);

        if (!defaultValue) {
            defaultValue = {};
        }

        return value ? JSON.parse(value) : defaultValue;
    };

    ls.set = function (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    window.ls = ls;
})();