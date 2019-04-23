var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
const pathMongodb = require("./mongodb.path.js");
const multer = require("multer")
var produceImage = require('./produce.image.js');
const storage = multer.diskStorage(produceImage)
const upload = multer( { storage: storage } );
/* GET home page. */
router.post('/:produce', upload.single('image_pro'),function(req, res, next) {
	mongo.connect(pathMongodb,(err,db)=>{
		req.body.image = req.file.path.split("public").join(".")
		for (var i = 0; i < Object.keys(req.body).length; i++) {
  			if(!(isNaN(Object.values(req.body)[i]))&&Object.keys(req.body)[i]!=="tel"){
  				req.body[`${Object.keys(req.body)[i]}`] = Number(Object.values(req.body)[i]);
  			}
  		}
		db.collection(req.params.produce).insertOne(req.body,(err,result)=>{
			db.close()
			if(!err){
				res.redirect(`/admin-set/${req.params.produce}`)
			}else{
				res.render("error")
			}
		})
	})
});

module.exports = router;
