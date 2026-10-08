import mongoose from 'mongoose';
import { activity } from '../models/activity.js';
import { leaderboard } from '../models/leaderboard.js';
import { team } from '../models/team.js';
import { user } from '../models/user.js';
import { workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    const userData = [
      { username: 'alex-runner', email: 'alex.runner@example.com', displayName: 'Alex Rivera', points: 285 },
      { username: 'sam-cyclist', email: 'sam.cyclist@example.com', displayName: 'Sam Chen', points: 240 },
      { username: 'jordan-yoga', email: 'jordan.yoga@example.com', displayName: 'Jordan Taylor', points: 210 },
      { username: 'taylor-swim', email: 'taylor.swim@example.com', displayName: 'Taylor Morgan', points: 175 },
    ];
    const existingUsers = await user.find({
      $or: [
        { username: { $in: userData.map(({ username }) => username) } },
        { email: { $in: userData.map(({ email }) => email) } },
      ],
    });
    const existingUsernames = new Set(existingUsers.map(({ username }) => username));
    const existingEmails = new Set(existingUsers.map(({ email }) => email));
    await user.insertMany(userData.filter(
      (record) => !existingUsernames.has(record.username) && !existingEmails.has(record.email),
    ));
    const seededUsers = await user.find({ username: { $in: userData.map(({ username }) => username) } });
    const usersByName = new Map(seededUsers.map((record) => [record.username, record]));

    const teamData = [
      {
        name: 'Trail Blazers',
        description: 'A team that finds its pace outdoors.',
        members: ['alex-runner', 'sam-cyclist'],
        points: 525,
      },
      {
        name: 'Zenith Movers',
        description: 'Building strength and balance together.',
        members: ['jordan-yoga', 'taylor-swim'],
        points: 385,
      },
    ];
    const existingTeams = await team.find({ name: { $in: teamData.map(({ name }) => name) } });
    const existingTeamNames = new Set(existingTeams.map(({ name }) => name));
    await team.insertMany(teamData
      .filter(({ name }) => !existingTeamNames.has(name))
      .map(({ members, ...record }) => ({
        ...record,
        members: members.map((username) => {
          const member = usersByName.get(username);
          if (!member) throw new Error(`Seed user ${username} was not created or found`);
          return member._id;
        }),
      })));
    const seededTeams = await team.find({ name: { $in: teamData.map(({ name }) => name) } });
    const teamsByName = new Map(seededTeams.map((record) => [record.name, record]));

    const activityData = [
      { seedKey: 'sample-alex-run', username: 'alex-runner', type: 'Running', durationMinutes: 35, distanceKm: 5.2, points: 100, daysAgo: 1 },
      { seedKey: 'sample-alex-strength', username: 'alex-runner', type: 'Strength training', durationMinutes: 40, distanceKm: 0, points: 85, daysAgo: 3 },
      { seedKey: 'sample-sam-ride', username: 'sam-cyclist', type: 'Cycling', durationMinutes: 55, distanceKm: 18.4, points: 130, daysAgo: 1 },
      { seedKey: 'sample-sam-walk', username: 'sam-cyclist', type: 'Walking', durationMinutes: 30, distanceKm: 2.8, points: 65, daysAgo: 2 },
      { seedKey: 'sample-jordan-yoga', username: 'jordan-yoga', type: 'Yoga', durationMinutes: 45, distanceKm: 0, points: 115, daysAgo: 1 },
      { seedKey: 'sample-jordan-walk', username: 'jordan-yoga', type: 'Walking', durationMinutes: 32, distanceKm: 3.1, points: 70, daysAgo: 4 },
      { seedKey: 'sample-taylor-swim', username: 'taylor-swim', type: 'Swimming', durationMinutes: 40, distanceKm: 1.2, points: 110, daysAgo: 2 },
      { seedKey: 'sample-taylor-cycle', username: 'taylor-swim', type: 'Cycling', durationMinutes: 28, distanceKm: 8.5, points: 65, daysAgo: 5 },
    ];
    const existingActivities = await activity.find({
      seedKey: { $in: activityData.map(({ seedKey }) => seedKey) },
    }).select('seedKey');
    const existingActivityKeys = new Set(existingActivities.map(({ seedKey }) => seedKey));
    await activity.insertMany(activityData
      .filter(({ seedKey }) => !existingActivityKeys.has(seedKey))
      .map(({ username, daysAgo, ...record }) => {
        const activityUser = usersByName.get(username);
        if (!activityUser) throw new Error(`Seed user ${username} was not created or found`);
        const date = new Date();
        date.setUTCDate(date.getUTCDate() - daysAgo);
        return { ...record, user: activityUser._id, date };
      }));

    const teamNamesByUser = new Map([
      ['alex-runner', 'Trail Blazers'],
      ['sam-cyclist', 'Trail Blazers'],
      ['jordan-yoga', 'Zenith Movers'],
      ['taylor-swim', 'Zenith Movers'],
    ]);
    const leaderboardData = userData
      .map(({ username, points }) => {
        const leaderboardUser = usersByName.get(username);
        const leaderboardTeam = teamsByName.get(teamNamesByUser.get(username) ?? '');
        if (!leaderboardUser || !leaderboardTeam) {
          throw new Error(`Missing seeded user or team for leaderboard entry ${username}`);
        }
        return { user: leaderboardUser._id, team: leaderboardTeam._id, score: points };
      })
      .sort((left, right) => right.score - left.score)
      .map((record, index) => ({ ...record, rank: index + 1 }));
    const existingLeaderboard = await leaderboard.find({
      user: { $in: leaderboardData.map(({ user: userId }) => userId) },
    }).select('user');
    const existingLeaderboardUsers = new Set(existingLeaderboard.map(({ user: userId }) => userId.toString()));
    await leaderboard.insertMany(leaderboardData.filter(
      ({ user: userId }) => !existingLeaderboardUsers.has(userId.toString()),
    ));

    const workoutData = [
      { seedKey: 'sample-workout-easy-run', title: 'Easy Endurance Run', description: 'A conversational-pace run to build aerobic fitness.', category: 'Cardio', difficulty: 'beginner' as const, durationMinutes: 30 },
      { seedKey: 'sample-workout-bodyweight', title: 'Full-Body Bodyweight Circuit', description: 'A balanced circuit of squats, push-ups, lunges, and planks.', category: 'Strength', difficulty: 'intermediate' as const, durationMinutes: 35 },
      { seedKey: 'sample-workout-yoga', title: 'Mobility and Recovery Flow', description: 'Gentle poses and stretches to improve flexibility and recovery.', category: 'Flexibility', difficulty: 'beginner' as const, durationMinutes: 25 },
      { seedKey: 'sample-workout-cycling', title: 'Tempo Cycling Intervals', description: 'Steady tempo intervals with easy recovery between efforts.', category: 'Cardio', difficulty: 'advanced' as const, durationMinutes: 45 },
    ];
    const existingWorkouts = await workout.find({
      seedKey: { $in: workoutData.map(({ seedKey }) => seedKey) },
    }).select('seedKey');
    const existingWorkoutKeys = new Set(existingWorkouts.map(({ seedKey }) => seedKey));
    await workout.insertMany(workoutData.filter(({ seedKey }) => !existingWorkoutKeys.has(seedKey)));

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
