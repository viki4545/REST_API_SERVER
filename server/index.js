const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const crudRouter = require("./routes/crudRoutes");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

// connection to mongodb
connectDB();

app.use(
  cors({
    origin: process.env.CORS_DOMAIN,
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", crudRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
