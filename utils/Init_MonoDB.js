const mongoose = require("mongoose");

if (process.env.ENV == "DEV")
  mongoose.connect(
    process.env.DATABASE_URL_DEV,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslValidate: true,
      useCreateIndex: true,
    },
    () => {
      console.log("database connected");
    }
  );
