import mongoose, { Schema, Document, Date } from 'mongoose';

export interface IApplication extends Document {
  name: string;
  description: string;
  amount: number;
  recipientNumber: number;
  sponsorId: string;
  updatedAt: Date;
  createdAt: Date;
}

const ApplicationSchema = new Schema(
  {
    scholarshipId: { type: String, ref: 'Scholarships' },
    studentId: { type: String, ref: 'User' },
    updatedAt: {
      type: Date,
    },
    createdAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model<IApplication>('Applications', ApplicationSchema);
