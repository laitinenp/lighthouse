// load modules
const bone = require('bonescript');

module.exports = {
    
    name: 'Relay 1',

    portId: "P9_12",
    
    value: false,
    
    get: function(callback) {
        this.value = false
        callback(this.value)
    },
    
    put: function(newValue, callback) {
        console.log("PUT TODO Relay1(" + newValue + "): Finish the relay control code and hardware here!!!");
        this.value = newValue;
	var state;
	if (this.value == true) state = bone.HIGH;
	else state = bone.LOW;
	bone.digitalWrite( this.portId, state );
        callback(false);            // no error
    }

}

bone.pinMode( "P9_12", bone.OUTPUT )

