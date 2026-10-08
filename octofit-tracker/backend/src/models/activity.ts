import mongoose, { Schema, Types } from 'mongoose';

export interface Activity {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  points: number;
  date: Date;
  seedKey?: string;
}

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 0 },
  distanceKm: { type: Number, default: 0, min: 0 },
  points: { type: Number, default: 0, min: 0 },
  date: { type: Date, default: Date.now },
  seedKey: { type: String, unique: true, sparse: true },
});

export const activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);
export const ActivityModel = activity;
