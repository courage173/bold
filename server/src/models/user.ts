import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  jwtRefreshToken: string;
}

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    lastActive: {
      type: Date,
      default: Date.now,
    },
    jwtRefreshToken: String,
    role: { type: String, enum: ['sponsor', 'student'] },
    updatedAt: {
      type: Date,
    },
    deleted: { type: Boolean, default: false },
    deletedAt: {
      type: Date,
    },
    deletedById: { type: String, ref: 'User', index: true },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);
