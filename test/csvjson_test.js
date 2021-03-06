var csvjson = require('../index.js');

var expect = require('chai').expect;

describe('csvjson', function() {
  it('should be an object', function(done) {
    expect(csvjson).to.be.an('object');
    done();
  });
  it('should have all exposed functions', function(done) {
    expect(csvjson).to.have.keys(['toObject', 'toArray', 'toCSV', 'toColumnArray', 'toSchemaObject']);
    done();
  });
});

describe('toObject', function() {
  var result = csvjson.toObject('./test/sample.csv').output;
  it('should return an array of objects', function(done) {
    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    done();
  });
});

describe('toSchemaObject', function() {
  var result = csvjson.toSchemaObject('./test/schema_sample.csv').output;
  it('should return an array of objects with nested objects', function(done) {
    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0]['contact']).to.be.an('object');
    done();
  });
});

describe('toSchemaObject with nested and delimted arrays', function() {
  var result = csvjson.toSchemaObject('./test/schema_sample1.csv').output;

  it('should return a nested array of objects with next objects', function(done) {
    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0]['instruments']).to.be.an('object');
    expect(result[0]['instruments']['current']).to.be.an('array');
    expect(result[0]['instruments']['current']).to.have.length(2);
    done();
  });

  it('should return a nested array from ";" delimiter', function(done) {
    var groups = result[0]['groups'];
    expect(groups).to.be.an('array');
    expect(groups).to.have.length(3);
    done();
  });
});

describe('toSchemaObject with nested arrays of objects', function() {
  var result = csvjson.toSchemaObject('./test/schema_sample2.csv').output;

  it('should return an array of objects', function(done) {
    expect(result[0]['contacts']).to.be.an('array');
    expect(result[0]['contacts'][1]).to.be.an('object');
    expect(result[1]['contacts'][1]).to.have.keys(['name', 'phone']);
    done();
  });

  it('should return name as a string', function(done) {
    expect(result[0]['name']).to.be.a('string');
    expect(result[0]['name']).to.equal('Mark');
    done();
  });

  it('should return instruments as an object with an array', function(done) {
    expect(result[0]['instruments']).to.be.an('object');
    expect(result[0]['instruments']['current']).to.be.an('array');
    done();
  });
});