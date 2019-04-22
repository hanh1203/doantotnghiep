var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var validRoutes = require("./module-valid-routes-name.js");
const pathMongodb = require("./mongodb.path.js");
var regex = new RegExp(`${validRoutes.toString().split(",").join("|")}`)

/* GET home page. */
router.get('/:params', function(req, res, next) {
	if(regex.test(req.params.params.split("product-")[req.params.params.split("product-").length-1])){
		mongo.connect(pathMongodb,(err, db)=>{
			var fullUrl = req.params.params.split("product-")[req.params.params.split("product-").length-1];
			db.collection(fullUrl).find().toArray((err,result)=>{
				db.close()
				if(!err&&result.length>0){
	  				res.render('product-food',{result:result, type:fullUrl});
				}else{
					res.render("error",{ message:"error",error:{status:404,stack:"Not found in database"}})
				}
			})
		})
	}
});

module.exports = router;
