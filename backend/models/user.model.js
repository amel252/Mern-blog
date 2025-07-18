import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        
    },
    profilePicture: {
        type: String,
        default:"https://up.yimg.com/ib/th/id/OIP.dCpgPQ0i-xX2gZ-yonm54gHaHa?pid=Api&rs=1&c=1&qlt=95&w=122&h=122"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User;