var measurer = require('./app/models/sensors/floormeas.js')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const sensors = [ 
	measurer('measure1',new Date(2018,2,26)),
	measurer('measure2',new Date(2018,2,26)),
	measurer('measure3',new Date(2018,2,26)),
	measurer('measure4',new Date(2018,2,26)),
	measurer('measure5',new Date(2018,2,26))
]

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("lighthouse");
  dbo.collection("sensors").insert( sensors, function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
