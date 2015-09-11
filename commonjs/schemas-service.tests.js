/// <reference path='../../../typings/node/node.d.ts' />
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/schemas-files-service/schemas-protocol.d.ts' />
var CHAI = require('chai');
var expect = CHAI.expect;
describe('schemas-service', function () {
    describe('schemas-plugin', function () {
        var seneca;
        function readSchema(typename, done) {
            var read_msg = {
                action: 'read',
                typename: typename
            };
            read_msg['role'] = 'schemas';
            seneca.act(read_msg, function (error, read_schema) {
                //console.log('read_schema='+JSON.stringify(read_schema))
                done(error, read_schema);
            });
        }
        beforeEach(function (done) {
            //draftV4Pathname
            seneca = require('seneca')({
                log: 'silent',
                default_plugins: {
                    'mem-store': false
                },
                schemas: {
                    schemasDir: 'test/data/schemas'
                }
            });
            var schemas_plugin = require('schemas-plugin');
            seneca.use(schemas_plugin);
            seneca.error(function (error) {
                done(error);
            });
            done();
        });
        describe('action:read', function () {
            it('+ should read a schema', function (done) {
                var typename = 'SHA1';
                readSchema(typename, function (error, read_schema) {
                    if (error) {
                        done(error);
                    }
                    else {
                        console.log('read_schema=' + JSON.stringify(read_schema));
                        expect(read_schema.schema).to.have.property('name');
                        expect(read_schema.schema['name']).to.equal(typename);
                        done();
                    }
                });
            });
        });
    });
});
