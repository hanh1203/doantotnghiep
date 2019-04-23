var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var path = require("./mongodb.path");

/* GET home page. */
router.get('/', function(req, res, next) {
	mongo.connect(path,(err, db)=>{
		db.collection("payment").find().toArray((err,result)=>{
  			db.close()
			if(!err){
  				res.render('admin-paymentBill',{result:result});
			}else{
				res.render("error",{ message:"error",error:{status:404,stack:"Error database"}})
			}
		})
	})
});

module.exports = router;
