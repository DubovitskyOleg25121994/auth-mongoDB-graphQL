const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolves/index');


const config = require('./config/config');

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

app.use((req, res, next) => {
    const responseSettings = {
        AccessControlAllowOrigin: req.headers.origin,
        AccessControlAllowHeaders:
      'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name',
        AccessControlAllowMethods: 'POST, GET, PUT, DELETE, OPTIONS',
        AccessControlAllowCredentials: true,
    };
    res.header(
        'Access-Control-Allow-Credentials',
        responseSettings.AccessControlAllowCredentials,
    );
    res.header(
        'Access-Control-Allow-Origin',
        responseSettings.AccessControlAllowOrigin,
    );
    res.header(
        'Access-Control-Allow-Headers',
        req.headers['access-control-request-headers']
            ? req.headers['access-control-request-headers']
            : 'x-requested-with',
    );
    res.header(
        'Access-Control-Allow-Methods',
        req.headers['access-control-request-method']
            ? req.headers['access-control-request-method']
            : responseSettings.AccessControlAllowMethods,
    );
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.db_main, {
    useNewUrlParser: true,
    keepAlive: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const mainDB = mongoose.connection;
mainDB.on('error', (err) => {
    if (err) {
        console.log('MainDB');
        console.log(err);
    }
});
mainDB.once('open', () => {
    console.info('CLIENT DB connected successfully');
});

app.use('/api', require('./middleware/jwt.middlerware').jwtCheck);

// Routers
// require('./routes/auth.route')(app);
// require('./routes/user.route')(app);

app.use(require('./middleware/error.middleware').handleError);

const httpServer = http.createServer(app);

httpServer.listen(config.port, () => {
    console.log(`server is listening on ${config.port}`);
});
