import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
})
.catch(function (error) {
    console.log('Error connecting to MongoDB',error);
});