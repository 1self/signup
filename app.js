var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();
app.use(bodyParser.json());

//require('./config/express')(app, config);

db.once('open', function callback () {
    console.log("Database connection open");
    var signupSchema = mongoose.Schema({
        email: String,
        referrer: String
    })  

    var Signup = mongoose.model('Signup', signupSchema);

    app.post('/', function(req, res){ 
        var s = new Signup({
            email: req.body.email, 
            referrer: req.body.referrer
        });

        console.log(s);
        s.save(function(err,s){
            if(err){
                console.error(err);
            }

            res.send(s);
        })


    });

    app.get('/health', function(req, res){
        res.send({status: "ok"});
    });
});
app.listen(config.port);

