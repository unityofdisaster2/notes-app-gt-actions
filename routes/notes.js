const { Router } = require('express');

const { check } = require('express-validator')

const { createNote, getNotes, deleteNote, updateNote, cleanup } = require('../controllers/noteController');
const router = Router();


// se agregan las rutas y metodos correspondientes a cada operacion crud
// que se realizara con las notas

// en todas las operaciones se hace referencia a la raiz ya que la ruta
// completa se encuentra en el index y se completa al referencias este modulo

// ruta para obtener notas
router.get('/', getNotes);

// ruta para agregar notas
router.post('/', 
    [
        check('titulo').not().isEmpty(),
        check('informacion').not().isEmpty(),
        check('nombreCreador').not().isEmpty(),
        check('fecha').not().isEmpty(),
    ]
    ,createNote);

// ruta para modificar notas
router.put('/:id',
        [
            check('titulo').not().isEmpty(),
            check('informacion').not().isEmpty(),
            check('nombreCreador').not().isEmpty(),
            check('fecha').not().isEmpty(),
        ]
    ,updateNote);

// ruta para eliminar una nota
router.delete('/:id', deleteNote);

router.delete('/', cleanup);


module.exports = router;