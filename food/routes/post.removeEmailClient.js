var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const pathMongodb = require("./mongodb.path.js");

/* POST new real estate. */
router.post('/', function(req, res, next) {
	// if(req.user){
	function removeInCollection(nameColection) {
		if(req.body.id!==""&&/[a-f\d]{24}/.test(req.body.id)){
			mongo.connect(pathMongodb,(err, db)=>{
				assert.equal(null, err);
				db.collection(nameColection).deleteOne({_id:ObjectId(req.body.id)}, (err, result)=>{
					assert.equal(null, err);
					db.close();
					if(!err){
						res.send("success");
					}else{
						res.render("error",{ message:"error",error:{status:404,stack:"Error database"}})
					}
				})
			})
		}else{
			res.send("error")
		}
	}
	switch(req.headers.referer.split("http://localhost:3000/")[1]){
		case "paymentbill":
			removeInCollection("payment")
		break;
		case "email-guest":
			removeInCollection("emailGuest")
		break;
		default:
			res.send("error")
		break;
	}
	// }else{
	// 	res.redirect("/error")
	// }
});

module.exports = router;