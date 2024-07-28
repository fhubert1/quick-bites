const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }, 
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

userSchema.pre("save", async function (next) {
    try {
        // Check if the password is modified
        if (!this.isModified("password")) {
            return next();
        }
        // salt
        const salt = await bcrypt.genSalt(10);
        // Hash password
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Replace password with the hashed one
        this.password = hashedPassword;
        next();
    } catch (err) {
        // pass error up the chain        
        next(err);
    }
});
  
// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
      throw new Error("Error passwords do not match!");
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;