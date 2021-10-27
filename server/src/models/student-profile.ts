import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  description: string;
  dateOfBirth: string;
  phone: number;
  interest: string;
  userId: string;
  nationality: string;
  skills: string;
  address: string;
  imageUrl: string;
  updatedAt: Date;
}

const SponsorProfileSchema = new Schema(
  {
    description: String,
    courseOfStudy: String,
    dateOfBirth: Date,
    interest: String,
    skills: String,
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

export default mongoose.model<IStudentProfile>('StudentProfile', SponsorProfileSchema);
