
const Usuario = require('../models/userModel');

const getUsers = async(req, res) => {

    // obtener todos los registros de la coleccion usuarios
    const usuarios = await Usuario.find({});
    res.json({
        usuarios
    });
}

const createUser = async(req, res) => {
    
    const { nombre } = req.body;
    console.log(req.body);
    try{
        // validar que usuario ya existe, pero despues
        // asignar parametros que seran guardados en la base
        const usuario = new Usuario({nombre});
        console.log(usuario);
        await usuario.save();

        res.json({
            usuario
        });
    } catch(error) {
        res.status(500).json({
            errorMsg: error
        });
    }
}

const updateUser = async(req, res) => {

    const userID = req.params.id;

    try {
        const nombre = req.body.nombre;

        // se verifica que el id ingresado sea valido
        const usuario = await Usuario.findById(userID);
        
        if(!usuario) {
            return res.status(400).json({
                errorMsg: 'no existe usuario'
            });
        }
        
        // se agrega el parametro new: true para que la funcion retorne el nuevo registro
        // que se ha agregado
        const usuarioActualizado = await Usuario.findByIdAndUpdate(userID, { nombre }, { new: true});

        res.json({
            usuarioActualizado
        });

    } catch(error) {
        res.status(500).json({
            errorMsg: error
        });
    }
}

const deleteUser = async(req, res) => {
    const userID = req.params.id;

    try{
        // se verifica que exista el usuario que se pretende elimina
        const usuario = await Usuario.findById( userID );
        if(!usuario) {
            return res.status(404).json({
                errorMsg: 'No existe el usuario'
            });
        }


        await Usuario.findOneAndDelete( userID); 

        res.json({
            msg: `usuario eliminado`
        })

    }catch(error) {
        res.status(500).json({
            errorMsg: 'No se pudo eliminar el registro'
        });
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}