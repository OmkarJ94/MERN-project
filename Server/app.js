
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
require('./db/conn')
const cors = require("cors");
const app = express();



var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
const user = require("./models/userSchema")
app.use(cors());

app.use(require('./router/auth'));

app.listen(5000);