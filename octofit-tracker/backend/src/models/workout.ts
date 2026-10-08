import mongoose, { Schema } from 'mongoose';

export interface Workout {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  seedKey?: string;
}

const workoutSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, required: true, trim: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  durationMinutes: { type: Number, required: true, min: 1 },
  seedKey: { type: String, unique: true, sparse: true },
});

export const workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);
export const WorkoutModel = workout;
