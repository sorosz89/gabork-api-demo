const Validator = require("jsonschema").Validator;

const v = new Validator();

/**
 * This function does a schema validation, and returns a true or false value.
 * If the value is false, then the difference is logged on the console.
 * @response - the response of the request
 * @schema - the expected schema of the response
 * @returns - a boolean
 */

module.exports.schemaValidation = (response, schema) => { // eslint-disable-line
    const validation = v.validate(response, schema);
    const result = validation.valid || validation.errors;
    if (validation.errors.length) {
        console.log(validation.errors);
    }
    return result;
};

/**
 * This function selects a random element of an array.
 * @returns - returns the element
 */

module.exports.randomItem = elements => elements[Math.floor(Math.random() * elements.length)];

module.exports.shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
