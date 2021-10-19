// Importaciones
const express = require('express')
const app = express()
var morgan = require('morgan')
var cors = require('cors')
const mongoose = require('mongoose');
const apiRouter = require('./routes')

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Conexion bd
mongoose.Promise = global.Promise; 
// const urlDB = 'mongodb://localhost:27017/psicotool';
const urlDB = 'mongodb+srv://jaurrea:O4ashUqQNLm0hMw5@cluster0.c7ujm.mongodb.net/psicotool?retryWrites=true&w=majority';
mongoose.connect(urlDB)
.then(mongoose => console.log("DB conectada a MongoDB Atlas"))
.catch(err => console.log(err))

// Manejador de rutas
app.use('/api', apiRouter); 

// Ejecucion del server
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
console.log('Running on port '+ app.get('puerto'));
});