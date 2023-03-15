const mongoose=require("mongoose");
let validator=require("validator");

const employeeSchema=new mongoose.Schema({
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
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
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

const Delivery=new mongoose.model("Delivery",employeeSchema);
module.exports=Delivery;