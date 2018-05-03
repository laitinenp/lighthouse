readvalue = function( searchname ) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";	
	var resultvalue = null;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("lighthouse");
		dbo.collection("sensors").findOne( {name:searchname}, function(err, doc) {
			if (err) throw err;
			resultvalue = doc.value;
			db.close();
		});
	});
	return resultvalue;
}

exports.put = function( /*name,*/ newvalue ) {
	this.value = newvalue;
	var name = this.name;
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";	
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("lighthouse");
		var newvalues = { $set: {value: newvalue } };
		dbo.collection("sensors").updateOne( {name:searchname}, newvalues, function(err, doc) {
			if (err) throw err;
			console.log(name + "value " + newvalue + "updated");
			dbo.collection("sensordatalog").insert({name:name, timestamp:new Date(), value:newvalue});
			db.close();
		});	
	});
}

module.exports = function( measurername, createdtimestamp ) {
	return {
		name: measurername,
		created : createdtimestamp,
		value: 0, //readvalue(measurername),
		unit: "mm",
		lowerLimit: -50.0,
		upperLimit: 50.0,
		precision: 0.1,    
		ranges: [
			{min: -50.0, max: -25.0, color: '#FF7700'},
			{min: -25.0, max: 25.0, color: '#8DCA2F'},
			{min: 25.0, max: 50.0, color: '#FF7700'}
		],	
		/*
		put: function(newValue, callback) {
			console.log("PUT TODO sensor(" + newValue + "): CHECK");
			this.value = newValue;
			storevalue(this.name, this.value);
			callback(false);            // no error
		}*/
	}
}

