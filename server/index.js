import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import apiRoutes from "./routes/api.js";
import uiRoutes from "./routes/ui.js";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 5001;

mongoose
  // the 3xMongoose options are deprecated now so I commented them out Jesse9/21
  .connect(process.env.DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("public"));

app.use(bodyParser.json());

app.use("/api", apiRoutes);
app.use("/ui", uiRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
