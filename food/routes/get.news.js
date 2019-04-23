var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query, req.query.page)
	if(req.query.page&&!(isNaN(req.query.page))){
  		res.render(`newsPage${req.query.page}`)
	}else{
		res.render("news");
	}
});

module.exports = router;
