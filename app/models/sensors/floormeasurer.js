readvalue = function( name ) {
	var mysql = require('mysql');
	var resultvalue = null;
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "lighthouse"
	});
	con.connect(function(err) {
		if (err) throw err;
		var sql = "select max(date), value from measure where name='"+name+"'";
		console.log(sql);
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			resultvalue = result[0].value;
			console.log(resultvalue);
		});
	});
	return resultvalue;
}

storevalue = function( name, value ) {
	var mysql = require('mysql');
	var resultvalue = null;
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "lighthouse"
	});
	con.connect(function(err) {
		if (err) throw err;
		var sql = "INSERT INTO measure (name, value) VALUES ( ?, ? )";
		console.log(sql);
		con.query(sql, [name, value], function (err, result) {
			if (err) throw err;
			console.log("INSERTED: " + result.affectedRows);
		});
	});	
}

module.exports = function( measurername, createdtimestamp ) {
	return {
		name: measurername,
		created : createdtimestamp,
		value: readvalue(measurername),
		unit: "mm",
		lowerLimit: -10.0,
		upperLimit: 10.0,
		precision: 0.1,    
		ranges: [
			{min: -10.0, max: -7.0, color: '#FF7700'},
			{min: -7.0, max: 7.0, color: '#8DCA2F'},
			{min: 7.0, max: 10.0, color: '#FF7700'}
		],
	
		put: function(newValue, callback) {
			console.log("PUT TODO sensor(" + newValue + "): CHECK");
			this.value = newValue;
			storevalue(this.name, this.value);
			callback(false);            // no error
		}
	}
}

