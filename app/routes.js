const Sensors = require('./models/sensors');
const Relays = require('./models/relays');

function getSensors(res) {
    Sensors.find(function(err, sensors) {
        if (err) {
            res.status(500).send(err);
            return;
        }
            
        res.status(200).json(sensors);
    });
}
function getSensor(id, res) {
    Sensors.findById(id, function(err, sensor){
        if (err) {
            res.status(500).send(err);
            return;
        }
        
        res.status(200).json(sensor);
    });
}

function getRelays(res) {
    Relays.find(function(err, relays) {
        if (err) {
            res.status(500).send(err);
            return;
        }
            
        res.status(200).json(relays);
    });
}

function putRelayValue(id, value, res) {
    Relays.put(id, value, function(err) {
        if (err) {
            res.status(501).send("Error in relay put operation");
            return;
        }
        
        res.status(200).send("Updated succesfully.");

    })
}

module.exports = function(app) {
    app.get('/api/sensors', function (req, res) {
      getSensors(res)
    })
    
    app.get('/api/sensors/:sensorid', function (req, res) {
      getSensor(req.params.sensorid, res)
    })
    
    app.get('/api/relays', function (req, res) {
      getRelays(res)
    })
    
    app.get('/api/relays/:relayid', function (req, res) {
      getRelays(res)
    })
    
    app.put('/api/relays/:relayid', function (req, res) {
        var newValue = req.body.value;
        putRelayValue(req.params.relayid, newValue, res)
    })
    
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};