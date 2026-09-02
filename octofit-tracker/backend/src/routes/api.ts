import { Router } from 'express';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const router = Router();

router.get('/users', async (_request, response) => {
  response.json(await User.find().sort({ name: 1 }));
});

router.get('/teams', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name email profile'));
});

router.get('/activities', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'name email').sort({ completedAt: -1 }));
});

router.get('/leaderboard', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'name').populate('team', 'name').sort({ rank: 1 }));
});

router.get('/workouts', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }));
});

export default router;
