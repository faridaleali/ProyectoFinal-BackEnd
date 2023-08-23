const express = require('express');
const cors = require('cors');
const productsRouter = require("./routes/products")
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// 👇️ configure CORS
app.use(cors());

//Middleware
app.use(express.json())
app.use('/api', productsRouter);

// Rutas

app.get('/', (req, res) => {
	res.send('Bienvenido a mi API')
})

//MongoDB conection

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Te has conectado a la base de datos"))
	.catch((error) => console.log(error))


app.listen(port, () => console.log('El servidor esta funcionando en el puertso', port))