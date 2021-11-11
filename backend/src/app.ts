import express from 'express';
import { createServer } from 'http';
import { apolloInit } from "./lib/apollo";

const EXPRESS_PORT: Number = parseInt(process.env.EXPRESS_PORT as string) || 3000;

const app = express();

app.use(express.static('../frontend/build'));

const httpServer = createServer(app);

(async () => {    
    await apolloInit({ app: app, httpServer: httpServer });
})();

httpServer.listen(EXPRESS_PORT, () => console.log(`Started HTTP server on port ${EXPRESS_PORT}`));