const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression')
const next = require('next');
const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 2000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handler = routes.getRequestHandler(app);

const server = express();
// server.use(cookieParser());
// server.use(compression());

app.prepare()
    .then(() => {
        server
            .use(handler)
            .listen(port, (err) => {
                if (err) throw err;
                console.log(`> Ready on http://localhost:${port}`);
            });
    });