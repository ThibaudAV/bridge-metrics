'use strict';

describe('lib/errors', () => {
    const errors = require('../../../../lib/errors');

    it('should return errors', () => {
        Object.keys(errors).forEach((key) => {
            expect(errors[key].prototype instanceof Error).toBe(true);
        });
    });
});
