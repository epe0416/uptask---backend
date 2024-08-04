import mongoose, { Schema, Document} from "mongoose";

export interface IUser extends Document {
    email: string
    password: string
    name: string
    confirmed: boolean
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true        
    },
    name: {
        type: String,
        required: true,
        trim: true        
    },
    confirmed: {
        type: Boolean,
        default: false,
        trim: true
    }
})

const User = mongoose.model<IUser>('User', userSchema);
export default User;