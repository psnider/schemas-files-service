/// <reference path='../../typings/tv4/tv4.d.ts' />
/// <reference path="../../typings/tv4-via-typenames-node/tv4-via-typenames-node.d.ts"/>



declare module "schemas-plugin" {

    import tv4vtn = require('tv4-via-typenames-node');

    interface Options extends tv4vtn.IConfig {
    }

}
