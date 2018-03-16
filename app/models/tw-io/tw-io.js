// read Thingworx settings

const configData = require('./config.json', 'utf8')
const Client = require('node-rest-client').Client
const acceptArgs = { headers: {"Accept":"application/json"} }

var client = new Client(configData.auth);

exports.getProperty = function(thing, property, callback) {
	
	var url = configData.url + thing + '/Properties/' + property
	
	var result
	
	client.get( url, acceptArgs, function(data, response) {
		result = data.rows[0][property]
		callback(result)
	})
	.on('error', function(err) {
		console.log('something went wrong on the request ', err.request.options)
	})

}


exports.putProperty = function(thing, property, value, callback) {
	
	var url = configData.url + thing + '/Properties/' + property
	
	var args = configData.putargs
	args.data = {}
	args.data[property] = value
	
	client.put( url, args, function(data, response) {
		callback(response)
	})
	.on('error', function(err) {
		console.log('something went wrong on the request ', err.request.options)
	})

}

