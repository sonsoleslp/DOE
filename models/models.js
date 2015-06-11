var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol  = (url[1]||null);
var dialect  = (url[1]||null);
var port  = (url[5]||null);
var host  = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');
var sequelize = new Sequelize(DB_name,user,pwd,
	{ dialect:protocol,
		protocol:protocol,
		port:port,
		host:host,
		storage:storage,
		omitNull:true
	});

//Importar definición de la tabla Medios
var medio_path = path.join(__dirname,'medios');
var Medio = sequelize.import(medio_path);



//los quizes pertenecen a un usuario registrado

// exportar tablas
exports.Medio = Medio;


sequelize.sync().then(function(){
	Medio.count().then(function(count){
	
	if(count===0){console.log('aqui');
	Medio.bulkCreate(
		[ {grosor: 50, mur:1, er: 1, orden: 1},
		  {grosor: 12.5, mur:1, er: 4, orden: 2},
		  {grosor: 50, mur:1, er: 1, orden: 3},
		]
		

		).then(function(){
			
			console.log('Base de datos(tabla medios) inicializada');
		
		});
	};
});

});
