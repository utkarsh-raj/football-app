var express = require("express");
var app = express();
var request = require("request");
var ejs = require("ejs");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    var url = "http://worldcup.sfg.io/matches/today";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("home", {data: data});
        }
    });
});

app.get("/match", function(req, res) {
    var url = "http://worldcup.sfg.io/matches/current";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if (data.length === 0) {
                res.render("noMatch");
            }
            else {
                res.render("match", {data: data});
            }
        }
    });
});

app.get("/standing", function(req, res) {
    var url = "http://worldcup.sfg.io/teams/group_results";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("standing", {data: data});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The Football App has started!!!");
});