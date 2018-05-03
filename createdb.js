var measurer = require('./app/models/sensors/floormeas.js')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const sensors = [ 
	measurer('sink1',new Date(2018,5,3)),
	measurer('sink2',new Date(2018,2,3))
]

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("lighthouse");
  var ss = dbo.collection("sensors");
  ss.remove({});
  ss.insert( sensors, function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
