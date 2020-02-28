import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";

import initializeDb from "./db";
import api from "./controllers";
import config from "./config";
import errorHandler from "./common/error.interceptor";
import path from 'path';

const app = express(),
  server = http.createServer(app);

// middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

app.use(compression());
app.use(helmet());

// connect to db
initializeDb(config).then(db => {
  // api router
  app.use("/api", api({ config, db }));

  app.use(express.static(__dirname + '/client'));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client', 'index.html'));
  });

  app.use(errorHandler);

  server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${server.address().port}`);
  });
});

export default app;
