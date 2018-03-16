
const bone = require('bonescript');

module.exports = {
    
    name: 'Illumination',
    
    value: 22,
    unit: "lux",
    
    lowerLimit: 0,
    upperLimit: 10000,
    precision: 10,
    
    frequency: 10000,        // in milliseconds. 10000 = 100x100 = 1 minute
    
    ranges: [
        {
            min: 0,
            max: 300,
            color: '#DEDEDE'
        },
        {
            min: 300,
            max: 8000,
            color: '#8DCA2F'
        },
        {
            min: 8000,
            max: 10000,
            color: '#FF7700'
        }
    ],
    
    measure: function(callback) {
        var val = bone.analogRead('P9_40');
	console.log(val);
        this.value = 5000*val;
        callback(this.value)
    }

}
        
setInterval(function() {
    module.exports.measure(function(result) {
        console.log("MEASURE " + module.exports.name + ":" + result)
    })
}, module.exports.frequency)

