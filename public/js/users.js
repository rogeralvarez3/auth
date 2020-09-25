var mv = new Vue({
    el:"#app",
    data:{
        items:[],
        filter:''
    },
    methods:{
        getUsers:function(){
            let mv = this;
            let data = JSON.stringify({
                tabla:'usuarios'
            })
            fetch("http://coopefacsa.coop:3100/getUsers",{body:data,headers:{"content-type":"application/json"},method:"post"})
            .then(json=>{return json.json();})
            .then(r=>{
                if(r.errorno){console.log(r);return}
                mv.items = r
            })
        }
    },
    computed:{
        users:function(){
            let mv = this
            return mv.items.filter(item=>{
                return item.nombre.toString().toLowerCase().indexOf(mv.filter.toString().toLowerCase())>=0
            })
        }
    },
    mounted:function(){
        this.getUsers()
    }
})