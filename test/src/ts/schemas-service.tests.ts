/// <reference path='../../../typings/node/node.d.ts' />
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/schemas-files-service/schemas-protocol.d.ts' />



import CHAI                 = require('chai');
const expect                = CHAI.expect;




describe('schemas-service', function() {

    var seneca;


    before(function(done) {
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


    describe('schemas-plugin', function() {

        function readSchema(typename: string, done: (error?: Error) => void, tests: (response) => void)  {
            let read_msg = {
                action: 'read',
                role: 'schemas'
            };
            if (typename) read_msg['typename'] = typename;
            //console.log('read_msg=' + JSON.stringify(read_msg))
            seneca.act(read_msg, (error, response) => {
                //console.log('read_schema='+JSON.stringify(read_schema))
                if (error) {
                    done(error);
                } else {
                    //console.log('response=' + JSON.stringify(response))
                    tests(response);
                    done();
                }
            });
        }


        describe('action:read', function() {

            it('should return a schema when the typename references a cached schema', function(done) {
                let typename = 'SHA1'
                readSchema(typename, done, (response) => {
                    expect(response).to.not.have.property('error');
                    let schema = response.schema;
                    expect(schema).to.have.property('name');
                    expect(schema['name']).to.equal(typename);
                });
            });


            it('should return an error when the request is missing the typename', function(done) {
                let typename;
                readSchema(typename, done, (response) => {
                    expect(response).to.not.have.property('schema');
                    expect(response.error).to.equal('expected msg.typename');
                });
            });


            it('should return an error when the typename doesnt reference a schema', function(done) {
                let typename = 'Unicorn';
                readSchema(typename, done, (response) => {
                    expect(response).to.not.have.property('schema');
                    expect(response.error).to.equal('no schema for typename=Unicorn');
                });
            });

        });

    });

});
