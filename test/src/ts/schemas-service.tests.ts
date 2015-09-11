/// <reference path='../../../typings/node/node.d.ts' />
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/schemas-files-service/schemas-protocol.d.ts' />



import CHAI                 = require('chai');
const expect                = CHAI.expect;




describe('schemas-service', function() {

    describe('schemas-plugin', function() {

        var seneca;


        function readSchema(typename: string, done: (error?: Error, response?: SchemasProtocol.SchemasResponse) => void)  {
            let read_msg: SchemasProtocol.SchemasRequest = {
                action: 'read',
                typename: typename,
            };
            read_msg['role'] = 'schemas';
            seneca.act(read_msg, (error, read_schema) => {
                //console.log('read_schema='+JSON.stringify(read_schema))
                done(error, read_schema);
            });
        }


        beforeEach(function(done) {
            //draftV4Pathname
            seneca = require('seneca')({
                log: 'silent',
                default_plugins:{
                    'mem-store':false
                },
                schemas: {
                    schemasDir: 'test/data/schemas'
                }
            });
            var schemas_plugin = require('schemas-plugin')
            seneca.use(schemas_plugin);
            seneca.error((error) => {
                done(error)
            })
            done();
        });


        describe('action:read', function() {

            it('+ should read a schema', function(done) {
                let typename = 'SHA1'
                readSchema(typename, (error, read_schema) => {
                    if (error) {
                        done(error);
                    } else {
                        console.log('read_schema=' + JSON.stringify(read_schema))
                        expect(read_schema.schema).to.have.property('name');
                        expect(read_schema.schema['name']).to.equal(typename);
                        done();
                    }
                });
            });

        });

    });

});
