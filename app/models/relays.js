module.exports = {
    
    relays : [
        require('./relays/led.js'),
        require('./relays/gardenlight.js'),
        require('./relays/relay1.js'),
        require('./relays/relay4.js')

    ],

    find: function(callback) {
        callback( false, this.relays)
    },
    
    findById: function( id, callback ) {
        this.find(function(err, cb0) {
            if (err) {
                console.log("Error in relays.js:find(id, callback)");
                return;
            }
            
            for (var i = 0; i < cb0.length; i++) {
                if (id==cb0[i].name) {
                    callback( false, cb0[i]);
                    return;
                }
            }
            callback(true,null);
        });
    } ,
    
    put: function(id, value, callback) {
        this.findById(id, function(err, item) {
            if (err) {
                console.log("ERROR: TODO");
                return;
            }
            
            item.put(value, function(result) {
                callback(result)
            });
        });
    }
    
}     // TODO
