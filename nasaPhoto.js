var express = require("express");
var app = express();
var request = require("request");
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=mjP32sL34xt7O6DKA622Id0w0cdfsmbvhq8x5RK9";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/photo", function(req, res) {
	console.log("trying...");
	request(nasaUrl, function(error, response, body) {
		if (!error && response.statusCode == 200) {
	        var data = JSON.parse(body);
	        console.log(data);
	        var date = data["date"];
	        var explanation = data["explanation"];
	        var photoUrl = data["url"];
	        var photoTitle = data["title"];

			console.log(data);
			console.log("we are connected");
			res.render("nasaPhoto", 
				{   date: date, 
				    explanation: explanation, 
				    photoTitle: photoTitle, 
				    photoUrl: photoUrl
				});
	    } else if (error) {
	    	console.log("Error occured.");
	    	console.log(error);
	    }
	});
});

app.listen(5000, function() {
	console.log("app started");
});

//, {date: date, explanation: explanation, photoUrl: photoUrl, photoTitle: photoTitle}