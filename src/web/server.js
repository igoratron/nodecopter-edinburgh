var express = require('express'),
    app = express(),
    runner = require("../runner");

app.use(express.static(__dirname));
app.listen(8000);
app.configure(function() {
    app.use(express.bodyParser()); // used to parse JSON object given in the request body
});
app.post("/points", function (req, res) {
    runner.run(req.body.data);
    res.send(200);
});


