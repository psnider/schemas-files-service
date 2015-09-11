/// <reference path='../../typings/node/node.d.ts' />

var seneca = require( 'seneca' )()
      .use( './commonjs/schemas-api' )
      .client( { type:'tcp', pin:'role:schemas' } )

var app = require( 'express' )()
      .use( require('body-parser').json() )
      .use( seneca.export( 'web' ) )
      .listen(3000)
