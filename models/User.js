import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    firstName: {
        type:String,
        require:true,
        min:2,
        max:50
    },
    lastName:{
        type:String,
        require:true,
        min:2,
        max:50
    },
email:{
    type:String,
    require:true,
    max:50,
    unique:true
},
password:{
    type:String,
    require:true,
    min:8
}
},{timestamps:true}
)
 const User = mongoose.model('User',userSchema);
 export default User;