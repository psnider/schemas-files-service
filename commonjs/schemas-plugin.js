/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/schemas-files-service/schemas-plugin.d.ts"/>
/// <reference path="../../typings/schemas-files-service/schemas-protocol.d.ts"/>
/// <reference path="../../typings/tv4-via-typenames-node/tv4-via-typenames-node.d.ts"/>
// Assume express is using validation of the msg via json-schema
var fs = require('fs');
var tv4vtn = require('tv4-via-typenames-node');
var SchemaFiles = tv4vtn.SchemaFiles;
function schemas(options) {
    var schema_files;
    this.add('init:schemas', init);
    function init(msg, respond) {
        schema_files = new SchemaFiles({ schemasDir: options.schemasDir });
        var init_promise = schema_files.init();
        var schemas_ready_promise = init_promise.then(function (result) {
            var filenames = fs.readdirSync(options.schemasDir);
            var typenames = [];
            filenames.forEach(function (filename) {
                var typename = schema_files.test.getTypenameFromSchemaFilename(filename);
                if (typename) {
                    typenames.push(typename);
                }
            });
            if (typenames.length == 0) {
                respond(new Error('No schema found in schemasDir=' + options.schemasDir));
            }
            return schema_files.loadRequiredSchema(typenames);
        });
        schemas_ready_promise.then(function (result) {
            respond();
        })
            .catch(function (error) {
            respond(error);
        });
    }
    this.add('role:schemas,action:read', function (msg, respond) {
        if (!('typename' in msg)) {
            respond(new Error('expected msg.typename'));
        }
        var schema = schema_files.test.getLoadedSchema(msg.typename);
        if (schema) {
            respond(null, { schema: schema });
        }
        else {
            respond(null, { error: 'no schema for typename=' + msg.typename });
        }
    });
}
module.exports = schemas;
