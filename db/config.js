const mongoose = require('mongoose');

// se llama al metodo config para cargar el contenido del archivo .env en las variables
// de entorno
require('dotenv').config();

const dbConnection = async() => {

    try {
        // se toma cadena de conexion de las variables de entorno
        await mongoose.connect(process.env.CONN_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    } catch (error){
        throw new Error('Error al intentar conectar a la base de datos');
    }



}


module.exports = {
    dbConnection
}