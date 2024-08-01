import mongoose,{Schema} from "mongoose";
const userSchema = Schema (
    {
        name:{
            type :String,
            required : true,
            lowercase : true
        },
        course:{
            type :String,
            required : true,
            lowercase : true,
            
        },

        batch :{
            type : Number,
            },
rollno :{
    type:Number,
    unique: true,
    required: true,
    minlength: 6,
    maxlength: 6,   
}

    },{timeStamp: true}
)

export const User = mongoose.model("User",userSchema)