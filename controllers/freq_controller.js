  	exports.freq = function(req,res,next){
  		
  		var freq = req.session.freq;
  		console.log("Changing Frequency");
  		res.render('freq',{freq:freq});
  	}

  	exports.freqchanged = function(req,res,next){
  		
  		var freq = parseFloat(req.body.freq);
  		if(freq && freq!== NaN) {
  			req.session.freq=freq;
	  		console.log("Frequency changed");
	  		next();
	  		
  		} else {
	  		console.log("Error with Frequency");
	  		res.render('freq',{freq:req.session.freq});;

  		}
  	}