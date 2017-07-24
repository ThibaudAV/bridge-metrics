'use strict';

class NotImplementedError extends Error {
    constructor(methodName) {
        super(`The method: ${methodName} has to be implemented`);
        this.name = this.constructor.name;
    }
}

module.exports = NotImplementedError;
