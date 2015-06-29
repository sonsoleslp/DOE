var express = require('express');
var router = express.Router();

var mediosController = require('../controllers/medios_controller');
var freqController = require('../controllers/freq_controller');
var diagrama = require('../controllers/diagrama');
/* GET home page. */
router.param('medioId',		mediosController.load);

router.get('/', function(req, res) {
  res.render('index', { title: 'DOE' });
});


router.get('/about', 	 function(req, res) {
  res.render('about', { title: 'DOE' });
});
router.get('/list', 	diagrama.diagrama, mediosController.calcular);
router.get('/draw',  	diagrama.diagrama, mediosController.dibujar);

router.post('/new', 	 mediosController.new, diagrama.diagrama, mediosController.calcular);
router.get('/add', 	 	 mediosController.add);
router.get('/edit/:medioId(\\d+)', 	 mediosController.edit);
router.post('/update', 	 mediosController.update, diagrama.diagrama, mediosController.calcular);
router.get('/remove/:medioId(\\d+)', 	 mediosController.delete, diagrama.diagrama, mediosController.calcular);

router.get('/freq', 	freqController.freq);
router.post('/freqchanged', 	freqController.freqchanged, diagrama.diagrama, mediosController.calcular);

module.exports = router;
