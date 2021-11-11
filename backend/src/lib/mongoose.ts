import mongoose from 'mongoose';

const mongooseInit = async () => {
    const MONGO_URL = process.env.MONGO_URL || 'mongodb://server@localhost/tempr';

    await mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    } as any);

    console.log('Connected to MongoDB database via Mongoose');
};

(async () => mongooseInit())();