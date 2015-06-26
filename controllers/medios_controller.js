var Complejo = require('../controllers/complejo.js');
  
  	exports.load = function(req,res,next,medioId){
  		
  		req.indice = medioId;

  		next();

  	};

		
	exports.calcular = function(req,res,next){
  		var medios = req.session.medios;
  		console.log(medios);
  		res.render('lista',{medios:medios});
	};
        
  
  	exports.dibujar = function(req,res,next){
  	
		var medios = req.session.medios;
		console.log("hey " +medios);
  		res.render('draw',{medios:medios});


  	};


  	exports.add = function(req,res,next){
  		var medio = {};
  		medio.orden = req.session.medios.length+1;
  		medio.er=1;
  		medio.mur=1;
  		medio.grosor=10;
  	
  		res.render('form',{medio:medio});
  	}

  	exports.edit = function(req,res,next){
  		var medio = {};
  		medio.orden = parseFloat(req.indice);
  		medio.er=parseFloat(req.session.medios[medio.orden].er);
  		medio.mur=parseFloat(req.session.medios[medio.orden].mur);
  		medio.grosor=parseFloat(req.session.medios[medio.orden].grosor);
  	
  		res.render('edit',{medio:medio});
  	}

  	exports.new = function(req,res,next){
  		
  		var medios = req.session.medios;
  		var medio = {};
  		console.log(req.body)

  		console.log(req.body.orden)
  			medio.orden = parseFloat(req.body.orden-1);
  			medio.grosor = parseFloat(req.body.grosor);
  			medio.er = parseFloat(req.body.er);
  			medio.mur = parseFloat(req.body.mur);


  		medios.splice(medio.orden, 0, medio);
  		next();
  	}

  	exports.update = function(req,res,next){
  		
  		var medios = req.session.medios;
  		var medio = {};
  		console.log(req.body)

  		console.log(req.body.orden)
  			medio.orden = parseFloat(req.body.orden);
  			medio.grosor = parseFloat(req.body.grosor);
  			medio.er = parseFloat(req.body.er);
  			medio.mur = parseFloat(req.body.mur);


  		medios[medio.orden]=medio;
  		next();
  	}

  	exports.delete = function(req,res,next){
  		
  		var medios = req.session.medios;


  		medios.splice(req.indice, 1);
  		next();

  	}