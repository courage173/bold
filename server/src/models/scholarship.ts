import mongoose, { Schema, Document, Date, Types } from 'mongoose';

type Sponsors = {
  sponsors: string;
};
export interface IScholarship extends Document {
  name: string;
  count?: number;
  description: string;
  amount: number;
  recipientNumber: number;
  sponsors: Sponsors[];
  category: string;
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
    category: String,
    sponsorId: { type: String, ref: 'User' },
    sponsors: [{ sponsorId: { type: String, ref: 'User' }, amount: Number }],
    expiryDate: { type: Date },
    updatedAt: {
      type: Date,
    },
    createdAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model<IScholarship>('Scholarships', ScholarshipSchema);
