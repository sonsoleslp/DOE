// Based on: http://www.html5canvastutorials.com/labs/html5-canvas-graphing-an-equation/
// For canvas text word-wrap check: http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
doe = function(){

  var medios = JSON.parse(document.getElementById("medios").innerHTML);
	document.getElementById("pruebas").innerHTML+=medios[0].moduloro;
  var totalmedios = 0;
  medios.forEach(function(medio){  totalmedios +=medio.grosor;  });
 
   var hhh = window.innerHeight-65;
   var wwh  = window.innerWidth;

  impedancia = function(eta){
    var coc = 1;
    var eta0 =  376.99111843077515;
    console.log(eta.toFixed(2))
      if(eta.toFixed(2) == 376.99) { 
        return 'η₀';
      }
      else if (eta< 376.99) {
        coc = Math.round((eta0/eta) * 100) / 100;
        return 'η₀/'+ coc;
      }
      else {
        coc = Math.round((eta/eta0) * 100) / 100;
          return coc+'η₀' ;}
  }

  multiline = function(context,text,x,y){
    var lines = text.split("\n");
    var alto = 14;
    var ac = y;

    for(var i = 0; i<lines.length; i++){

      context.fillText(lines[i], x , ac);
      ac+=alto;
    }



  }
  

  function Graph(config) {

    // user defined properties
     //  $( "#myCanvas" ).style.width(600); $( "#myCanvas" ).height(600);

    this.canvas = document.getElementById(config.canvasId);
   	this.canvas.width  = window.innerWidth;
   	this.canvas.height = window.innerHeight-65;

    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;

    // constants
    this.axisColor = '#C0C0C0';
    this.font = '20pt "Monte"';
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
 //   this.drawTags();
  }
/*
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
*/

  Graph.prototype.drawDiv = function() {
    var coloreje = this.axisColor;
    var alto = this.canvas.height;
    var ancho = this.canvas.width;
    // console.log("ancho: "+ancho)
    var context = this.context;


    var posicion = 0;
    context.save();
    context.beginPath();
    medios.forEach(function(medio){
        // console.log("nummedios "+medios.length)
        posicion +=medio.grosor/totalmedios*ancho;
        // console.log("pos:"+posicion)
        context.moveTo(posicion, 0);
        context.lineTo(posicion, alto);
        // console.log(this.centerX)
        context.strokeStyle = coloreje;
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

    for(var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) { context.lineTo(x, equation(x)); }
       

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
  };

  Graph.prototype.drawTags = function() {
    var context = this.context;

    var coloreje = this.axisColor;
    var alto = this.canvas.height;
    var ancho = this.canvas.width;
    var acum = 0;

    
    context.save();
    context.beginPath();

    
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    medios.forEach(function(medio){
        acum +=medio.grosor/2/totalmedios*ancho;
        // console.log("nummedios "+medios.length)
        // console.log("pos:"+posicion)
        context.moveTo(acum, 0);
         if(window.innerWidth > 950 ) {context.font = '16px "Monte"';} else {context.font = '12px "Monte"';}
        context.fillText(impedancia(medio.eta), acum , 30);
         if(window.innerWidth > 950 ) {context.font = '14px "Monte"';} else {context.font = '10px "Monte"';}
        context.fillText((medio.grosor)+' mm', acum , alto-30);
        // console.log(this.centerX)
        context.strokeStyle = coloreje;
        context.lineWidth = 2;
        context.stroke();
        acum +=medio.grosor/2/totalmedios*ancho;
    });

    
    if (medios.length >1){
      var i = 0;
      var div = medios[0].grosor/totalmedios*ancho;
      for(i = 0; i<medios.length-1; i++){
        var medio = medios[i];
         context.moveTo(div, 0);

         if(window.innerWidth > 950 ) {context.font = '14px "Monte"';} else {context.font = '10px "Monte"';}
        var ro  = complejox(medio.moduloro, medio.fasei)
        var uno = complejo(1,0);
        var imped =  'Z = \n'+ (imprimir( multiplicacion( complejo(medio.eta,0), division(suma(uno,ro), resta(uno,ro)) ))) +'\n\u2126' ;
        multiline(context, imped, div , alto/4-12);
         if(window.innerWidth > 950 ) {context.font = '16px "Monte"';} else {context.font = '10px "Monte"';} 
        context.fillText('|ρ| = '+ medio.moduloro , div , 3*alto/4-12);
        context.fillText('φ\u2080 = '+ Math.round((medio.fasei) * 100) / 100 , div , 3*alto/4+2); 

        context.font = '32px Sans-serif';
        context.fillText('\u21b3' , div , 3*alto/4-35);
        context.fillText('\u21b3' , div , alto/4-35);
        // console.log(this.centerX)
        context.strokeStyle = coloreje;
        context.lineWidth = 2;
        context.stroke();
        div += medios[i+1].grosor/totalmedios*ancho;
      }

    }
 
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
    minX: 0,
    minY: -10,
    maxX: totalmedios,
    maxY: 10,
    unitsPerTick: 1});
  

  recorrer = function(x){

      var m = 0;
      var acum = 0;
      var mult  = 1
      var j = 1;
      for( m= 0; m<medios.length-1; m++){
          if (acum < x && x < acum + medios[m].grosor ){

            break;}  
          acum+= medios[m].grosor;
      }   
      var ind = parseInt(m);
      mult  = Math.sqrt(medios[ind].eta * 2 / (2 *medios[0].eta) / (1 - medios[ind].moduloro * medios[ind].moduloro)* (1 - medios[0].moduloro* medios[0].moduloro));;

  
     
      return 10*mult*Math.sqrt(1+medios[ind].moduloro*medios[ind].moduloro + 2*Math.abs(medios[ind].moduloro)*Math.cos(2*2*Math.PI/medios[ind].lambda*(x-acum - medios[ind].grosor)  - medios[ind].fasei))-11; }
  


  myGraph.drawEquation(function(x) {return recorrer(x)}, '#05E28E', 4.5);
  myGraph.drawTags();
  console.log("DOE done")


}
 

 