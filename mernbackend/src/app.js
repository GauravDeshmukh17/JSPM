const express=require("express");
const path=require("path");
const hbs=require("hbs");
const nodemailer=require("nodemailer");
const app=express();

require("./db/conn");
const Register=require("./models/registers");
const Delivery=require("./models/deliveries");
let requiredEmail;

const port=process.env.PORT || 3000

const static_path=path.join(__dirname,"../public");
const view_path=path.join(__dirname,"../views")


app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(express.static(static_path));

app.set("view engine","hbs");
app.set("views",view_path);
app.get("/",(req,res) => {
    res.render("index");
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
app.get("/login.hbs",(req,res) => {
    res.render("login");
})
app.get("/notify.hbs",(req,res) => {
    res.render("notify");
})
app.get("/payment.hbs",(req,res) => {
    res.render("payment");
})
app.get("/delivery.hbs",(req,res) => {
    res.render("delivery");
})

// Registration
app.post("/register", async (req,res) => {
    try{
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);

        // Send email
        requiredEmail=req.body.email;
        requiredName=req.body.firstname;
        requiredPassword=req.body.password;
        console.log(requiredEmail);
        console.log(requiredName);
        console.log(requiredPassword);
        const mail=async () => {
            let testAccount = await nodemailer.createTestAccount();
        
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure:false,
                auth: {
                    user: 'jspmicoer2001@gmail.com',
                        pass: 'ndqzzlnmqefvercp'
                },
              });
        
            const info = await transporter.sendMail({
                from: '"Gaurav Deshmukh 👻" <gaurav@gmail.com>', // sender address
                to: [requiredEmail,"gauravdeshmukh1703@gmail.com"], // list of receivers
                subject: "Hello ✔", // Subject line
                text: `Congratulations ${requiredName} for successfull registration on CAFETERIA JSPM CANTEEN !

                Your Password is : ${requiredPassword}`, 
                // html: "<b>Hello world?</b>", // html body
              });
              
            console.log("Message sent: %s", info.messageId); 
        }
        
        mail().catch((e) => console.log(e));
        

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


// Login check
app.post("/login",async(req,res) => {
    try{
        const email=req.body.email;
        const password=req.body.password;

        // console.log(`Email is ${email} and password is ${password}`);
        const useremail=await Register.findOne({email:email});
        // console.log(useremail);
        if(useremail.password===password){
            res.status(201).render("index");
        }
        else{
            res.send("Password is not matching");
        }
    }
    catch(err){
        res.status(400).send("Invalid Email");
    }
})


// Notify
app.post("/notify",async(req,res) => {
    try{
        const email=req.body.email;
        const requiredMessId=req.body.messid;
        const user=await Register.findOne({email:email});
        if(user.email===email){
            const mail=async () => {
                let testAccount = await nodemailer.createTestAccount();
            
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure:false,
                    auth: {
                        user: 'jspmicoer2001@gmail.com',
                        pass: 'ndqzzlnmqefvercp'
                    },
                  });
            
                const info = await transporter.sendMail({
                    from: '"Gaurav Deshmukh 👻" <gaurav@gmail.com>', // sender address
                    to: [requiredEmail,"gauravdeshmukh1703@gmail.com"], // list of receivers
                    subject: "Absent Status ✔", // Subject line
                    text:`Name : ${user.firstname}                   
LastName : ${user.lastname}
Date : ${user.date}

Today i am not going to visit mess so please mark my absentee` ,
                    // html: "<b>Hello world?</b>", // html body
                  });
                  
                console.log("Message sent: %s", info.messageId); 
            }
            
            mail()
            .then(function(){
                res.status(201).render("index");
            })
            .catch((e) => console.log(e));
            
        }
        // else{
        //     res.send("You are not registered , please register");
        // }
    }
    catch(err){
        res.status(400).send("You are not registered , please register");
    }
})



// Delivary Address
app.post("/delivery",async(req,res) => {
    try{

        const email=req.body.email;
        const user=await Register.findOne({email:email});
        if(user.email===email){
            const delivaryAddress=new Delivery({
                food:req.body.food,
                transactionid:req.body.transactionid,
                phone:req.body.phone,
                email:req.body.email,
                state:req.body.state,
                district:req.body.district,
                address:req.body.address,
                screenshot:req.body.screenshot,
                pincode:req.body.pincode
            })
    
            const delivered=await delivaryAddress.save();
            


            const mail=async () => {
                let testAccount = await nodemailer.createTestAccount();
            
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure:false,
                    auth: {
                        user: 'jspmicoer2001@gmail.com',
                        pass: 'ndqzzlnmqefvercp'
                    },
                  });
            
                const info = await transporter.sendMail({
                    from: '"Food Delivary 👻" <gaurav@gmail.com>', // sender address
                    to: "gauravdeshmukh1703@gmail.com", // list of receivers
                    subject: "Address Details", // Subject line
                    text: `${user.firstname} had ordered ${req.body.food}
 
Transaction Id : ${req.body.transactionid}  
Email : ${req.body.email}
Phone : ${req.body.phone}
Address : ${req.body.address}   ` 
                    // html: "<b>Hello world?</b>", // html body
                  });
                  
                console.log("Message sent: %s", info.messageId); 
            }
            
            mail()
            .then(function(){

                const mail=async () => {
                    let testAccount = await nodemailer.createTestAccount();
                
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure:false,
                        auth: {
                            user: 'jspmicoer2001@gmail.com',
                            pass: 'ndqzzlnmqefvercp'
                        },
                      });
                    
                    const info = await transporter.sendMail({
                        from: '"Food Delivary 👻" <gaurav@gmail.com>', // sender address
                        to: req.body.email, // list of receivers
                        subject: "Address Details", // Subject line
                        text: `${user.firstname} your order for ${req.body.food} 
                        had been successfully placed !` 
                        // html: "<b>Hello world?</b>", // html body
                      });
                      
                    console.log("Message sent: %s", info.messageId); 
                }
                
                mail().catch((e) => console.log(e));
    

            })
            .catch((e) => console.log(e));
    



            res.status(201).render("index");
        }
        
    }
    catch(err){
        res.status(400).send(`<h1>You are not registered please Register first<h1>
        <a href="register.hbs""><button>Register</button></a>`);

        // res.status(400).render("register");
    }
})


app.listen(port,() => {
    console.log(`server is running at port no ${port}`);
});





