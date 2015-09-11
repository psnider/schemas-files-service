function api( options ) {

    // restrict the space of user input actions to those that are public
    var valid_actions = { read: 'read' }

    this.add( 'role:api,path:schemas', function( msg, respond ) {
        //var action = valid_actions[msg.action];
        //if (action) {
            this.act( 'role:schemas', {
                action:   'read',
                typename: msg.typename
            }, respond )
        // } else {
        //     respond(new Error('unknown action=' + msg.action));
        // }
    })


    this.add( 'init:api', function( msg, respond ) {
        this.act('role:web', {
            use: {
                prefix: '/api',
                pin:    'role:api,path:*',
                map: {
                    //schemas: { GET:true, suffix:'/:action' }
                    schemas: { GET:true }
                }
            }
        }, respond )
    })

}


export = api
