const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.menuPath = '/api/menu';
        this.pedidosPath = '/api/pedidos';

        //Conectar con Base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares();

        //Función para las rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Leer lo que envía el usuario por el cuerpo de la petición
        this.app.use(express.json());

        //Definir la carpeta pública
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.menuPath, require('../routes/menu'));
        this.app.use(this.pedidosPath, require('../routes/pedidos'));
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Server online port: ', this.port);
        })
    }
}

module.exports = Server;