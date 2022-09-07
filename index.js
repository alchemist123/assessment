const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./utils/Init_MonoDB");
const authRoute = require("./routers/auth.router");
const adminRoute = require("./routers/admin.router");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ limit: "1gb", extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const server = require('http').createServer(app);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.get("/", async (req, res) => {
  res.send("testing test");
});

const PORT = 3000;

server.listen(PORT,  host="0.0.0.0", () => {
  console.log(`Server running.... on port ${PORT}`);
});