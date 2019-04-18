var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const pathMongodb = require("./mongodb.path.js");
const fs = require('fs')

/* GET home page. */
router.post('/:produce', function(req, res, next) {
	mongo.connect(pathMongodb,(err,db)=>{
		db.collection(req.params.produce).findOne({_id:ObjectId(req.body._id)},(err,result)=>{
			db.collection(req.params.produce).deleteOne({_id:ObjectId(req.body._id)},(err,re)=>{
				db.close()
				if(!err){
					fs.unlink(`public/${result.image.split("./").join("")}`,(err)=>{
						if(!err){
							res.send(`/admin-set/${req.params.produce}`)
						}
					})
				}else{
					res.render("error")
				}
			})
		})
	})
});

module.exports = router;
