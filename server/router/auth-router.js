// *------------------------
//* Routers
// *------------------------


const express = require('express');
const router = express.Router();
// const home = require("../controllers/auth-controller");
// const register = require("../controllers/auth-controller");
// const login = require("../controllers/auth-controller");
const authControllers = require('../controllers/auth-controller');

router.route("/").get(authControllers.home);

router.route("/register").post(authControllers.register);
// router.route("/register").post(authControllers.register);

router.route("/login").post(authControllers.login);



// router.route("/").get((req,res) => {
    // res
    //     .status(200)
    //     .send("Welcome to Home Page with Router.");
// });

// router.get("/", (req,res) => {
//     res.status(200).send("Welcome to Home Page - Router.");
// });

// router.route("/register").get((req,res) => {;
//     res
//         .status(200)
//         .send("Hello welcome to Register Page Router.");
// });

module.exports = router;