  "use strict";

const path = require("path");
const express = require("express");
const render = require("./pageFormattor");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.resolve("style")));

app.get("*", function(req, res) {
  render(req, res);
});

app.listen(app.get("port"));

console.log(`The app is now listening on port ${app.get("port")}`);