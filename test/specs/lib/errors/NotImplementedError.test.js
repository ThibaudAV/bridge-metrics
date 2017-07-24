'use strict';

describe('lib/errors/NotImplementedError', () => {
    let notImplementedError;
    let NotImplementedErrorClass;

    beforeEach(() => {
        NotImplementedErrorClass = require('../../../../lib/errors/NotImplementedError');
        notImplementedError = new NotImplementedErrorClass();
    });

    describe('constructor', () => {
        it('should be an instance of NotImplementedErrorClass', () => {
            expect(notImplementedError).toBeDefined();
            expect(notImplementedError instanceof NotImplementedErrorClass).toBe(true);
        });
    });

    describe('error label', () => {
        it('should throw an error with the undefined label', () => {
            expect(() => {
                throw notImplementedError;
            }).toThrowError(NotImplementedErrorClass, 'The method: undefined has to be implemented');
        });

        it('should throw an error with the correct label', () => {
            expect(() => {
                throw new NotImplementedErrorClass('my method name');
            }).toThrowError(NotImplementedErrorClass, 'The method: my method name has to be implemented');
        });
    });
});
