const { Router } = require('express');
const { check }  = require('express-validator');
const { createUser, deleteUser, getUsers, updateUser } = require('../controllers/userController');
const router = Router();


// se agregan las rutas y metodos correspondientes a cada operacion crud
// que se realizara con las usuario

// en todas las operaciones se hace referencia a la raiz ya que la ruta
// completa se encuentra en el index y se completa al referencias este modulo

// ruta para obtener usuarios
router.get('/', getUsers);

// ruta para agregar usuario
router.post('/',

    [
        check('nombre').not().isEmpty()
    ]
,createUser);

// ruta para modificar usuario
router.put('/:id', 
    [
        check('nombre').not().isEmpty()
    ]
,updateUser);

// ruta para eliminar un usuario
router.delete('/:id', deleteUser);


module.exports = router;