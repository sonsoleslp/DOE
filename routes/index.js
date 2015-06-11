var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'DOE' });
});

router.get('/draw', function(req, res) {
  res.render('draw', { title: 'DOE' });
});

module.exports = router;
