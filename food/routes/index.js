var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var path = require("./mongodb.path");
/* GET home page. */
router.get('/', function(req, res, next) {
	mongo.connect(path,(err, db)=>{
		if(db){
			var arrHot = [];
			db.collection("drinks").find().sort({"Ngày":-1}).limit(2).toArray((err,drink)=>{
				db.collection("drinks").find().toArray((err,drinks)=>{
					db.collection("seafood").find().toArray((err,seafoods)=>{
						db.collection("breads").find().sort({"Ngày":-1}).limit(2).toArray((err,bread)=>{
							db.collection("fruits").find().sort({"Ngày":-1}).limit(2).toArray((err,fruits)=>{
								db.collection("meat").find().sort({"Ngày":-1}).limit(2).toArray((err,meat)=>{
									db.collection("chicken").find().sort({"Ngày":-1}).limit(2).toArray((err,chicken)=>{
										db.collection("seafood").find().sort({"Ngày":-1}).limit(2).toArray((err,seafood)=>{
  											db.close()
											if(!err){
												arrHot = drink.concat(bread).concat(fruits).concat(meat).concat(chicken).concat(seafood);
												res.render("index",{hot:arrHot, drinks:drinks, seafood:seafoods})
											}else{
												res.render("error",{ message:"error",error:{status:404,stack:"Error database"}})
											}
										})
									})
								})
							})
						})
					})
				})
			})
		}else{
			res.render("error")
		}
	})
});

module.exports = router;