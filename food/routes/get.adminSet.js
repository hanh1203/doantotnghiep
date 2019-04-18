var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");

/* GET home page. */
router.get('/:produce', function(req, res, next) {
	mongo.connect(pathMongodb,(err, db)=>{
		db.collection(req.params.produce).find().toArray((err,result)=>{
			db.close()
  			res.render('admin-set',{result:result});
		})
	})
});

module.exports = router;
