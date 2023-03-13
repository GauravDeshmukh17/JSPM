const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();

require("./db/conn");
const Register=require("./models/registers");

const port=process.env.PORT || 3000

const static_path=path.join(__dirname,"../public");
const view_path=path.join(__dirname,"../views")


app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(express.static(static_path));

app.set("view engine","hbs");
app.set("views",view_path);
app.get("/",(req,res) => {
    res.render("register");
});
// app.get("/",(req,res) => {
//     res.send("Hello from Gaurav");
// });
app.get("/register.hbs",(req,res) => {
    res.render("register");
})
app.get("/index2.hbs",(req,res) => {
    res.render("index2");
})
app.get("/index3.hbs",(req,res) => {
    res.render("index3");
})
app.get("/index4.hbs",(req,res) => {
    res.render("index4");
})
app.get("/index5.hbs",(req,res) => {
    res.render("index5");
})
app.get("/menu.hbs",(req,res) => {
    res.render("menu");
})


app.post("/register", async (req,res) => {
    try{
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        if(password===cpassword){
            const registerEmployee=new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                phone:req.body.phone,
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })

            const registered=await registerEmployee.save();
            res.status(201).render("index");

        }
        else{
            res.send("Password are not matching");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
});

app.listen(port,() => {
    console.log(`server is running at port no ${port}`);
});