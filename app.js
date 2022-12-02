const express=require('express'); //importing Express
const PORT =6655;
const app =express();
const fs = require('fs'); //file system
app.set('view engine','pug'); //setting the engine
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/static",express.static("public"));


//define routes
app.get("/",(req,res)=>{
    res.render("first_view");
})

app.get("/contacts",(req,res)=>{
    res.render("contacts");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/services",(req,res)=>{
    res.render("services");
})

app.get("/gallery",(req,res)=>{
    res.render("gallery");
})

app.get('/Information', (req, res) => {
    try {
    
        const data = fs.readFileSync('myfile.txt', 'UTF-8')

      
        const lines = data.split(/\r?\n/)
      var arr=[]
      

        lines.forEach(line => {
            const li=line.split(/,/)
             arr.push(`{"name":"${li[0]}","email":"${li[1]}", "mobile":"${li[2]}", "city":"${li[3]}","remark":"${li[4]}"}`);
        })
        var result = arr.map(info => JSON.parse(info));
        res.render("Information",{result:result})
      } catch (err) {
        console.error(err)
      }
})  

app.post('/contacts', (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let mobile = req.body.mobile;
        let city = req.body.city;
        let remark = req.body.remark;

    var data = name + "," + email + "," + mobile + "," + city + "," + remark + "\n";
    if (name != "" && email != "" && city != "" && remark != "") {
        fs.appendFile('myfile.txt', data, (err) => {
            if (err) throw err
        })
        
        res.send(`<script>
        window.location.assign('/Information')
    </script>`);
    }
    else {
        res.send(`<script>
        window.location.assign('/contacts')
    </script>`);
    }
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`server work on ${PORT}`)
})