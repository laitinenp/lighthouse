module.exports = {
    
    find: function(callback) {
        callback( false, [
            //require('./sensors/innertemp.js'),
            require('./sensors/lumen.js')//,
            //require('./sensors/outertemp.js')
        ])
    },
    
    findById: function( id, callback ) {
        this.find(function(e, cb0) {
            for (var i = 0; i < cb0.length; i++) {
                if (id==cb0[i].name)
                    callback( false, cb0[i]);
                    return;
            }
            callback(true,null)
        })
    }
}