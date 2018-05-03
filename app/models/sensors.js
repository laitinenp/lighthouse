// find all the sensor records from the mongo database 'lighthouse', table 'sensors'

// this module is based on the services provided by floormeas.js
var SensorClass = require('./sensors/floormeas.js');
exports.sensors = null;					// this is a static variable in this module

// create connection to db and read all sensors descriptors
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";	

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("lighthouse");
	dbo.collection("sensors").find({}).toArray(function(err, res) {
		if (err) throw err;
		exports.sensors = res;
		console.log("PUT:" + SensorClass.put);
		// attach put function afterwards to sensors objects since mongo cannot store js functions
		exports.sensors.forEach(function(item){console.log("I:" + item.name);item.put=SensorClass.put;console.log("P:" + item.put);});
		
		db.close();
	});
});

exports.find = function(callback) {
    callback(false, exports.sensors)
}

exports.findById = function( id, callback ) {
    for ( i = 0; i < exports.sensors.length ; i++ )
		if ( exports.sensors[i].name == id ) {
			callback(false, exports.sensors[i]);
			return
		}
	callback(true, null)
}
	
exports.put = function(id, value, callback) {
	console.log("LOG:" + id + value);
    exports.findById(id, function(err, item) {
        if (err) {
            console.log("ERROR: TODO");
            return;
        }
        
		console.log("ITEM: " + item.name + item.put);
        item.put(value, function(result) {
           callback(result)
        });
    });
};
