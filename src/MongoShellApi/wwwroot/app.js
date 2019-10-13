(function () {

    window.addEventListener('load', function () {
        var tbConnection = this.document.getElementById('tbConnection');
        var btnConnect = this.document.getElementById('btnConnect');
        var btnExec = this.document.getElementById('btnExec');
        var btnHelp= this.document.getElementById('btnHelp');
        var tbResult = this.document.getElementById('tbResult');
        var tbQuery = this.document.getElementById('tbQuery');
        var imgLoader = this.document.getElementById('imgLoader');

        var localStorageKey = 'data';
        var localStorageValue = {
            connection: 'mongodb://host.docker.internal:27017/lookupdb',
            query: `{
  "find": "country",
  "filter": {}
}`
        };

        function init() {
            localStorageValue = ls.get(localStorageKey, localStorageValue);
            tbConnection.value = localStorageValue.connection;
            tbQuery.value = localStorageValue.query;
        }

        function wait(doWait) {
            if (doWait) {
                imgLoader.style.left = parseInt(-100 + document.body.clientWidth / 2) + 'px';
                imgLoader.className = '';
            } else {
                imgLoader.className = 'hidden';
            }
        }

        btnConnect.addEventListener('click', function () {
            wait(true);
            h.post('api/mongo/connect', { connection: tbConnection.value }, res => {
                tbResult.innerText = JSON.stringify(res, null, 2);
                wait(false);
            });
        });

        btnExec.addEventListener('click', function () {
            wait(true);
            h.post('api/mongo', { connection: tbConnection.value, query: tbQuery.value }, res => {
                tbResult.innerText = JSON.stringify(res, null, 2);
                wait(false);
            });
        });

        btnHelp.addEventListener('click', function () {
            window.open('https://docs.mongodb.com/manual/reference/command/nav-crud/', '_blank');
        });

        tbConnection.addEventListener('keyup', function () {
            localStorageValue.connection = tbConnection.value;
            ls.set(localStorageKey, localStorageValue);
        });

        tbQuery.addEventListener('keyup', function () {
            localStorageValue.query = tbQuery.value;
            ls.set(localStorageKey, localStorageValue);
        });

        this.document.addEventListener('keydown', function (ev) {
            if (ev.ctrlKey && ev.keyCode === 13) {
                btnExec.click();
            }
        });

        init();
    });

})();