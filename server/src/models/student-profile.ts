import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  description: string;
  dateOfBirth: string;
  phone: number;
  userId: string;
  nationality: string;
  address: string;
  imageUrl: string;
  updatedAt: Date;
}

const SponsorProfileSchema = new Schema(
  {
    description: String,
    courseOfStudy: String,
    dateOfBirth: Date,
    phone: Number,
    address: String,
    nationality: String,
    imageUrl: String,
    userId: { type: String, ref: 'User' },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IStudentProfile>('SponsorProfile', SponsorProfileSchema);
