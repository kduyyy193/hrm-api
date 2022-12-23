const mongoose = require('mongoose')
const { ServerApiVersion } = require("mongodb");
mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        })
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB