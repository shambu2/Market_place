import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

export const User = mongoose.model("User",userSchema)

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    
    images: [{type: String}],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

export const Item = mongoose.model("Item",itemSchema)

const customerSchema = new mongoose.Schema({
    email:{
        type: String,
        required :true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})
export const Customers = mongoose.model('Customers',customerSchema);