/*eslint no-console: 0*/
"use strict";

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening on port " + port);
});

var xsenv = require("@sap/xsenv");
var services = xsenv.getServices({
	hana: {
		tag: "hana"
	}
});

var hdbext = require("@sap/hdbext");
app.use("/", hdbext.middleware(services.hana));

app.get("/", function(req, res, next) {
	req.db.exec("SELECT COUNT(\"id\") AS COUNT FROM \"MD.Employee\"", function(err, rows) {
		if(err)	{
			return next(err);
		}
		res.send("Current employees: " + rows[0].COUNT);
	});
});