import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

async function startServer() {
    var app = express();
    var dbUrl = "mongodb+srv://dbUser:cisco@cluster0.ikzxtnh.mongodb.net/"
    
    await mongoose.connect(dbUrl);
    var Mensaje = mongoose.model("Mensaje",{ nombre : String, mensaje: String})
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}))
    
    
    app.get('/obtener-mensajes', (req, res) => {
        Mensaje.find({},(err, mensajes)=> {
            res.send(mensajes);
        })
    })
    
    app.post('/guardar-mensajes', (req, res) => {
        var mensaje = new Mensaje(req.body);
        mensaje.save((err) =>{
            if(err)
                sendStatus(500);
            res.sendStatus(200);
        })
    })
    
    
    
    
    var servidor = app.listen(3002, () => {
        console.log("el servidor se está ejecutando en el puerto ", servidor.address().port);
    });
}

startServer();