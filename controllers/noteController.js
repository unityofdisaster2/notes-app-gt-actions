const Nota = require('../models/noteModel');

const getNotes = async(_, res) => {
    // obtener todos los registros de la coleccion notas
    const notas = await Nota.find({});
    res.json({
        notas
    });
}

const createNote = async(req, res) => {
    const { titulo, informacion, nombreCreador, fecha } = req.body;

    try{
        // validar que usuario ya existe, pero despues
        // asignar parametros que seran guardados en la base
        const nota = new Nota({titulo, informacion, nombreCreador, fecha});

        await nota.save();

        //se envia estructura de la nota como respuesta
        res.json({
            nota
        });
    } catch(error) {
        res.status(500).json({
            errorMsg: 'no ha sido posible crear la nota'
        });
    }
}

const updateNote = async(req, res) => {
    const noteID = req.params.id;

    try {
        const { titulo, informacion, nombreCreador, fecha } = req.body;
        console.log(req.body);
        console.log(noteID);
        // se verifica que el id ingresado sea valido
        const nota = await Nota.findById(noteID);
        
        if(!nota) {
            return res.status(400).json({
                errorMsg: 'no existe nota'
            });
        }
        
        
        // se agrega el parametro new: true para que la funcion retorne el contenido
        // del nuevo registro
        const notaActualizada = await Nota.findByIdAndUpdate(noteID, 
            { titulo, informacion, nombreCreador, fecha }, 
            { new: true}, );
        
        console.log(notaActualizada)

        res.json({
            notaActualizada
        });

    } catch(error) {
        res.status(500).json({
            errorMsg: 'no ha sido posible actualizar la nota'
        });
    }
}

const deleteNote = async(req, res) => {
    const noteID = req.params.id;

    try{
        // se verifica que exista el usuario que se pretende elimina
        const nota = await Nota.findById( noteID );
        if(!nota) {
            return res.status(404).json({
                errorMsg: 'No existe nota'
            });
        }


        await Nota.findOneAndDelete( noteID); 

        res.json({
            msg: `nota eliminada`
        })

    }catch(error) {
        res.status(500).json({
            errorMsg: 'No se pudo eliminar el registro'
        });
    }
}

const cleanup = async (_, res) => {
    try {
        await Nota.remove({});
        res.json({
            msg: 'notas eliminadas'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorMsg: 'no fue posible eliminar registros'
        })
    }
}


module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    cleanup
}