import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISponsorProfile extends Document {
  _id: Types.ObjectId;
  description: string;
  imageUrl: string;
  userId: string;
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
