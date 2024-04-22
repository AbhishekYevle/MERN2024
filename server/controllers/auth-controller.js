const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// *------------------------
// Home Logic 
// *------------------------

const home = async (req, res) => {
    try {
        res
            .status(200)
            .send(
                "Welcome to Controller Home Page with Abhishek Yevle"
            );
    } catch(error){
        console.log(error);
    }
};
module.exports.home = home;

// *------------------------
// Register Logic 
// *------------------------
// 1. Get Registration Data: Retrieve user data (username, email, password)
// 2. Check Email Existence: Check if the email is already registered.
// 3. Hash Password: Securely hash the password.
// 4. Create User: Create a new user with hashed password.
// 5. Save to DB: Save user data to the database.
// 6. Respond:Respond with "Registration Successful " or handle errors.

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        // const userExists = await User.findOne({email: email});
        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json( { msg: "User Already Exists" } );
        };

        // hash the password
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash( password, saltRound );
        // const hash_password = await bcrypt.hash( password, 10 );

        const userCreated = await User.create({ 
                username, 
                email, 
                phone, 
                password: hash_password,
            });

        res.status(200).json(
            { 
                // msg: userCreated,
                msg: "Registration Successfull.", 
                token: await userCreated.generateToken(), 
                userId: userCreated._id.toString() 
            });


        // res.status(200).send("This is Registration Page.");
    } catch (error) {
        res.status(404).send({msg:"Internal Server Error"});
    }
};

// hash the password

// const register = async (req, res) => {
//     try {
//         console.log(req.body)
//         res.status(200).json( { message: req.body } );
//     } catch (error) {
//         res.status(404).send({msg:"Page Not Found"});
//     }
// };
module.exports.register = register;

// *------------------------
// User Login Logic 
// *------------------------

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const userExists = await User.findOne( { email: email } );

        if(!userExists) {
            return res.status(400).json( { msg: "Invalid Creadentials"} );
        };

        const macthPassword = await bcrypt.compare( password, userExists.password ); 

        if(macthPassword) {
            res.status(200).json(
                { 
                    // msg: userCreated,
                    msg: "Login Successfull.", 
                    token: await userExists.generateToken(), 
                    userId: userExists._id.toString() 
                });    
        } else {
            res.status(401).json( { msg: "Invalid Email or Password."} );
        }
            // res.status(200).send("Welcome to Login Page.");
    } catch (error) {
        res.status(500).send({msg:"Page Not Found"});
    }
}
module.exports.login = login;