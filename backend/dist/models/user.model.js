import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" }
});
export const User = mongoose.model("User", userSchema);
//# sourceMappingURL=user.model.js.map