'use strict';

/* eslint camelcase: 0*/
/* eslint no-console: 0*/

describe('lib/metrics/IMetrics', () => {
    const IMetrics = require('../../../lib/IMetrics');
    let iMetrics;
    const errors = require('../../../lib/errors');

    beforeEach(() => {
        iMetrics = new IMetrics();
    });

    describe('getAllMetrics', () => {
        it('should throw an error', (done) => {
            const fn = () => {
                iMetrics.getAllMetrics();
            };
            expect(fn).toThrowError(errors.NotImplementedError, 'The method: getAllMetrics has to be implemented');
            done();
        });
    });

    describe('getContentType', () => {
        it('should throw an error', (done) => {
            const fn = () => {
                iMetrics.getContentType();
            };
            expect(fn).toThrowError(errors.NotImplementedError, 'The method: getContentType has to be implemented');
            done();
        });
    });

    describe('updateHistogram', () => {
        it('should throw an error', (done) => {
            const fn = () => {
                iMetrics.updateHistogram();
            };
            expect(fn).toThrowError(errors.NotImplementedError, 'The method: updateHistogram has to be implemented');
            done();
        });
    });
});
