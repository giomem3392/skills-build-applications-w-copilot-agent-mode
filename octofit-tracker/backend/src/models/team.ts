import mongoose, { Schema, Types } from 'mongoose';

export interface Team {
  name: string;
  description: string;
  members: Types.ObjectId[];
  points: number;
}

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  points: { type: Number, default: 0, min: 0 },
});

export const team = mongoose.models.Team ?? mongoose.model('Team', teamSchema);
export const TeamModel = team;
