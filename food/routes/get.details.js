var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var path = require("./mongodb.path");
var validRoutes = require("./module-valid-routes-name.js");
var regex = new RegExp(`${validRoutes.toString().split(",").join("|")}`)
var ObjectId = require('mongodb').ObjectId;

/* GET home page. */
router.get('/:product', function(req, res, next) {
	if(req.params.product&&regex.test(req.params.product)&&req.query.is_pro&&/[a-f\d]{24}/.test(req.query.is_pro)){
		mongo.connect(path,(err,db)=>{
			if(!err){
				db.collection(req.params.product).findOne({_id:ObjectId(req.query.is_pro)},(err,result)=>{
					db.collection(req.params.product).find().sort({"Ngày":-1}).limit(12).toArray((err,hotNew)=>{
						db.collection(req.params.product).find().sort({"price":-1}).limit(12).toArray((err,goodPrice)=>{
							if(!err){
								res.render("details",{ result:result , hotNew:hotNew, goodPrice:goodPrice,origin:req.params.product})
							}else{
								res.render("error",{ message:"error",error:{status:404,stack:"Error database"}})
							}
						})
					})
				})
			}
		})
	}else{
		res.render("error",{ message:"error",error:{status:404,stack:"Error database"}})
	}
});

module.exports = router;