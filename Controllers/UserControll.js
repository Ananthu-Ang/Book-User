const UModel = require("../models/UserM");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.AddUser = async (req, res) => {
  try {
    const isExist = await UModel.findOne({ Phone: req.body.Phone });
    if (isExist) {
      res.status(409).json({ message: "User Already Exist" });
      console.log(isExist);
    } else {
      const UserResult = new UModel(req.body);
      await UserResult.save();
      res.status(200).json({ message: "Added Successfully", UserResult });
    }
  } catch (error) {
    res.status(409).json({ message: "Cannot Add", Error: error });
  }
};
module.exports.logIn = async (req, res) => {
  try {
    const isExist = await UModel.findOne({ Phone: req.body.Phone });

    if (!isExist) {
      res.status(409).json({ message: "User not found" });
    } else {
      const isMatch = await bCrypt.compare(req.body.Password, isExist.Password);
      if (isMatch) {
        const token = jwt.sign(
          { id: isExist.id, role: isExist.role,username:isExist.Username },
          process.env.UNIQ_KEY,
          { expiresIn: "1hr" }
        );
        res.cookie("accessToken", token, { httponly: true, maxAge: 3600000 });
        res.status(200).json({ message: "logIn Success" });
      } else {
        res.status(405).json({ message: "Invalid Password" });
      }
    }
  } catch (error) {
    res.status(409).json({ message: "logIn Failed", Error: error });
  }
};
module.exports.AllUser = async (req, res) => {
  const UserResult = await UModel.find();
  res.send({ OutPut: UserResult });
};
module.exports.protected = async (req, res) => {
  try {
    
    
    res.status(400).json({ message: `Protected Route ${req.User.username}`});
  } catch (error) {
    res.status(409).json({ message: "Cant Access", Error: error });

  }
};
