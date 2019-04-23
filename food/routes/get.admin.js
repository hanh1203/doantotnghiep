var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");
/* GET home page. */
router.get('/', function(req, res, next) {
	mongo.connect(pathMongodb,(err, db)=>{
		var querytotal = [{
		    $group: {
		        _id: '',
		        total: { $sum: '$total' },
		        qty: { $sum: '$qty' }
		    }
		 }, {
		    $project: {
		        _id: 0,
		        total: '$total',
		        qty: '$qty'
		    }
		}]
		db.collection("payment").aggregate(querytotal).toArray((err,totalRevenue)=>{
			db.collection("emailGuest").count((err,count)=>{
				db.collection("drinks").count((err,drinks)=>{
					db.collection("breads").count((err,breads)=>{
						db.collection("fruits").count((err,fruits)=>{
							db.collection("meat").count((err,meat)=>{
								db.collection("chicken").count((err,chicken)=>{
									db.collection("seafood").count((err,seafood)=>{
										db.close()
										if(!err){
											var countProduct = {
												"drinks"	: drinks,
												"breads"	: breads,
												"fruits"	: fruits,
												"meat"	    : meat,
												"chicken"	: chicken,
												"seafood"	: seafood,
												"total" 	: drinks+breads+fruits+meat+chicken+seafood
											}
							  				res.render('admin',{totalRevenue:totalRevenue[0], email: count, count:countProduct});
										}else{
											res.render("error",{ message:"error",error:{status:404,stack:"Not found in database"}})
										}
									})
								})
							})
						})
					})
				})
			})
		})
	})
});

module.exports = router;
