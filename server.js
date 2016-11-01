var express = require("express");
var app = express();

var zeroFill = function(n) {
    return n < 10 ? "0" + n : n;
};

var parseDate = function(d) {
    if(typeof d !== "string") {
        return false;
    }
    if(!isNaN(Number(d)) && (new Date(Number(d))).toString() !== "Invalid Date") {
        return new Date(Number(d));
    }
    if((new Date(d)).toString() !== "Invalid Date") {
        return new Date(d);
    }
    return false;
};

var format = function(d) {
    var months = ["January", "February", "March", "Apirl", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[d.getMonth()] + " " + zeroFill(d.getDate()) + ", " + d.getFullYear();
};

app.get("/", (req, res) => {
    res.sendFile("client/index.html", { root: __dirname });
});

app.get("/:date", (req, res) => {
    var date = parseDate(req.params.date);
    
    if(date) {
        res.json({
            unix: date.getTime(),
            natural: format(date)
        });
    }
    else {
        res.json({ error: "Invalid date parameter" });
    }
});

app.use((req, res) => {
    res.status(404);
    res.json({ status: 404, message: "This isn't the page you are looking for" });
});

var listener = app.listen(process.env.PORT || 8080, () => {
    console.log("App listening on port: ", listener.address().port);
});