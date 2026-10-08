import mongoose, { Schema } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  points: number;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  displayName: { type: String, required: true, trim: true },
  points: { type: Number, default: 0, min: 0 },
});

export const user = mongoose.models.User ?? mongoose.model('User', userSchema);
export const UserModel = user;
