const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        min: 5,
        max: [40, "Username must not exceed more than 40 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: 10,
        max: [100, "Password must not exceed more than 40 characters"]
    }
});

// this hashes the password with a salt (inputs random characters before/after to obscure actual pass) of 10
userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
});
///

const userModel = mongoose.model("user", userSchema, "Users");

module.exports = userModel;