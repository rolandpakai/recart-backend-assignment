import mongoose from "mongoose";
import { getMongoUrl } from "../utils";

const connectToMongoDb = async () => {
    await mongoose.connect(getMongoUrl());
};

export default connectToMongoDb;