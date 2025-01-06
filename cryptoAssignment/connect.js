import { config } from 'dotenv'
import mongoose from 'mongoose'



config();

const connectToDB = () => mongoose.connect(process.env.MONGODB_URL).then(async () => {
    return Promise.resolve("Connected to MongoDB.")
})
    .catch(function (err) {
        return Promise.reject(err)
    })

export default connectToDB