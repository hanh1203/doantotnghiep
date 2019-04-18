var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	mongo.connect(pathMongodb,(err, db)=>{
		var fullUrl = req.originalUrl.split("product-")[1];
		db.collection(fullUrl).find().toArray((err,result)=>{
			db.close()
			console.log(result);
  			res.render('product-drinks',{result:result});
		})
	})
});

module.exports = router;
