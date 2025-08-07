//incio de la app
//el ultimo archivo en crear porque se importa el modelo, rutas, controladores, etc
//se condigura express, mongodb, etc
//Y se lanza el servidor

import express from 'express';
import {connectDB} from './config/dbconfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs'
import path from 'path'; //agregado
import { fileURLToPath } from 'url';//agregado
import methodOverride from 'method-override';//agreagdo

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar __dirname para ES Modules-agregado
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir la carpeta img como estática (agrego para la imagen de fondo)
app.use('/img', express.static(path.join(__dirname, 'img')));

//middleware para leer formularios (?_method)
app.use(express.urlencoded({ extended: true })); // para formularios HTML
app.use(methodOverride('_method')); // para permitir PUT/DELETE desde formularios
app.use(express.json()); // Middleware para parsear JSON

// Configurar EJS - agregado
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //asegura de que la carpeta views exista



// Conexión a MongoDB
connectDB();

//configuracion de rutas
app.use('/api',superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}/api/heroes`);
});