module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Medio',
		{
			grosor:{
				type: DataTypes.REAL,
				
		},
			mur:{
				type: DataTypes.REAL,
				defaultValue:0
		},
			er:{
				type: DataTypes.REAL,
				defaultValue:0
		},
			orden:{
				type: DataTypes.REAL
		}

	});
}
