const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/bagproject')
.then(() => {
    console.log("connected");
})
.catch(() => {
    console.error("Connection error:", error);
})

module.exports = mongoose.connection;