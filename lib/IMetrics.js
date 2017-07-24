'use strict';

const NotImplementedError = require('./errors/NotImplementedError');

class IMetrics {
    getAllMetrics() {
        throw new NotImplementedError('getAllMetrics');
    }

    getContentType() {
        throw new NotImplementedError('getContentType');
    }

    updateHistogram(name, route, statusCode, method, duration) {
        throw new NotImplementedError('updateHistogram');
    }
}

module.exports = IMetrics;
