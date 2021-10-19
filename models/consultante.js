const mongoose = require('mongoose');
const {Schema} = mongoose;

var validateEmail = function(email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.toLocaleString(email)
};

const consultanteSchema = new Schema({
    nombre: {
        type: String,
        required:[true,'Nombre es obligatorio'],
        maxlength: 100
    },
    apellido: {
        type : String,
        required:[true,'Apellido es obligatorio']
    },
    telefono: {
        type : Number,
        required : true
    },
    direccion: {
        type : String,
        required : true
    },
    correo: {
        type : String,
        required : true,
        maxlength: 100,
        unique : true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// convertir a modelo
const Consultante = mongoose.model('consultante', consultanteSchema);
module.exports = Consultante;