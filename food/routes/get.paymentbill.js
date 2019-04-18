var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var path = require("./mongodb.path");

/* GET home page. */
router.get('/', function(req, res, next) {
	mongo.connect(path,(err, db)=>{
		db.collection("payment").find().toArray((err,result)=>{
			console.log(result, err)
  			res.render('admin-paymentBill',{result:result});
		})
	})
});

module.exports = router;
