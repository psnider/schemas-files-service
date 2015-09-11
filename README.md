# A JSON Schemas Micro-Service based on Seneca

This provides a simple service that will return the JSON schema that matches a given typename.

The service consists of two parts:  
- the schemas service  
This takes a JSON request.
- a web API service
This takes a REST request.

This service wraps [tv4-via-typenames-node](https://www.npmjs.com/package/tv4-via-typenames-node)

## Build
```
make build
```

## test
```
make test
```

## Build and test
```
make
```

## Run Service and Web API Server
In one command shell, run:
```
node schemas-pin-service.js --seneca.log=plugin:schemas
```

And in another command shell, run:
```
node schemas-app.js --seneca.log=plugin:web,plugin:api
```

Then from a browser, issue these queries that should return a schema:

- [http://localhost:3000/api/schemas?typename=SHA1](http://localhost:3000/api/schemas?typename=SHA1)
- [http://localhost:3000/api/schemas?typename=Draft-04](http://localhost:3000/api/schemas?typename=Draft-04)

and change the typename to a schema that doesn't exist:

- [http://localhost:3000/api/schemas?typename=Unicorn](http://localhost:3000/api/schemas?typename=Unicorn)

# Support
Please file an issue if you have any problems.
