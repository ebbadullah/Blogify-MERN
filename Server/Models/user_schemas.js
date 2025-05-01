import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}
,
  {timestamps: true}

);


  const User = mongoose.model("User", userSchema);
  export default User;





// // Password ko hash karna (save ke time pe)
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);  // Salt generate karte hain
//   this.password = await bcrypt.hash(this.password, salt);  // Password ko hash karte hain
//   next();
// });

