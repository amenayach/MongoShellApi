(function () {
    var h = {};

    h.get = function (url, callback) {
        fetch(url, {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => {
                if (callback) callback(json);
                else console.log(json);
            })
            .catch(err => {
                console.log(err);
            });
    };

    h.post = function (url, payload, callback) {
        fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(payload), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (callback) callback(data);
                else console.log(data);
            })
            .catch(error => console.error(error));
    };

    window.h = h;
})();