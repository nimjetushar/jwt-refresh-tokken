import mongoose from "mongoose";

export default config => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      config.db_url,
      { useNewUrlParser: true }
    );
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    const db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on("error", err => {
      reject(err);
      console.error("MongoDB connection error:");
    });

    db.once("open", function() {
      // we're connected!
      // connect to a database if needed, then pass it to `callback`:
      console.log("Database connected at" + config.db_url);
      resolve(db);
    });
  });
};
