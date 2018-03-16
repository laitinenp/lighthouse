module.exports = {
    
    name: 'innerTemperature',
    
    value: 22,
    unit: "C",
    
    lowerLimit: -20,
    upperLimit: 30,
    precision: 1,
    
    frequency: 10000,        // in milliseconds. 10000 = 100x100 = 1 minute
    
    ranges: [
        {
            min: -20,
            max: 0,
            color: '#DEDEDE'
        },
        {
            min: 0,
            max: 22,
            color: '#8DCA2F'
        },
        {
            min: 22,
            max: 30,
            color: '#FF7700'
        }
    ],
    
    measure: function(callback) {
        this.value = 19
        callback(this.value)
    }

}
        
setInterval(function() {
    module.exports.measure(function(result) {
        console.log("MEASURE " + module.exports.name + ":" + result)
    })
}, module.exports.frequency)