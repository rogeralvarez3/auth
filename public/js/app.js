
var mv = new Vue({
    el: "#app",
    data: {
        mail: '',
        password: '',
        password2: '',
        loading: false,
        parent:{}
    },
    methods: {
        login: function () {
            mv.loading = true
            let data = JSON.stringify({
                mail: mv.mail,
                password: mv.password
            })
            fetch(`http://coopefacsa.coop:3100/login`, {
                method: 'post',
                body: data,
                headers: { 'Content-Type': 'application/json' }
            }).then(json => { return json.json() })
                .then(r => {
                    mv.loading = false
                    if (!r.err) {
                        let strJSON = JSON.stringify(r)
                        localStorage.setItem('userInfo', strJSON)
                        mv.sendUserInfo()
                    } else {
                        Swal.fire({ icon: 'error', title: 'Acceso denegado', text: r.err })
                    }
                })
        },
        requestPass: function () {
            mv.loading = true
            if (mv.mail.replace(/ /g, '') == "") {
                Swal.fire({ icon: "error", title: "El correo es requerido", text: "Por favor escriba un correo válido para recuperar su contraseña" })
                mv.loading = false
                return
            }
            let data = JSON.stringify({ mail: mv.mail })
            fetch(`http://coopefacsa.coop:3100/requestPass`, {
                method: 'post',
                body: data,
                headers: { 'Content-Type': 'application/json' }
            }).then(json => { return json.json() })
                .then(r => {
                    mv.loading = false
                    Swal.fire(r)

                })
        },
        resetPass: function () {
            mv.loading = true;
            let param = new URLSearchParams(window.location.search).get('requestCode');
            if (mv.password != mv.password2) {
                Swal.fire({ icon: 'error', title: 'Error de contraseña', text: 'Las contraseñas no coinciden.' });
                mv.loading = false;
                return;
            }
            var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
            if (!mediumRegex.test(mv.password)) {
                Swal.fire({ icon: 'error', title: 'Error de contraseña', html: 'La contraseña es muy débil.<br>La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y una minúscula.' });
                mv.loading = false;
                return;
            }
            let data = JSON.stringify({
                password: mv.password,
                param: param
            })
            fetch(`http://coopefacsa.coop:3100/resetPass`, {
                method: 'post',
                body: data,
                headers: { 'Content-Type': 'application/json' }
            }).then(json => { return json.json() })
                .then(r => {
                    mv.loading = false
                    Swal.fire(r)
                })
        },
        sendUserInfo: function () {
            let info = localStorage.getItem('userInfo')
            if (info) {
                mv.parent.source.postMessage(info,mv.parent.origin)
                console.log('se ha enviado la info de sesión')
            }

        }
    }
})
window.addEventListener('message',(e)=>{
    if(document.title!="COOPEFACSA Login"){return;}
    let ui = localStorage.getItem('userInfo')
    if(e.origin=="http://coopefacsa.coop:3100"){return}
    if(ui){
       e.source.postMessage(ui,e.origin) 
       console.log('se ha enviado la info de sesión')
    }else{
        console.log("no se ha iniciado sesión")
        mv.parent = e
    }
    
})