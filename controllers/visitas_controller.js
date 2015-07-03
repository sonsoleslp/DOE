var models = require('../models/models.js');




exports.nuevavisita = function(req,res,next,visita){
	var visitante = {};
	visitante.sesion = visita;
	var visit = models.Contador.build(visitante);
	visit.save({fields: ["sesion"]});


};

