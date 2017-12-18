var express = require("express");
var handlebars = require('express-handlebars');
var app = express();

var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json());

var crypto = require('crypto');

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/enc/:str", function(req, res){
	
	const cipher = crypto.createCipher('aes192', 'qweasd123');

	let encrypted = cipher.update(req.params.str, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	console.log(encrypted);

	res.send(encrypted)

})

app.get("/", function(req, res){
	res.render("index");
})

app.get("/dec/:str?", function(req, res){
	const decipher = crypto.createDecipher('aes192', 'qweasd123');
	var data =decipher.update(req.params.str, "hex", "utf8")
	res.send(data+=decipher.final('utf8'));
})

app.listen(8080, function(){
	console.log("Server is listening on port: 8080!");
})