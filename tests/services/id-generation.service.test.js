var chai = require('chai');
var expect = chai.expect;

var idGenerator = require('../../src/services/id-generation.service.js');

describe('ID generator', function () {

    it('should return an unique ID everytime called', function () {

        var id1 = idGenerator.generateId();
        var id2 = idGenerator.generateId();

        expect(id1).to.not.equal(id2);
    });

    it('should return a random ID of length 8', function () {
        var id = idGenerator.generateId();
        expect(id.length).to.equal(8);
    });
});