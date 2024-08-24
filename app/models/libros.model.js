
module.exports = (sequelize, Sequelize) => {
	const Libros = sequelize.define('libros', {	
	  codigolibro: {
			type: Sequelize.INTEGER,
			primaryKey: true
    },
	nombre: {
		    type: Sequelize.STRING
      },
    editorial: {
            type: Sequelize.STRING
      },
	autor: {
		    type: Sequelize.STRING
      },
    genero: {
            type: Sequelize.STRING
      },
	paisautor: {
		    type: Sequelize.STRING
      },
	numeropaginas: {
		    type: Sequelize.INTEGER
      },
    aniopublicacion: {
            type: Sequelize.DATE
      },
    anioedicion: {
		    type: Sequelize.INTEGER
	},
	precio: {
		    type: Sequelize.DECIMAL(10,2)
      }	

	});
	
	return Libros;
}