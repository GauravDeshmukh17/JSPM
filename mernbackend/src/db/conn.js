const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/restaurant")
.then(() => {
    console.log("Connection successful");
})
.catch((err) => {
    console.log(err);
}) 