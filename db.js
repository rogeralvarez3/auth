const mysql = require("mysql");

var cn;
function conectar() {
  cn = mysql.createConnection({
    host: "192.168.1.66",
    user: "root",
    password: "root@",
    port: "3312",
    database: "usuarios",
  });
  cn.on("error", (err) => {
    console.log(err);
    conectar();
  });
}
conectar();

function list(data, resolve) {
  var campos="*"
  if(data.campos){campos=data.campos}
  var sql = `select ${campos} from ${data.tabla}`;
  if (data.condición) {
    sql = `${sql} where ${data.condición}`;
  }
  cn.query(sql, (err, rows) => {
    if (err) {
      resolve(err);
    } else {
      resolve(rows);
    }
  });
}

function save(data, resolve) {
  var campos = [],
    valores = [],
    camposYvalores = [];
    let condición="";
    if(data.condición){
      condición=` where ${data.condición}`
    }
  Object.keys(data.data).forEach((k) => {
    if (k.toLowerCase() != "id") {
      let valor = `'${data.data[k]}'`;
      if(valor=='\'null\''){valor='Null'}
      campos.push(`\`${k}\``);
      valores.push(valor);
      camposYvalores.push(`\`${k}\`=${valor}`);
    }
  });
  var sql = `insert into ${data.tabla}(${campos.join(
    ","
  )}) values(${valores.join(",")})`;
  if(data.condición){
    sql = `update ${data.tabla} set ${camposYvalores}${condición}`;
  }
  if (data.data.id > 0) {
    sql = `update ${data.tabla} set ${camposYvalores} where id=${data.data.id}`;
  }
  cn.query(sql, (err, rows) => {
    if (err) {
      resolve(err);
    } else {
      resolve(rows);
    }
  });
}

function remove(data, resolve) {
  var sql = `delete from ${data.tabla} where ${data.condición}`;
  cn.query(sql, (err, rows) => {
    if (err) {
      resolve(err);
    } else {
      resolve(rows);
    }
  });
}
module.exports = { list, save, delete: remove };
