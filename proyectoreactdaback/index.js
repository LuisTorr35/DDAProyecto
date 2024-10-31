const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YsoyRebelde01",
    database: "librohub",
})

db.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos: ", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

app.post("/register", (req, res) => {
    const DNI = req.body.DNI;
    const nombre = req.body.nombre;
    const contra = req.body.contra;

    db.query('INSERT INTO usuario (idus, nomb, pssw) VALUES (?, ?, ?)', [DNI, nombre, contra],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al registrar el usuario.");
            } else {
                res.send("Usuario Registrado con éxito!!!");
            }
        }
    );
});

app.post("/login", (req, res) => {
    const DNI = req.body.DNI;
    const contra = req.body.contra;

    db.query('SELECT * FROM usuario WHERE idus = ? AND pssw = ? ', [DNI, contra],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error en la base de datos.");
            }
            if (result.length > 0) {
                // Si hay un resultado, el usuario existe
                res.send("Login exitoso!");
            } else {
                // Si no hay resultados, las credenciales son incorrectas
                res.status(401).send("Credenciales incorrectas.");
                }
        }
    );
});

app.get("/getnombre", (req, res) => {
    const DNI = req.query.DNI; // Cambiado a req.query
    db.query('SELECT nomb FROM usuario WHERE idus = ?', [DNI], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error en la base de datos.");
        }
        res.send(result);
    });
});

app.get("/getlibros", (req, res) => {
    db.query('SELECT titl, auto, cate, stck, prec FROM libro WHERE stck > 0',
        (err, result) =>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    )
})

app.listen(3100,() =>{
    console.log("Corriendo en puerto 3100");
});
