const {Schema, model} = require('mongoose');


const NoteSchema = Schema({
    titulo: {
        type: String,
        required: true,
        maxLength: 30,
        
    },
    informacion: {
        type: String,
        required: true,
        maxLength: 100
    },
    nombreCreador: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },

});

// configuracion global del esquema
NoteSchema.method('toJSON', function() {

    // se extraen valores omisibles del modelo cada que se obtenga
    // la respuesta de una consulta
    const {__v, _id, ...object} = this.toObject();

    // se redefine id para quitar el guion bajo
    object.id = _id;
    return object;
});

module.exports = model('Note', NoteSchema);