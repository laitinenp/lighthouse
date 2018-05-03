ss = require("./sensors.js")

ss.findById("measure2", function(err, sensor){
	console.log("OK" + sensor.name)
	sensor.put(1, function(err){
	console.log("done")
})
}
)

