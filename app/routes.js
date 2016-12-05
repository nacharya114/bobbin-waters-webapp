// Dependencies
var mongoose        = require('mongoose');
var User            = require('./model.js');
var mysql           = require("mysql");

var con = mysql.createConnection({
  host: "bobbindb.chwrjcnilfzs.us-west-2.rds.amazonaws.com",
  user: "root",
  password: "password",
  port: "3306",
  database: "bobbin"
});




// Opens App Routes
module.exports = function(app) {

    /* ------------------------------------------------
    User Table Endpoints
    --------------------------------------------------*/
    app.get("/userList", function(req, res) {
        con.query('SELECT * FROM userInfo',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    app.get("/getUser", function(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var obj = { status: false};
        con.query("SELECT * FROM userInfo WHERE username = ? and password = ?",
            [username, password], function(err, response){
            if (err)
                res.json(err);
            res.json(response);

        });
    });

    app.put("/addUser", function(req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var accountType = req.body.accountType;
        var values = "(" + firstName + "," + lastName + "," + username + "," + email + "," + password + "," + accountType + ")";
        con.query("INSERT INTO userInfo SET firstName = ?, lastName = ?, "
            + "username = ?, email = ?, password = ?, accountType = ?",
         [firstName, lastName, username, email, password, accountType], function(err, resp) {
            if (err) {
                console.log("Error " + err);
            }
            res.json(resp);
         });
    });

    app.put("/editUser", function(req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var accountType = req.body.accountType;
        var address = req.body.address;
        var title = req.body.title;
        con.query("UPDATE userInfo SET firstName = ?," +
            " lastName = ?, email = ?, password = ?, address = ?, " +
            "title = ?" +
            " WHERE " +
            "username = ?", [firstName, lastName, email, password, address,
            title, username], function(err, resp){
                if (err) {
                    res.json(resp);
                    console.log("Error");
                } else {
                    res.json(resp);
                    console.log("Success");
                }
        });
    });



    /* ------------------------------------------------
    Source Report Table Endpoints
    --------------------------------------------------*/
    app.get("/sourceReportList", function(req, res) {
        con.query('SELECT * FROM sourceReportInfo',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    app.get("/sourceReportCount", function(req, res) {
        con.query('SELECT COUNT(*) as rowcount FROM sourceReportInfo',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    app.put("/addSourceReport", function(req, res) {
        var date = req.body.date;
        var reportNumber = req.body.reportNumber;
        var username = req.body.username;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;
        var type = req.body.type;
        var condition = req.body.condition;
        con.query("INSERT INTO sourceReportInfo date = ?, reportNumber = ?, username = ?, "
            + "longitude = ?, latitude = ?, type = ?, cond = ?",
            [date, reportNumber, username, longitude, latitude, type, condition],
            function(err, resp) {
            if (err) {
                console.log("Error " + err);
            }
            res.json(resp);
         });
    });


    /* ------------------------------------------------
    Quality Table Endpoints
    --------------------------------------------------*/
    app.get("/qualityReportList", function(req, res) {
        con.query('SELECT * FROM qualityReportInfo',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    app.get("/qualityReportCount", function(req, res) {
        con.query('SELECT COUNT(*) as rowcount FROM qualityReportInfo',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    app.put("/addQualityReport", function(req, res) {
        var date = req.body.date;
        var reportNumber = req.body.reportNumber;
        var username = req.body.username;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;
        var condition = req.body.condition;
        var virus = req.body.virus;
        var chem = req.body.chem;
        con.query("INSERT INTO qualityReportInfo date = ?, reportNumber = ?, username = ?, "
            + "longitude = ?, latitude = ?, cond = ?, virus = ?, chem = ?",
            [date, reportNumber, username, longitude, latitude, condition, virus, chem],
            function(err, resp) {
            if (err) {
                console.log("Error");
            }
            res.json(resp);
         });
    });




    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err) {
                res.send(err);
            } else {
                // If no errors are found, it responds with a JSON of all users
                res.json(users);
            }
        });
    });



    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);

        // New User is saved in the db.
        newuser.save(function(err){
            if(err)
                res.send(err);
            else
                // If no errors are found, it responds with a JSON of the new user
                res.json(req.body);
        });
    });

    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/query/', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;
        var male            = req.body.male;
        var female          = req.body.female;
        var other           = req.body.other;
        var minAge          = req.body.minAge;
        var maxAge          = req.body.maxAge;
        var favLang         = req.body.favlang;
        var reqVerified     = req.body.reqVerified;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = User.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});

        }

        // ...include filter by Gender (all options)
        if(male || female || other){
            query.or([{ 'gender': male }, { 'gender': female }, {'gender': other}]);
        }

        // ...include filter by Min Age
        if(minAge){
            query = query.where('age').gte(minAge);
        }

        // ...include filter by Max Age
        if(maxAge){
            query = query.where('age').lte(maxAge);
        }

        // ...include filter by Favorite Language
        if(favLang){
            query = query.where('favlang').equals(favLang);
        }

        // ...include filter for HTML5 Verified Locations
        if(reqVerified){
            query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
        }

        // Execute Query and Return the Query Results
        query.exec(function(err, users){
            if(err)
                res.send(err);
            else
                // If no errors, respond with a JSON of all users that meet the criteria
                res.json(users);
        });
    });



    // DELETE Routes (Dev Only)
    // --------------------------------------------------------
    // Delete a User off the Map based on objID
    app.delete('/users/:objID', function(req, res){
        var objID = req.params.objID;
        var update = req.body;

        User.findByIdAndRemove(objID, update, function(err, user){
            if(err)
                res.send(err);
            else
                res.json(req.body);
        });
    });




};
