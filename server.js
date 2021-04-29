const express = require("express");
const app = express();
const port = 3000

app.use("/", express.static(__dirname + "/src"));

app.get("/:id", function(req, res) {
  const fileName = `${__dirname}/public/html/${req.params.id}.html`;
  res.sendFile( fileName );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})