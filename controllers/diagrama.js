var complejo = require('../controllers/complejo.js');


exports.diagrama = function(req,res,next){

		var freq = req.session.freq;
		var medios = req.session.medios;
		var numeromedios = medios.length;
		var moduloro = 0;

		medios.forEach(function(mm){
			mm.lambda = 1 / Math.sqrt(mm.er * mm.mur) * 300 / freq;
			mm.eta = 120*Math.PI	/ Math.sqrt(mm.er /mm.mur)
		});
		var m = medios[numeromedios-1];
		m.moduloro=moduloro.toFixed(2);
		
		var fasei = 0;
		m.fasei=fasei;
		var zvista = complejo.complejo(m.eta,0);
		console.log(complejo.imprimir(zvista))
		var zant = complejo.objeto(zvista);

		console.log("zant "+complejo.imprimir(zant))
		console.log("eta "+complejo.imprimir(complejo.complejo(m.eta,0)));
		var ro = complejo.division(      complejo.resta(zant  , complejo.complejo(m.eta, 0)   )        ,        complejo.suma(complejo.complejo(m.eta,0) , zant)         ); 
				console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa"+m.eta)

		console.log("rooo1  "+ complejo.imprimir(ro));
		var COE = 1;
		m.COE = COE.toFixed(2)
		console.log(m.grosor)
			

			console.log(" ro: " +  moduloro
					+ ",  coe: " + COE + ", zvista: " + complejo.imprimir(zvista)  + ", fraccion: "
					+ m.grosor / m.lambda );

		for (var i = numeromedios - 2; i >= 0; i--) {

			m = medios[i];
			
			m.eta = 120 * Math.PI  / Math.sqrt(m.er * m.mur);
			var beta = 2 * Math.PI /(m.lambda) ;
			var arg = beta * m.grosor;

			var num1 = complejo.complejo(0, 0);
			var num2 = complejo.complejo(0, 0);
			var den1 = complejo.complejo(0, 0);
			var den2 = complejo.complejo(0, 0);
			var factor = complejo.complejo(m.eta, 0);

			console.log("factor "+complejo.imprimir(factor));


		
			num1 = complejo.multiplicacion(zant,complejo.complejo(Math.cos(arg), 0));
			num2 = complejo.complejo(0, m.eta*Math.sin(arg));
			den1 = complejo.complejo(m.eta*Math.cos(arg), 0);
			den2 = complejo.multiplicacion(complejo.complejo(0,1),complejo.multiplicacion(zant,complejo.complejo(Math.sin(arg), 0)));
			zvista = complejo.division(complejo.multiplicacion(factor,complejo.suma(num1,num2)),complejo.suma(den1,den2));
			console.log("zv"+complejo.imprimir(zvista));
		    ro = complejo.division(      complejo.resta(zant, complejo.complejo(m.eta,0)   )        ,        complejo.suma(complejo.complejo(m.eta,0) , zant)         );
			console.log("roooooooooooo"+complejo.imprimir(ro));

			moduloro = complejo.modulo(ro);
			COE = (1 + moduloro) / (1 - moduloro);
			m.COE = COE.toFixed(2);
			m.moduloro = moduloro.toFixed(2)
			m.fasei = complejo.fase(ro);
			
			console.log(" ro: " +  moduloro
					+ ",  coe: " + COE + ", zvista: " + complejo.imprimir(zvista)  + ", fraccion: "
					+ m.grosor / m.lambda + ", fase inicial:  " + fasei);

			zant = complejo.objeto(zvista);

			
		}next();
	};

