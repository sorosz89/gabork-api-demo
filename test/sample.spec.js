"use strict";
const { expect } = require("chai");

/*
    This is a sample test file. Please create your own implementation.
    Check the README.md for more information.
*/

describe("Sample Mocha Test", () => {
    it("should be true", () => {
        expect(true).to.be.true;
    });

    it("should be false", () => {
        const threshold = 0.5;
        const random = Math.random() > threshold;
        expect(random).to.be.false;
    });
});
