import mongoose, { Schema, Document, Date } from 'mongoose';

export interface IScholarship extends Document {
  name: string;
  description: string;
  amount: number;
  recipientNumber: number;
  sponsorId: string;
  expiryDate: Date;
  updatedAt: Date;
  createdAt: Date;
}

const ScholarshipSchema = new Schema(
  {
    name: String,
    description: String,
    amount: Number,
    recipientNumber: Number,
    sponsorId: { type: String, ref: 'User' },
    expiryDate: { type: Date },
    updatedAt: {
      type: Date,
    },
    createdAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model<IScholarship>('Scholarships', ScholarshipSchema);
