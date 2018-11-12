import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";

import initializeDb from "./db";
import api from "./controllers";
import config from "./config.json";
import errorHandler from "./common/error.interceptor";

const app = express(),
  server = http.createServer(app);

// middleware
// logger
app.use(morgan("dev"));

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

  app.use(errorHandler);

  server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${server.address().port}`);
  });
});

export default app;
