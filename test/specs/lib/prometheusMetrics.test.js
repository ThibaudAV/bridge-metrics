'use strict';

/* eslint camelcase: 0*/
/* eslint no-console: 0*/

const proxyquire = require('proxyquire');

describe('lib/prometheusMetrics', () => {
    let promClient;
    let registry;
    let labels;
    let histogram;
    let register;

    beforeEach(() => {
        register = jasmine.createSpyObj('register', ['metrics']);

        registry = jasmine.createSpyObj('registry', ['registerMetric', 'metrics']);
        registry.contentType = jasmine.createSpy('contentType');

        labels = jasmine.createSpyObj('labels', ['observe']);

        histogram = jasmine.createSpyObj('histogram', ['labels']);
        histogram.labels.and.returnValue(labels);

        promClient = jasmine.createSpyObj('prom-client', ['collectDefaultMetrics', 'Registry', 'Histogram']);
        promClient.Registry.and.returnValue(registry);
        promClient.Histogram.and.returnValue(histogram);
        promClient.register = register;
    });

    describe('constructor', () => {
        it('should create a PrometheusMetrics instance', (done) => {
            expect(promClient.collectDefaultMetrics).not.toHaveBeenCalled();
            expect(promClient.Registry).not.toHaveBeenCalled();
            expect(promClient.Histogram).not.toHaveBeenCalled();
            expect(registry.registerMetric).not.toHaveBeenCalled();

            const prometheusMetrics = proxyquire('../../../lib/prometheusMetrics', {
                'prom-client': promClient
            });
            expect(promClient.collectDefaultMetrics).toHaveBeenCalled();
            expect(promClient.Registry).toHaveBeenCalledWith();
            expect(promClient.Histogram).toHaveBeenCalledWith({
                name: 'http_request_duration_ms',
                help: 'Duration of HTTP requests in ms',
                labelNames: ['route', 'statusCode', 'method'],
                buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500, 1000, 1500, 2000, 3000, 5000, 10000, 15000, 20000, 30000, 50000] // eslint-disable-line
            });
            expect(prometheusMetrics.histograms).toEqual({http_request_duration_ms: histogram});
            expect(registry.registerMetric).toHaveBeenCalledWith(histogram);
            done();
        });
    });

    describe('classMethods', () => {
        let prometheusMetrics;

        beforeEach(() => {
            prometheusMetrics = proxyquire('../../../lib/prometheusMetrics', {
                'prom-client': promClient
            });
        });

        describe('getAllMetrics', () => {
            it('should return the metrics', (done) => {
                const metricsFromProm = {metricsFromProm: 'metricsFromProm'};
                register.metrics.and.returnValue(metricsFromProm);

                expect(register.metrics).not.toHaveBeenCalled();

                const ret = prometheusMetrics.getAllMetrics();

                expect(register.metrics).toHaveBeenCalledWith();
                expect(ret).toBe(metricsFromProm);
                done();
            });
        });

        describe('getContentType', () => {
            it('should return the contentType', (done) => {
                const contentType = {contentType: 'contentType'};
                registry.contentType = contentType;
                const ret = prometheusMetrics.getContentType();
                expect(ret).toBe(contentType);
                done();
            });
        });

        describe('updateHistogram', () => {
            it('should throw an error if the histogram does not exist', (done) => {
                expect(() => {
                    prometheusMetrics.updateHistogram('not-an-histogram');
                }).toThrowError(Error, 'The histogram named: \'not-an-histogram\' does not exist.');
                done();
            });

            it('should call labels and observe', (done) => {
                expect(histogram.labels).not.toHaveBeenCalled();
                expect(labels.observe).not.toHaveBeenCalled();
                prometheusMetrics.updateHistogram('http_request_duration_ms', 'baseUrl', 200, "GET", 100); // eslint-disable-line
                expect(histogram.labels).toHaveBeenCalledWith('baseUrl', 200, "GET"); // eslint-disable-line
                expect(labels.observe).toHaveBeenCalledWith(100); // eslint-disable-line
                done();
            });
        });
    });
});
