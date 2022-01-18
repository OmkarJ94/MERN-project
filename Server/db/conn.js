const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(process.env.URI)
    .catch((err) => {
        console.log(err)
    })