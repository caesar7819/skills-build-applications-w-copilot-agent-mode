import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Alex Rivera', email: 'alex@octofit.dev', profile: { goal: 'Build endurance', avatar: 'AR' } },
      { name: 'Jordan Lee', email: 'jordan@octofit.dev', profile: { goal: 'Improve strength', avatar: 'JL' } },
      { name: 'Sam Morgan', email: 'sam@octofit.dev', profile: { goal: 'Stay consistent', avatar: 'SM' } },
    ]);

    const teams = await Team.create([
      { name: 'Peak Performers', motto: 'Small steps, strong finish', members: [users[0]._id, users[1]._id] },
      { name: 'Trail Blazers', motto: 'Find your next mile', members: [users[2]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Run', durationMinutes: 32, calories: 318, completedAt: new Date('2026-08-25T07:30:00Z') },
      { user: users[1]._id, type: 'Strength', durationMinutes: 45, calories: 276, completedAt: new Date('2026-08-25T18:00:00Z') },
      { user: users[2]._id, type: 'Cycle', durationMinutes: 38, calories: 344, completedAt: new Date('2026-08-24T09:00:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 840, rank: 1, period: 'This week' },
      { user: users[1]._id, team: teams[0]._id, points: 720, rank: 2, period: 'This week' },
      { user: users[2]._id, team: teams[1]._id, points: 605, rank: 3, period: 'This week' },
    ]);

    await Workout.create([
      { title: 'Tempo Builder', focus: 'Cardio', difficulty: 'Intermediate', durationMinutes: 30, exercises: ['Warm-up jog', 'Tempo intervals', 'Cool-down walk'] },
      { title: 'Core and Control', focus: 'Strength', difficulty: 'Beginner', durationMinutes: 20, exercises: ['Plank', 'Bird dog', 'Dead bug'] },
      { title: 'Mobility Reset', focus: 'Mobility', difficulty: 'Beginner', durationMinutes: 15, exercises: ['Hip opener', 'Thoracic rotation', 'Hamstring stretch'] },
    ]);

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts populated');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
