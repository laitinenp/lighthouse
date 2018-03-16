module.exports = {
    
    name: 'outerTemperature',
    
    value: 12,
    unit: "C",
    
    lowerLimit: -40,
    upperLimit: 40,
    precision: 1,
    
    ranges: [
        {
            min: -40,
            max: 0,
            color: '#DEDEDE'
        },
        {
            min: 0,
            max: 20,
            color: '#8DCA2F'
        },
        {
            min: 20,
            max: 40,
            color: '#FF7700'
        }
    ],
    
    frequency: 10000,        // in milliseconds. 6000 = 60x100 = 1 minute
    
    measure: function(callback) {
        this.value = Math.floor(Math.random() * 20) - 10
        callback(this.value)
    }

}

setInterval(function() {
    module.exports.measure(function(result) {
        console.log("MEASURE " + module.exports.name + ":" + result)
    })
}, module.exports.frequency)
