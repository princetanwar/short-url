const express = require("express");
const mongoose = require("mongoose");
const apiRoute = require("./Routes/api");
const { dbURI } = require("./config/keys");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json()); // this parsh json that come with req.body
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

// database connection
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((con) => {
    app.listen(PORT, () => {
      console.log(`app listening on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// api route for short the url and get long url from short url
app.use("/api", apiRoute);
