// load modules
const bone = require('bonescript');

// initialize the relay port as output
//bone.pinMode( relayid, bone.OUTPUT );

module.exports = {
    
    name: 'Relay 4',

    portId: "P9_14",
    
    value: false,

    
    get: function(callback) {
        this.value = false
        callback(this.value)
    },
    
    put: function(newValue, callback) {
        console.log("PUT TODO Relay4(" + newValue + "): Finish the relay control code and hardware here!!!");
        this.value = newValue;
	var state;
	if (this.value == true) state = bone.HIGH;
	else state = bone.LOW;
	bone.digitalWrite( this.portId, state );
        callback(false);            // no error
    }

}

bone.pinMode( "P9_14", bone.OUTPUT )

