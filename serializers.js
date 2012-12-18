function isObject(x) {
    return typeof(x) === 'object' && x !== null;
}

exports.res = function res(res) {
    return {
        toJSON: function() {
            if (!isObject(res)) return res;

            return {
                statusCode: res.statusCode,
                header: res._header
            }
        }
    }
}

exports.req = function req(req) {
    return {
        toJSON: function() {
            if (!isObject(req)) return req;

            var connection = req.connection || {};
            return {
                method: req.method,
                url: req.url,
                headers: req.headers,
                remoteAddress: connection.remoteAddress,
                remotePort: connection.remotePort
            };
        }
    }
}

exports.err = function err(err) {
    if (!isObject(err)) return err;

    var obj = {
        message: err.message,
        name: err.name,
        stack: err.stack
    };

    Object.keys(err).forEach(function (k) {
        if (err[k] !== undefined) {
            obj[k] = err[k];
        }
    });
    return obj;
};