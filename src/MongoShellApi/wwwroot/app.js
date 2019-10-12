(function () {

    window.addEventListener('load', function () {
        var tbConnection = this.document.getElementById('tbConnection');
        var btnConnect = this.document.getElementById('btnConnect');
        var btnExec = this.document.getElementById('btnExec');
        var tbResult = this.document.getElementById('tbResult');
        var tbQuery = this.document.getElementById('tbQuery');
        var imgLoader = this.document.getElementById('imgLoader');

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
    });

})();