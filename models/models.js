var path = require('path');
var visitasprincipio;
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

//Importar definición de la tabla de visitas
var cont_path = path.join(__dirname, 'contador');
var Contador = sequelize.import(cont_path);



//los quizes pertenecen a un usuario registrado

// exportar tablas

exports.Contador = Contador;
sequelize.sync().then(function(){
		Contador.count().then(function(count){
		visitasprincipio = count || 0;
		exports.visitasprincipio = visitasprincipio;
	});

});
