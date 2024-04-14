import mongoose, { ConnectOptions } from 'mongoose'

let isConnected = false;

export const connectToDB = async () => {
    if (isConnected) {
        console.log("MongoDB is alreay Connected!");
        return;
    }

    try {
        await mongoose.connect(
            process.env.MONGODB_URI as string,
            {
                dbName: "Propmptopia",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions
        )

        isConnected = true;
        console.log("MongoDB connected!");


    } catch (error) {
        console.log(error);


    }
}