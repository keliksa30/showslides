/**
 * CSInterface - v9.4.0
 * Adobe CEP interface library for communication between CEP panel and After Effects host.
 */
function CSInterface() {}

CSInterface.prototype.getHostEnvironment = function() {
    var env = window.__adobe_cep__ ? window.__adobe_cep__.getHostEnvironment() : '{}';
    return JSON.parse(env);
};

CSInterface.prototype.closeExtension = function() {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.closeExtension();
    }
};

CSInterface.prototype.evalScript = function(script, callback) {
    if (window.__adobe_cep__) {
        if (callback === null || callback === undefined) {
            callback = function() {};
        }
        window.__adobe_cep__.evalScript(script, callback);
    } else {
        console.warn("[CSInterface mock] evalScript:", script);
        if (callback) callback('{"status":"mock"}');
    }
};

CSInterface.prototype.requestOpenExtension = function(extensionId, params) {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.requestOpenExtension(extensionId, params);
    }
};

CSInterface.prototype.addEventListener = function(type, listener, obj) {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.addEventListener(type, listener, obj);
    }
};

CSInterface.prototype.removeEventListener = function(type, listener, obj) {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.removeEventListener(type, listener, obj);
    }
};

CSInterface.prototype.dispatchEvent = function(event) {
    if (window.__adobe_cep__) {
        window.__adobe_cep__.dispatchEvent(event);
    }
};

CSInterface.prototype.getSystemPath = function(pathType) {
    var path = "";
    if (window.__adobe_cep__) {
        path = window.__adobe_cep__.getSystemPath(pathType);
    }
    return path;
};
