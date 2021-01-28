const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();

module.exports.getRequest = async (url, path, params) => {
    xhr.open("GET", url + path + params, true);

    xhr.onerror = function (err) {
        console.log("Error during Http Request:", err);
    };

    xhr.onreadystatechange = function () {
        console.log("XHR ReadyState", xhr.readyState);

        if (xhr.readyState === 4) {
            console.log("XHR Status", xhr.status);
            return xhr;
        }
    };

    xhr.send();
};
