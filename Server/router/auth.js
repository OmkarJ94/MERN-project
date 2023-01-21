const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const jwt = require('jsonwebtoken');
const otp = require("../models/Otp")
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const path = require("path");
const user = require('../models/userSchema');
const hbs = require('nodemailer-express-handlebars')


const cookieParser = require("cookie-parser");
router.use(cookieParser())
router.get('/', (req, res) => {
    res.send("router")
})

router.post("/register", async (req, res) => {

    try {
        const { name, email, phone, work, password, cpassword } = req.body;
        if (!name || !email || !phone || !work || !password || !cpassword) {
            return res.status(422).json({ error: "Enter All Data" })
        }
        else {
            const result = await user.findOne({ email: email })


            if (result === null) {
                if (password != cpassword) {
                    return res.status(422).json({ error: "Enter Valid Data" })
                }
                else {

                    const newUser = new user({ name, email, phone, work, password, cpassword })


                    const finalResult = await newUser.save();
                    res.status(201).send({ message: `${name} your registration completed successfully` })
                }
            }
            else {
                return res.status(422).json({ error: "Email already exists" })
            }
        }
    } catch (error) {
        res.status(400).send(error)
    }

})



router.post("/signin", async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "please filled the data" })
        }
        const result = await user.findOne({ email: email })


        if (result != null) {

            const isMatch = await bcrypt.compare(password, result.password)
            token = await result.generateAuthToken();

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true,

            });


            if (isMatch) {
                res.status(200).json({ message: "Log in successfully" })
            }
            else {

                res.status(400).json({ message: "Invalid Creadentials" })
            }
        }
        else {

            res.status(400).json({ message: "Invalid Creadentials" })
        }

    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/profilepage', authenticate, (req, res) => {

    // console.log("rootuser",req.rootUser);
    res.send(req.rootUser)

})
router.get('/getData', authenticate, (req, res) => {

    // console.log("rootuser",req.rootUser);
    res.send(req.rootUser)

})
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.send("Please fill all the field")
        }
        else {
            const userContact = await user.findOne({ _id: req.userId })
            if (userContact) {
                const userMessage = await userContact.addMessage(name, email, phone, message)
                await userContact.save()
                res.status(201).json({ message: "meassage added successfully" })
            }
        }
    } catch (error) {
        console.log(error)
    }
})


router.get("/logout", async (req, res) => {

    res.clearCookie("jwt", {
        path: "/"
    })
    res.status(200).send("user Logout")
})

router.post("/reset", async (req, res) => {
    try {
        let { email } = req.body;
        if (!email) {
            return res.status(404).json({ error: "User Not Found" })
        }
        const result = await user.findOne({ email })
        if (result) {
            const code = Math.floor(Math.random() * 10000 + 1)
            let Code = new otp({
                email,
                Otp: code,
                expireIn: new Date().getTime() + 300 * 1000
            })
            const response = await Code.save()
            mailer(email, code)
            res.status(200).json({ error: "OTP Send Your Mail Id" })
        }
        else {
            console.log("here")
            res.status(404).json({ error: "User Not Found" })
        }
    } catch (error) {
        console.log("catch")

        res.status(404).json({ error: error.message })
    }

})


router.post("/update", async (req, res) => {
    try {
        let { Otp, email, password } = req.body;

        if (!Otp || !email || !password) {
            res.status(404).json({ error: "Enter All Fields" })
        }
        let data = await otp.findOne({ email, Otp })

        if (data) {

            let currTime = new Date().getTime()
            let diff = data.expireIn - currTime

            if (diff < 0) {
                res.status(401).json({ error: "Your OTP Expired" })
            }
            else {
                const User = await user.findOne({ email })
                User.password = password;
                await User.save();
                res.status(200).json({ message: "Your Password has been updated successfully" })
            }
        }
        else {
            res.status(404).json({ error: "Enter a Valid OTP" })
        }


    } catch (error) {
        res.status(404).status("Something Went Wrong")
    }


})

router.put("/updateuser/:id", async (req, res) => {
    try {

        const { name, email, phone, Proffesion, } = req.body
        const User = await user.findByIdAndUpdate(req.params.id, { name, email, phone, work: Proffesion }, { new: true })
        const data = await User.save()

        res.status(200).send("data updated successfully")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})


const mailer = (mail, otp) => {
    try {


        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',

            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        mailTransporter.use('compile', hbs({
            viewEngine: {
                extname: ".handlebars",
                partialsDir: path.resolve('./views'),
                defaultLayout: false
            },

            viewPath: path.resolve('./views'),
            extname: ".handlebars",
        }))
        let mailDetails = {
            from: process.env.EMAIL,
            to: mail,
            subject:"OTP for Chnaging Password",
            template: 'index',
            context: {
                otp
            }
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {

            if (err) {
                console.log(err)

            } else {
                console.log(data)
            }
        })
    } catch (error) {
        console.log(error)

    }
}
module.exports = router;