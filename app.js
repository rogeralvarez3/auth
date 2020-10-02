const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const fetch = require("node-fetch")
const utils = require("./utils");
const jwt = require("jsonwebtoken");
const db = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.post("/login", (req, res) => {
  var data = req.body;
  data.tabla = "usuarios";
  data.campos = "*";
  data.condición = `nombre = '${data.name}' or correo = '${data.mail}'`;
  db.list(data, (r) => {
    //console.log(r)
    if (r.errno) {
      res.send({ err: "error del servidor" });
    } else {
      if (r.length === 0) {
        res.send({ err: "no se encontró usuario registrado con ese correo" });
      } else {
        r = r[0];
        let passOk = bcrypt.compareSync(data.password, r.pass);
        if (passOk) {
          let myToken = jwt.sign(
            { id: r.id, name: r.name, mail: r.correo },
            "CoopefacsaSign"
          );
          r.token = myToken;
          delete r.pass;
          delete r.requestCode;
          db.list({tabla:'mis_permisos',condición:`id_cargo=${r.cargo}`},(permisos=>{
            r.permisos=permisos
            res.send(r);
          }))
          
        } else {
          res.send({ err: "contraseña incorrecta" });
        }
      }
    }
  });
});
app.post("/save", (req, res) => {
  var data = req.body;
  db.save(data,r=>{
    res.send(r)
  })
});

app.post("/verify", (req, res) => {
  var data = req.body;
  jwt.verify(data.token, "CoopefacsaSign", (err, decoded) => {
    if (!err) {
      res.send(decoded);
    } else {
      res.send({ err: err });
    }
  });
});
app.post("/requestPass", (req, res) => {
  var data = req.body;
  let enlace = require("randomatic")('Aa0', 20)
  //console.log(enlace)
  db.save({ tabla: 'usuarios', data: { requestCode: enlace }, condición: `correo='${data.mail}'` }, dbresp => {
    //console.log(dbresp)
    if (dbresp.err) {
      res.send({ icon: 'error', title: 'Error', text: 'Hubo un error al solicitar contraseña. Contacte al administrador del sistema' })
    } else {
      if (dbresp.affectedRows) {
        if (dbresp.affectedRows > 0) {
          utils.sendMail({ mail: data.mail, param: enlace }, (r) => {
            setTimeout(() => {
              db.save({ tabla: 'usuarios', data: { requestCode: null }, condición: `correo='${data.mail}'` })
            }, 600000)
            res.send({ icon: "success", html: "Favor revise su <a href='https://coopefacsa.coop/webmail' target='blank'>correo</a> y haga click en el enlace que se le envió.", title: "Solicitud enviada" })
          })
        } else {
          res.send({ icon: 'error', title: 'Error al solicitar contraseña', text: 'La dirección de correo es incorrecta o no existe.' })
        }

      } else {
        res.send({ icon: 'error', title: 'Error', text: 'Correo no válido' })
      }
    }
  })


})
app.post("/resetPass", (req, res) => {
  let data = req.body
  data.tabla = 'usuarios'
  data.condición = `requestCode='${data.param}'`
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(data.password, salt);
  data.data = { requestCode: null, pass: hash }
  db.save(data, (r2) => {
    if (!r2.errorno) {
      if (r2.affectedRows > 0) {
        res.send({
          icon: 'success',
          title: 'Cambio de contraseña exitoso',
          html: `Se ha cambiado la contraseña correctamente. Si quiere iniciar sesión haga click <a href='http://coopefacsa.coop:3100'>aquí</a>`
        })
      } else {
        res.send({ icon: 'error', title: 'Acceso denegado', text: 'Este enlace para cambio de contraseña ha caducado' })
      }
    } else {
      console.log(r2)
      res.send({ icon: 'error', title: 'Error', text: 'Hubo un error al cambiar contraseña. Contacte al administrador del sistema.' })
    }


  })
})
app.post("/getData",(req,res)=>{
  let data = req.body
  db.list({tabla:data.tabla},r=>{
    if(data.tabla=='usuarios'){
      r.forEach(fila=>{delete fila.pass;delete fila.requestCode})
    }
    res.send(r)
  })
})
app.post("/delete",(req,res)=>{
  let data = req.body
  db.delete(data,r=>{
    res.send(r)
  })
})
let port = process.env.port || 3100;

let server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
