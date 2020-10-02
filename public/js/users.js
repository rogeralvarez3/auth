var mv = new Vue({
    el: "#app",
    data: {
        filter: '',
        selected: {},
        noImageUser: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTMgNTMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUzIDUzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBzdHlsZT0iZmlsbDojRTdFQ0VEOyIgZD0iTTE4LjYxMyw0MS41NTJsLTcuOTA3LDQuMzEzYy0wLjQ2NCwwLjI1My0wLjg4MSwwLjU2NC0xLjI2OSwwLjkwM0MxNC4wNDcsNTAuNjU1LDE5Ljk5OCw1MywyNi41LDUzDQoJYzYuNDU0LDAsMTIuMzY3LTIuMzEsMTYuOTY0LTYuMTQ0Yy0wLjQyNC0wLjM1OC0wLjg4NC0wLjY4LTEuMzk0LTAuOTM0bC04LjQ2Ny00LjIzM2MtMS4wOTQtMC41NDctMS43ODUtMS42NjUtMS43ODUtMi44ODh2LTMuMzIyDQoJYzAuMjM4LTAuMjcxLDAuNTEtMC42MTksMC44MDEtMS4wM2MxLjE1NC0xLjYzLDIuMDI3LTMuNDIzLDIuNjMyLTUuMzA0YzEuMDg2LTAuMzM1LDEuODg2LTEuMzM4LDEuODg2LTIuNTN2LTMuNTQ2DQoJYzAtMC43OC0wLjM0Ny0xLjQ3Ny0wLjg4Ni0xLjk2NXYtNS4xMjZjMCwwLDEuMDUzLTcuOTc3LTkuNzUtNy45NzdzLTkuNzUsNy45NzctOS43NSw3Ljk3N3Y1LjEyNg0KCWMtMC41NCwwLjQ4OC0wLjg4NiwxLjE4NS0wLjg4NiwxLjk2NXYzLjU0NmMwLDAuOTM0LDAuNDkxLDEuNzU2LDEuMjI2LDIuMjMxYzAuODg2LDMuODU3LDMuMjA2LDYuNjMzLDMuMjA2LDYuNjMzdjMuMjQNCglDMjAuMjk2LDM5Ljg5OSwxOS42NSw0MC45ODYsMTguNjEzLDQxLjU1MnoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiM1NTYwODA7IiBkPSJNMjYuOTUzLDAuMDA0QzEyLjMyLTAuMjQ2LDAuMjU0LDExLjQxNCwwLjAwNCwyNi4wNDdDLTAuMTM4LDM0LjM0NCwzLjU2LDQxLjgwMSw5LjQ0OCw0Ni43Ng0KCQljMC4zODUtMC4zMzYsMC43OTgtMC42NDQsMS4yNTctMC44OTRsNy45MDctNC4zMTNjMS4wMzctMC41NjYsMS42ODMtMS42NTMsMS42ODMtMi44MzV2LTMuMjRjMCwwLTIuMzIxLTIuNzc2LTMuMjA2LTYuNjMzDQoJCWMtMC43MzQtMC40NzUtMS4yMjYtMS4yOTYtMS4yMjYtMi4yMzF2LTMuNTQ2YzAtMC43OCwwLjM0Ny0xLjQ3NywwLjg4Ni0xLjk2NXYtNS4xMjZjMCwwLTEuMDUzLTcuOTc3LDkuNzUtNy45NzcNCgkJczkuNzUsNy45NzcsOS43NSw3Ljk3N3Y1LjEyNmMwLjU0LDAuNDg4LDAuODg2LDEuMTg1LDAuODg2LDEuOTY1djMuNTQ2YzAsMS4xOTItMC44LDIuMTk1LTEuODg2LDIuNTMNCgkJYy0wLjYwNSwxLjg4MS0xLjQ3OCwzLjY3NC0yLjYzMiw1LjMwNGMtMC4yOTEsMC40MTEtMC41NjMsMC43NTktMC44MDEsMS4wM1YzOC44YzAsMS4yMjMsMC42OTEsMi4zNDIsMS43ODUsMi44ODhsOC40NjcsNC4yMzMNCgkJYzAuNTA4LDAuMjU0LDAuOTY3LDAuNTc1LDEuMzksMC45MzJjNS43MS00Ljc2Miw5LjM5OS0xMS44ODIsOS41MzYtMTkuOUM1My4yNDYsMTIuMzIsNDEuNTg3LDAuMjU0LDI2Ljk1MywwLjAwNHoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K',
        tablas: {
            usuarios: [],
            sucursales: [],
            cargos: [],
            departamentos: [],
            módulos: [],
            mis_permisos: [],
            funciones: []
        },
        activeTab: null,
        dlgProfiles: false,
        selectedProfile: 0,
        buscarCargo: '',
        dlgNewMod: false,
        dlgNewFunc: false,
        newMod: '',
        newFunc: { módulo: 0, nombre: '' },
        loading: false,
        dlgNewProfile:false,
        newProfile:''
    },
    methods: {
        getData: function (tabla) {
            let mv = this;
            mv.loading = true
            if (tabla) {
                let data = JSON.stringify({
                    tabla: tabla
                })
                fetch("http://coopefacsa.coop:3100/getData", { body: data, headers: { "content-type": "application/json" }, method: "post" })
                    .then(json => { return json.json(); })
                    .then(r => {
                        mv.loading = false
                        if (r.errorno) { console.log(r); return }
                        mv.tablas[tabla] = r
                    })
            } else {
                Object.keys(mv.tablas).forEach(tabla => {
                    let data = JSON.stringify({
                        tabla: tabla
                    })
                    fetch("http://coopefacsa.coop:3100/getData", { body: data, headers: { "content-type": "application/json" }, method: "post" })
                        .then(json => { return json.json(); })
                        .then(r => {
                            mv.loading = false
                            if (r.errorno) { console.log(r); return }
                            mv.tablas[tabla] = r
                        })
                })
            }
        },
        saveUser: function () {
            let mv = this;
            mv.loading = true
            let data = JSON.stringify({
                tabla: 'usuarios',
                data: mv.selected
            })
            fetch("http://coopefacsa.coop:3100/save", { body: data, method: 'post', headers: { 'content-type': 'application/json' } })
                .then(json => { return json.json() })
                .then(r => { console.log(r); mv.loading = false; if (!r.errorno) { mv.getData('usuarios') } })
        },
        guardarMod: function () {
            let mv = this;
            mv.loading = true
            let data = JSON.stringify({
                tabla: 'módulos',
                data: { nombre: mv.newMod }
            })
            fetch("http://coopefacsa.coop:3100/save", { body: data, method: 'post', headers: { 'content-type': 'application/json' } })
                .then(json => { return json.json() })
                .then(r => { console.log(r); mv.loading = false; if (!r.errorno) { mv.tablas.módulos.push({ id: r.insertId, nombre: mv.newMod }); mv.dlgNewMod = false } })
        },
        guardarFunc: function () {
            let mv = this;
            mv.loading = true
            mv.newFunc.módulo = mv.tablas.módulos[mv.activeTab].id
            let data = JSON.stringify({
                tabla: 'funciones',
                data: mv.newFunc
            })
            fetch("http://coopefacsa.coop:3100/save", { body: data, method: 'post', headers: { 'content-type': 'application/json' } })
                .then(json => { return json.json() })
                .then(r => { console.log(r); mv.loading = false; if (!r.errorno) { mv.getData('funciones'); mv.dlgNewFunc = false } })
        },
        guardarCargo: function () {
            let mv = this;
            mv.loading = true
            let data = JSON.stringify({
                tabla: 'cargos',
                data: {descripción:mv.newProfile}
            })
            fetch("http://coopefacsa.coop:3100/save", { body: data, method: 'post', headers: { 'content-type': 'application/json' } })
                .then(json => { return json.json() })
                .then(r => { console.log(r); mv.loading = false; if (!r.errorno) { mv.getData('cargos'); mv.dlgNewProfile = false } })
        },
        quitarFunción: function (función) {
            let mv = this;
            Swal.fire({
                icon: 'question',
                title: `Se borrará la función '${función.nombre}'`,
                html: '<span style=\'color:red\'>¿Está seguro de borrar este registro?</span><br><span>Al borrarlo ya no le aparecerá a ningún usuario que use los sistemas.</span>',
                showCancelButton: true,
                confirmButtonText: 'Borrar',
                confirmButtonColor: 'red'
            }).then(res => {
                if (res.value) {
                    mv.loading = true
                    let data = JSON.stringify({
                        tabla: 'funciones',
                        condición: `id=${función.id}`
                    })
                    fetch("http://coopefacsa.coop:3100/delete", { body: data, method: 'post', headers: { 'content-type': 'application/json' } })
                        .then(json => { return json.json() })
                        .then(r => { console.log(r); mv.loading = false; if (!r.errorno) { mv.getData('funciones'); } })
                }
            })

        },
        quitarCargo: function (cargo) {
            let mv = this;
            Swal.fire({
                icon: 'question',
                title: `Se borrará el cargo '${cargo.descripción}'`,
                html: '<span style=\'color:red\'>¿Está seguro de borrar este registro?</span><br><span>Al borrarlo también se borrarán los usuarios que pertenezcan a éste.</span>',
                showCancelButton: true,
                confirmButtonText: 'Borrar',
                confirmButtonColor: 'red'
            }).then(res => {
                if (res.value) {
                    mv.loading = true
                    let data = JSON.stringify({
                        tabla: 'cargos',
                        condición: `id=${cargo.id}`
                    })
                    fetch("http://coopefacsa.coop:3100/delete", { body: data, method: 'post', headers: { 'content-type': 'application/json' } })
                        .then(json => { return json.json() })
                        .then(r => { console.log(r); mv.loading = false; if (!r.errorno) { mv.getData('cargos'); } })
                }
            })
        },
        quitarMódulo: function (id) {
            let mv = this;
            mv.loading = true
            let data = JSON.stringify({
                tabla: 'módulos',
                condición: `id=${id}`
            })
            fetch("http://coopefacsa.coop:3100/delete", { body: data, method: 'post', headers: { 'content-type': 'application/json' } })
                .then(json => { return json.json() })
                .then(r => { console.log(r); mv.loading = false; if (!r.errorno) { mv.getData('módulos'); } })
        },
        tryDeleteMod: function (mod) {
            let mv = this
            Swal.fire({
                showConfirmButton: true,
                showCancelButton: true,
                title: `Se borrará el módulo '${mod.nombre}'`,
                html: '<span style="color:red">¿Está seguro de continuar?</span><br><span>Si borra este módulo se borrarán también todas las funciones que pertenezan a éste.</span>',
                icon: 'warning',
                confirmButtonText: 'Borrar',
                confirmButtonColor: 'red'
            }).then(resp => {
                if (resp.value) {
                    mv.quitarMódulo(mod.id)
                }
            })
        },
        guardarPermiso: function (fn) {
            let mv = this
            let nuevo = mv.tablas.mis_permisos.findIndex(item => { return item.id_función == fn.id }) < 0
            console.log('es nuevo:', nuevo)
            if (nuevo) {
                mv.loading = true
                fn.módulo = mv.tablas.módulos[mv.activeTab].id
                let data = JSON.stringify({
                    tabla: 'permisos',
                    data: {
                        cargo:mv.selectedProfile,
                        función:fn.id
                    }
                })
                fetch("http://coopefacsa.coop:3100/save", { body: data, method: 'post', headers: { 'content-type': 'application/json' } })
                    .then(json => { return json.json() })
                    .then(resp => {
                        mv.loading = false
                        console.log(resp)
                        if (!resp.errorno) {
                            mv.getData('mis_permisos')
                        }
                    })
            } else {
                mv.loading = true
                data = JSON.stringify({
                    tabla: 'permisos',
                    condición: `cargo=${mv.selectedProfile} and función=${fn.id}`
                })
                fetch("http://coopefacsa.coop:3100/delete", { body: data, method: 'post', headers: { 'content-type': 'application/json' } })
                    .then(json => { return json.json() })
                    .then(resp => {
                        mv.loading = false
                        console.log(resp)
                        if (!resp.errorno) {
                            mv.getData('mis_permisos')
                        }
                    })
            }
        }
    },
    computed: {
        users: function () {
            let mv = this
            let result = mv.tablas.usuarios.filter(item => {
                return item.nombre.toString().toLowerCase().indexOf(mv.filter.toString().toLowerCase()) >= 0
            })
            result.length > 0 ? mv.selected = Object.assign({}, result[0]) : mv.selected = {}
            return result
        },
        jefes: function () {
            let mv = this
            if (mv.selected.id > 0) {
                return mv.tablas.usuarios.filter(u => {
                    return u.id != mv.selected.id
                })
            } else { return [] }
        },
        listaCargos: function () {
            let mv = this
            let result = mv.tablas.cargos.filter(item => { return item.descripción.toString().toLowerCase().indexOf(mv.buscarCargo.toLowerCase()) >= 0 })
            result.length > 0 ? mv.selectedProfile = result[0].id : mv.selectedProfile = 0
            return result
        },
        funciones: function () {
            let mv = this
            return mv.tablas.funciones.filter(f => {
                return f.módulo == mv.tablas.módulos[mv.activeTab].id
            })
        },
        selectedPermision: function () {
            let mv = this
            let permisos = mv.tablas.mis_permisos.filter(item => {
                return item.id_cargo == mv.selectedProfile && item.id_módulo == mv.tablas.módulos[mv.activeTab].id
            })
            if (permisos.length == 0) { permisos = [] }
            return permisos
        }
    },
    mounted: function () {
        this.getData()

    }
})