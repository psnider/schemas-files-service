var CONFIG = require('./config/config.json');
require( 'seneca' )(CONFIG)
  .use( './commonjs/schemas-plugin' )
  // listen for role:math messages
  // IMPORTANT: must match client
  .listen( { type:'tcp', pin:'role:schemas' } )
