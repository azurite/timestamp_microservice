var express = require("express");
var app = express();

app.get("/", (req, res) => {
    res.sendFile("client/index.html", { root: __dirname });
    
});

app.listen(8080, () => {
    console.log("App listening on port 8080");
});