var express = require("express");
var app = express();

app.use("/", express.static(__dirname + "/public"));

app.get("/:id", function(req, res) {
  let fileName = `${__dirname}/public/html/${req.params.id}.html`;
  res.sendFile( fileName );
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
