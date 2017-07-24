'use strict';

const promClient = require('prom-client');
const IMetrics = require('./IMetrics');

class PrometheusMetrics extends IMetrics {
    constructor() {
        super();
        this.collectDefaultMetrics = promClient.collectDefaultMetrics;
        this.registry = new promClient.Registry();
        this.collectDefaultMetrics(this.registry);
        this.histograms = {};

        this.histograms['http_request_duration_ms'] = new promClient.Histogram({
            name: 'http_request_duration_ms',
            help: 'Duration of HTTP requests in ms',
            labelNames: ['route', 'statusCode', 'method'],
            buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500, 1000, 1500, 2000, 3000, 5000, 10000, 15000, 20000, 30000, 50000] // eslint-disable-line
        });

        this.registry.registerMetric(this.histograms['http_request_duration_ms']);
    }

    getAllMetrics() {
        return promClient.register.metrics();
    }

    getContentType() {
        return this.registry.contentType;
    }

    updateHistogram(name, route, statusCode, method, duration) {
        if (!this.histograms[name]) {
            throw new Error(`The histogram named: '${name}' does not exist.`);
        }

        this.histograms[name]
            .labels(route, statusCode, method)
            .observe(duration);
    }
}

module.exports = new PrometheusMetrics();
