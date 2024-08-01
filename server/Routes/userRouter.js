const express = require('express');
const { register, login, findUserById, getAllUser, } = require('../Controller/userController');

const router = express.Router();

router.post("/register", register)

router.post("/login", login)

router.get("/user/:id", findUserById)

router.get("/allUser", getAllUser)

module.exports = router