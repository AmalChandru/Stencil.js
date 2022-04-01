const express = require("express");
const fs = require("fs");

const app = express();

//template engine
app.engine("ntl", function (filepath, options, callback) {
  fs.readFile(filepath, function (err, content) {
    if (err) return callback(err);
    var rendered = content
      .toString()
      .replace("#title#", "<title>" + options.title + "</title>")
      .replace("#message#", "<h1>" + options.message + "</h1>");
    return callback(null, rendered);
  });
});

// specify the views directory
app.set("views", "./views");
// register the template engine
app.set("view engine", "ntl");

app.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

app.listen(3000);
