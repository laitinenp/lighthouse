// database connection definitions
const MongoClient = require('mongodb').MongoClient
const dburl = "mongodb://localhost:27017/"
const url = require('url')
const isodate = require('isodate')
const Json2csvParser = require('json2csv').Parser;

module.exports = function(app) {
	
	// create connection to db
	MongoClient.connect(dburl, function(err, client) {
		if (err) throw err
		app.db = client.db("lighthouse")
	})

    app.get('/api/sensors', function (req, res) {
		app.db.collection("sensors").find({}).toArray(function(err, sensors) {
			if (err)
				res.status(500).send("Error in /api/sensors GET operation")
			else
				res.json(sensors)
		})
    })
    
    app.get('/api/sensors/:sensorid', function (req, res) {
		app.db.collection("sensors").find({name:req.params.sensorid}).toArray(function(err, sensorrecord) {
			if (err)
				res.status(500).send("Error in /api/sensors GET operation")
			else
				res.json(sensorrecord)
		})
    })

	// update the sensor record and insert data log record
    app.put('/api/sensors/:sensorid', function (req, res) {
		var query = { name : req.params.sensorid } 
		var newvalues = { $set : { value : req.body.value } }
		var logobj = {
			name : req.params.sensorid,
			value : req.body.value,
			timestamp : new Date()
		}
		app.db.collection("sensors").updateOne( query, newvalues,
			function(err, r) {
			if (err)
				res.status(500).send("Error in /api/sensors/id PUT operation")
			else {
				app.db.collection("sensordatalog").insertOne(logobj, function(err, r) {
					if (err)
						res.status(500).send("Error in /api/sensors/id PUT operation")
					else
						res.status(200).send("Updated succesfully.")
				})
			}
		})
    })
	
	app.get('/api/reports/sensor', function (req, res) {
		var query = { }
		if ( req.query.from && req.query.to ) {
			var queryfrom = isodate(req.query.from)
			var queryto = isodate(req.query.to)
			console.log("query from to " + queryfrom)
			query = { "timestamp" : { "$gte": queryfrom, "$lte": queryto } }
		} else if ( req.query.from ) {
			var queryfrom = req.query.from
			console.log("query from")
			query = { "timestamp" : { "$gte": queryfrom } }
		} else if ( req.query.to ) { // no query parameters
			console.log("query")
			query = { "timestamp" : { "$lte": queryto } }
		}
		app.db.collection("sensordatalog").find(query).toArray(function(err, sensorrecord) {
			if (err)
				res.status(500).send("Error in /api/reports/sensor GET operation")
			else {
				var csv
				try {
					const fields = ['_id', 'name', 'value', 'timestamp'];
					const opts = { fields };
					const csvparser = new Json2csvParser(opts);
					csv = csvparser.parse(sensorrecord);
					res.status(200).send(csv)
				} catch (err) {
					res.status(500).send("Error in /api/reports/sensor GET operation")
				}
			}
		})
    })

	app.get('/api/reports/sensor/:sensorid', function (req, res) {
		app.db.collection("sensordatalog").find({name:req.params.sensorid}).toArray(function(err, sensorrecord) {
			if (err)
				res.status(500).send("Error in /api/sensors GET operation")
			else
				res.json(sensorrecord)
		})
    })
    
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};;