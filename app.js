var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  crypto = require('crypto');

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

// eas: just want to use express with routes hooking
// straight into functions.
//require('./config/express')(app, config);

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,accept,x-requested-with,x-withio-delay');
    next();
});


db.once('open', function callback () {
    console.log("Database connection open");
    var signupSchema = mongoose.Schema({
        email: String,
        referredBy: String,
        referralCode: String
    });

    var Signup = mongoose.model('Signup', signupSchema);

    app.post('/', function(req, res){ 

        crypto.randomBytes(16, function(ex, buf) {
            if (ex) throw ex;

            var referralCode = [];
            for (var i = 0; i < buf.length; i++) {
                var charCode = String.fromCharCode((buf[i] % 26) + 65);
                referralCode.push(charCode);
            };

            console.log(req.body.referredBy);
            var s = new Signup({
                email: req.body.email, 
                referredBy: req.body.referredBy,
                referralCode: referralCode.join("")
            });

            console.log(s);
            s.save(function(err,dbEntry){
                if(err){
                    console.error(err);
                }

                var result = {};
                result.referralCode = dbEntry.referralCode;
                res.send(result);
            });
        });


    });

    app.get('/health', function(req, res){ 
                var result = {};
                res.send(result);
    });

    console.log("routing health");
    app.get('/health', function(req, res){

        res.send({status: "ok"});
    });
});
app.listen(config.port);

