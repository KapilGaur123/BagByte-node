const mongoose = require('mongoose')
const config = require('config')

const dbgr = require('debug')("development: mongoose");

mongoose.connect(`${config.get("MONGO_URI")}/scetch`) // --> config/devel/
.then(() => {
    dbgr("connected");
})
.catch(() => {
    dbgr("Connection error:", error);
})

module.exports = mongoose.connection;