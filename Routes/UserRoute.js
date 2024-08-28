const express = require("express");
const checkRole = require('../Middleware/checkRole')
const UserController = require("../Controllers/UserControll");
const router = express.Router();
const verifyToken = require('../Middleware/VerifyToken')

router.post("/addUser", UserController.AddUser);
router.post("/login", UserController.logIn);
router.get("/getUser", UserController.AllUser);
// router.get("/protected",verifyToken ,UserController.protected);
router.get("/protected",verifyToken,checkRole(['user']),UserController.protected);


module.exports = router;
