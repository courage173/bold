import mongoose, { Schema, Document } from 'mongoose';

export interface ISponsorProfile extends Document {
  description: string;
  imageUrl: string;
  updatedAt: Date;
}

const SponsorProfileSchema = new Schema(
  {
    description: String,
    imageUrl: String,
    userId: { type: String, ref: 'User' },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ISponsorProfile>('SponsorProfile', SponsorProfileSchema);
