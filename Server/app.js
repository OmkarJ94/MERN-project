
const express = require('express');
const mongoose = require('mongoose');

const cors = require("cors");
require("dotenv").config()
const app = express();



var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
const user = require("./models/userSchema")
app.use(cors());

app.use(require('./router/auth'));

app.listen(5000);