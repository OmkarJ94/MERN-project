const jwt = require('jsonwebtoken')
const user = require('../models/userSchema')


const Authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, "Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins")
        const rootUser = await user.findOne({ _id: verifyToken._id, "tokens:token": token })
        if (!rootUser) {
            throw new Error("User Not Found")

        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        // console.log(req.userId,req.rootUser);
        next();
    } catch (error) {
        res.status(401).send("Unautorized")
    }

}
module.exports = Authenticate