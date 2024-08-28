const mongoose = require("mongoose");
const bCrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default:'user'
  },
});

/////////////////////////////////////////////PASSWORD HASHING//////////////////////////////////////////////

UserSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    return next();
  }
  this.Password = await bCrypt.hash(this.Password, 10);///10 is the saltRound/// defines how complex will be the password
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const UserModel = mongoose.model("UserCollection", UserSchema);
module.exports = UserModel;
