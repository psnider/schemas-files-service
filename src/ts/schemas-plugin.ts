/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/schemas-files-service/schemas-plugin.d.ts"/>
/// <reference path="../../typings/schemas-files-service/schemas-protocol.d.ts"/>
/// <reference path="../../typings/tv4-via-typenames-node/tv4-via-typenames-node.d.ts"/>
// Assume express is using validation of the msg via json-schema

import fs = require('fs');
import tv4vtn = require('tv4-via-typenames-node');
import SchemaFiles = tv4vtn.SchemaFiles;
import SchemasPlugin = require('schemas-plugin');


function schemas( options: SchemasPlugin.Options ) {

    var schema_files: SchemaFiles;

    this.add( 'init:schemas', init );


    function init(msg, respond) {
        schema_files = new SchemaFiles({ schemasDir: options.schemasDir});
        var init_promise = schema_files.init();
        var schemas_ready_promise = init_promise.then(function (result) {
            let filenames = fs.readdirSync(options.schemasDir);
            let typenames = [];
            filenames.forEach((filename) => {
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
        schemas_ready_promise.then((result) => {
            respond();
        })
        .catch((error) => {
            respond(error);
        })
    }


    this.add( 'role:schemas,action:read', (msg : SchemasProtocol.SchemasRequest, respond) => {
        if (!('typename' in msg)) {
            respond(null, {error: 'expected msg.typename'});
        } else {
            let schema = schema_files.test.getLoadedSchema(msg.typename);
            if (schema) {
                respond(null, {schema});
            } else {
                respond(null, {error: 'no schema for typename=' + msg.typename});
            }
        }
    })

}

export = schemas
