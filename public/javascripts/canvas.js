      	var medios = JSON.parse(document.getElementById("medios").innerHTML);
      	document.getElementById("pruebas").innerHTML+=medios[0].moduloro;
  
      function Graph(config) {
        // user defined properties
      //  $( "#myCanvas" ).style.width(600); $( "#myCanvas" ).height(600);

        this.canvas = document.getElementById(config.canvasId);
		this.canvas.width  = window.innerWidth-20;
		this.canvas.height = window.innerHeight-65;

        this.minX = config.minX;
        this.minY = config.minY;
        this.maxX = config.maxX;
        this.maxY = config.maxY;
        this.unitsPerTick = config.unitsPerTick;

        // constants
        this.axisColor = '#aaa';
        this.font = '8pt "Monte"';
        this.tickSize = 20;

        // relationships
        this.context = this.canvas.getContext('2d');
        this.rangeX = this.maxX - this.minX;
        this.rangeY = this.maxY - this.minY;
        this.unitX = this.canvas.width / this.rangeX;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
        this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
        this.iteration = (this.maxX - this.minX) / 10000;
        this.scaleX = this.canvas.width / this.rangeX;
        this.scaleY = this.canvas.height / this.rangeY;

        // draw x and y axis
  //      this.drawXAxis();                         /* AQUÍ EJES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  //      this.drawYAxis();
  this.drawDiv();

      }

      Graph.prototype.drawXAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(0, this.centerY);
        context.lineTo(this.canvas.width, this.centerY);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 1.5;
        context.stroke();

        // draw tick marks
        var xPosIncrement = this.unitsPerTick * this.unitX;
        var xPos, unit;
        context.font = this.font;
        context.textAlign = 'center';
        context.textBaseline = 'top';

        // draw left tick marks
        xPos = this.centerX - xPosIncrement;
        unit = -1 * this.unitsPerTick;
        while(xPos > 0) {
          context.moveTo(xPos, this.centerY - this.tickSize / 2);
          context.lineTo(xPos, this.centerY + this.tickSize / 2);
          context.stroke();
          context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
          unit -= this.unitsPerTick;
          xPos = Math.round(xPos - xPosIncrement);
        }

        // draw right tick marks
        xPos = this.centerX + xPosIncrement;
        unit = this.unitsPerTick;
        while(xPos < this.canvas.width) {
          context.moveTo(xPos, this.centerY - this.tickSize / 2);
          context.lineTo(xPos, this.centerY + this.tickSize / 2);
          context.stroke();
          context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
          unit += this.unitsPerTick;
          xPos = Math.round(xPos + xPosIncrement);
        }
        context.restore();
      };

      Graph.prototype.drawYAxis = function() {
        var context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(this.centerX, 0);
        context.lineTo(this.centerX, this.canvas.height);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();

        // draw tick marks
        var yPosIncrement = this.unitsPerTick * this.unitY;
        var yPos, unit;
        context.font = this.font;
        context.textAlign = 'right';
        context.textBaseline = 'middle';

        // draw top tick marks
        yPos = this.centerY - yPosIncrement;
        unit = this.unitsPerTick;
        while(yPos > 0) {
          context.moveTo(this.centerX - this.tickSize / 2, yPos);
          context.lineTo(this.centerX + this.tickSize / 2, yPos);
          context.stroke();
          context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
          unit += this.unitsPerTick;
          yPos = Math.round(yPos - yPosIncrement);
        }

        // draw bottom tick marks
        yPos = this.centerY + yPosIncrement;
        unit = -1 * this.unitsPerTick;
        while(yPos < this.canvas.height) {
          context.moveTo(this.centerX - this.tickSize / 2, yPos);
          context.lineTo(this.centerX + this.tickSize / 2, yPos);
          context.stroke();
          context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
          unit -= this.unitsPerTick;
          yPos = Math.round(yPos + yPosIncrement);
        }
        context.restore();
      };


      Graph.prototype.drawDiv = function() {

        var alto = this.canvas.height;
        var ancho = this.canvas.width;
        console.log("ancho: "+ancho)
        var context = this.context;
        var totalmedios = 0;
         medios.forEach(function(medio){
           console.log("total medios antes" + totalmedios);
          totalmedios +=medio.grosor;
          console.log("grosor del medio" + medio.grosor);
           console.log("total medios despues" + totalmedios);
           console.log("////////////");        });

        var posicion = 0;
        context.save();
        context.beginPath();
        medios.forEach(function(medio){
          
          posicion +=medio.grosor/totalmedios*ancho;
          console.log("pos:"+posicion)
          context.moveTo(posicion, 0);
          context.lineTo(posicion, alto);
          console.log(this.centerX)
          context.strokeStyle = this.axisColor;
          context.lineWidth = 2;
          context.stroke();

        });


        // draw tick marks
        var yPosIncrement = this.unitsPerTick * this.unitY;
        var yPos, unit;
        context.font = this.font;
        context.textAlign = 'right';
        context.textBaseline = 'middle';

        // draw top tick marks

        context.restore();
      };

    


      Graph.prototype.drawEquation = function(equation, color, thickness) {
        var context = this.context;
        context.save();
        context.save();
        this.transformContext();

        context.beginPath();
        context.moveTo(this.minX, equation(this.minX));

        for(var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
          context.lineTo(x, equation(x));
        }

        context.restore();
        context.lineJoin = 'round';
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
      };

        Graph.prototype.drawEquation2 = function(equation, color, thickness, puntos) {
        var context = this.context;
        context.save();
        context.save();
        this.transformContext();

        context.beginPath();
        
          puntos.forEach(function(punto){
          context.lineTo(punto.x, punto.y);
        })

        context.restore();
        context.lineJoin = 'round';
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
      };

      Graph.prototype.transformContext = function() {
        var context = this.context;

        // move context to center of canvas
        this.context.translate(this.centerX, this.centerY);

        /*
         * stretch grid to fit the canvas window, and
         * invert the y scale so that that increments
         * as you move upwards
         */
        context.scale(this.scaleX, -this.scaleY);
      };
      var myGraph = new Graph({
        canvasId: 'myCanvas',
        minX: -10,
        minY: -10,
        maxX: 10,
        maxY: 10,
        unitsPerTick: 1
      });




  //  myGraph.drawDiv();
	   myGraph.drawEquation(function(x) {
	        return 10*Math.sqrt(1+medios[0].moduloro*medios[0].moduloro + 2*medios[0].moduloro*Math.cos(3*x))-7;
	      }, '#05E28E', 2.5);
   //  myGraph.drawEquation2(3, '#05E28E', 2.5);
    

      
 /*
       myGraph.drawEquation(function(x) {
        return 6* Math.sin(2*x);
      }, '#05E28E', 2.5);

     myGraph.drawEquation(function(x) {
        return x * x;
      }, 'blue', 2.5);

      myGraph.drawEquation(function(x) {
        return 1 * x;
      }, 'red', 2.5);*/



