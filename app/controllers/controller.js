

const db = require('../config/db.config.js');
const Libros = db.Libros;

exports.create = (req, res) => {
    let libro = {};

    try{
        // Construir el objeto Libro desde el cuerpo de la solicitud
        libro.codigolibro = req.body.codigolibro;
        libro.nombre = req.body.nombre;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.paisautor = req.body.paisautor;
        libro.numeropaginas = req.body.numeropaginas;
        libro.aniopublicacion = req.body.aniopublicacion;
        libro.anioedicion = req.body.anioedicion;
        libro.precio = req.body.precio;

        // Guardar en la base de datos MySQL
        Libros.create(libro).then(result => {    
            // Enviar mensaje de carga al cliente
            res.status(200).json({
                message: "Libro creado con éxito con id = " + result.codigolibro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
}

exports.retrieveAllBooks = (req, res) => {
    // Encontrar toda la información de los libros
    Libros.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "¡Se obtuvieron con éxito todos los libros!",
                libros: libroInfos
            });
        })
        .catch(error => {
            // Log en consola
            console.log(error);

            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
}

exports.getBookById = (req, res) => {
    // Obtener la información del libro por ID
    let libroId = req.params.codigolibro;
    Libros.findByPk(libroId)
        .then(libro => {
            if (libro) {
                res.status(200).json({
                    message: "Se obtuvo con éxito un libro con id = " + libroId,
                    libro: libro
                });
            } else {
                res.status(404).json({
                    message: "No se encontró un libro con id = " + libroId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            // Log en consola
            console.log(error);

            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.codigolibro;
        let libro = await Libros.findByPk(libroId);
    
        if (!libro) {
            // Devolver respuesta al cliente
            res.status(404).json({
                message: "No se encontró un libro para actualizar con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {
            // Actualizar los cambios en la base de datos
            let updatedObject = {
                nombre: req.body.nombre,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                paisautor: req.body.paisautor,
                numeropaginas: req.body.numeropaginas,
                aniopublicacion: req.body.aniopublicacion,
                anioedicion: req.body.anioedicion,
                precio: req.body.precio
            }
            let result = await Libros.update(updatedObject, {returning: true, where: {codigolibro: libroId}});
            
            // Devolver respuesta al cliente
            if (result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el libro con id = " + libroId,
                    error: "No se pudo actualizar",
                });
            } else {
                res.status(200).json({
                    message: "Se actualizó con éxito un libro con id = " + libroId,
                    libro: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el libro con id = " + req.params.codigolibro,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.codigolibro;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Se eliminó con éxito un libro con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el libro con id = " + req.params.codigolibro,
            error: error.message,
        });
    }
}
