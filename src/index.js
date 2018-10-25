import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import initializeDb from "./db";
import api from "./controllers";
import config from "./config.json";

const app = express(),
  server = http.createServer(app);

// logger
app.use(morgan("dev"));

// 3rd party middleware
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

// connect to db
initializeDb(config).then(db => {
  // api router
  app.use("/api", api({ config, db }));

  server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${server.address().port}`);
  });
});

export default app;
