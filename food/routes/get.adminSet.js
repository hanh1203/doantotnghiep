var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");
var validRoutes = require("./module-valid-routes-name.js");
var regex = new RegExp(`${validRoutes.toString().split(",").join("|")}`)

/* GET home page. */
router.get('/:produce', function(req, res, next) {
	if(regex.test(req.params.produce)){
		mongo.connect(pathMongodb,(err, db)=>{
			db.collection(req.params.produce.toString()).find().toArray((err,result)=>{
				db.close()
				if(!err){
	  				res.render('admin-set',{result:result});
				}else{
					res.render("error",{ message:"error",error:{status:404,stack:"Not found in database"}})
				}
			})
		})
	}else{
		res.render("error",{ message:"error",error:{status:404,stack:"Not found in database"}})
	}
});

module.exports = router;
