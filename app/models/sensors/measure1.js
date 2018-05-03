module.exports = {
    
    name: 'measure1',
    
    value: 0.0,
    unit: "mm",
    
    lowerLimit: -10.0,
    upperLimit: 10.0,
    precision: 0.1,
    
    ranges: [
        {
            min: -10.0,
            max: -7.0,
            color: '#FF7700'
        },
        {
            min: -7.0,
            max: 7.0,
            color: '#8DCA2F'
        },
        {
            min: 7.0,
            max: 10.0,
            color: '#FF7700'
        }
    ],
	
	put: function(newValue, callback) {
        console.log("PUT TODO sensor(" + newValue + "): CHECK");
        this.value = newValue;
		callback(false);            // no error
    }

}

