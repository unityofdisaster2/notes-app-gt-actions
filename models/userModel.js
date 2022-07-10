const {Schema, model} = require('mongoose');


const UserSchema = Schema({
    nombre: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true
    }
});

// configuracion global del esquema
UserSchema.method('toJSON', function() {

    // se extraen valores omisibles del modelo cada que se obtenga
    // la respuesta de una consulta
    const {__v, _id, ...object} = this.toObject();

    // se redefine id para quitar el guion bajo
    object.id = _id;
    return object;
});

module.exports = model('User', UserSchema);