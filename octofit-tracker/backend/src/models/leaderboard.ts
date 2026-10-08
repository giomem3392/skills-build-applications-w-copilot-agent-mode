import mongoose, { Schema, Types } from 'mongoose';

export interface LeaderboardEntry {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
});

export const leaderboard = mongoose.models.LeaderboardEntry
  ?? mongoose.model('LeaderboardEntry', leaderboardSchema);
export const LeaderboardEntryModel = leaderboard;
