module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Contador',
		{
			sesion:{
			type: DataTypes.STRING
			
		}

	});

};

