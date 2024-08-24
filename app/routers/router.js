
let express = require('express');
let router = express.Router();
 
const Libros = require('../controllers/controller.js');

router.post('/api/libros/crear', Libros.create);
router.get('/api/libros/all', Libros.retrieveAllBooks);
router.get('/api/libros/xid/:id',Libros.getBookById);
router.put('/api/libros/update/:id',Libros.updateById);
router.delete('/api/libros/delete/:id',Libros.deleteById);

module.exports = router;
