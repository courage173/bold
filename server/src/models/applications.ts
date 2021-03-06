import mongoose, { Schema, Document, Date } from 'mongoose';

export interface IApplication extends Document {
  scholarshipId: string;
  studentId: string;
  essay: string;
  awarded: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const ApplicationSchema = new Schema(
  {
    scholarshipId: { type: String, ref: 'Scholarships' },
    essay: { type: String },
    studentId: { type: String, ref: 'User' },
    awarded: { type: Boolean, default: false },
    updatedAt: {
      type: Date,
    },
    createdAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model<IApplication>('Applications', ApplicationSchema);
