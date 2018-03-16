// load modules
const bone = require('bonescript');

// initialize the relay port as output

module.exports = {
    
    name: 'Led light 1',

    portId: "P9_11",
    
    value: false,

    get: function(callback) {
        this.value = false
        callback(this.value)
    },
    
    put: function(newValue, callback) {
        console.log("PUT TODO GardenLight(" + newValue + "): Finish the relay control code and hardware here!!!");
        this.value = newValue;
	var state;
	if (this.value == true) state = bone.HIGH;
	else state = bone.LOW;
	bone.digitalWrite( this.portId, state );
        callback(false);            // no error
    }

}

bone.pinMode( "P9_11", bone.OUTPUT ); 

