/// <reference path='../../typings/tv4/tv4.d.ts' />


declare type JsonSchema = tv4.JsonSchema;



declare module SchemasProtocol {

    interface SchemasRequest {
        action: string;
        typename: string;
    }


    interface SchemasResponse {
        schema?: JsonSchema;
        error?:    any;
    }

}
