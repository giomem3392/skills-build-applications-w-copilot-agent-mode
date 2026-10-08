import { LeaderboardEntryModel } from '../models/index.js';
import { createResourceRouter } from './resourceRouter.js';

export default createResourceRouter(LeaderboardEntryModel, { rank: 1, score: -1 });
