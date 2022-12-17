const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

//Store keys
dotenv.config();

//Connect to MongoDB
mongoose.connect(process.env.mongoEndpoint, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

//Listen to data change
app.listen(8000, () => {
  console.log("Server is running");
});
