const mongoose=require("mongoose");
let validator=require("validator");

const employeeSchema=new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    lastname : {
        type:String,
        required:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        validate:(value) => {
            return validator.isEmail(value);
        }
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

employeeSchema.path("phone").validate(function validatePhone(){
    return (this.phone>999999999);
});

const Register=new mongoose.model("Register",employeeSchema);
module.exports=Register;