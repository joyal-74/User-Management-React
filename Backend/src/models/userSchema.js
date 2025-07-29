import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: false },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: String, required: false },
        bio: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
