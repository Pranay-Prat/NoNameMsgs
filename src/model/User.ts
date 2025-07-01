import mongoose,{ Schema, Document } from "mongoose";
export interface Message extends Document {
    content: string;
    createdAt:Date
}
const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})
export interface User extends Document {
    username: string;
    password: string;
    email: string;
    isAcceptingMessages: boolean;
    messages: Message[];
    createdAt:Date
}
const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        unique: true,
        minlength: [3, "Username must be at least 3 characters long"],
        trim: true
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }

})
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
export default UserModel;