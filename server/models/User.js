const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    userName: { // New field
        type: String,
        required: true,
        unique: true,
    },    
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }, 
    address: {
        type: String,
    },
    phone: {
        type: String,
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

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error("Error comparing passwords....verify password!")
    }
  };

const User = mongoose.model("User", userSchema);

module.exports = User;