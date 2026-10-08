import { UserModel } from '../models/index.js';
import { createResourceRouter } from './resourceRouter.js';

export default createResourceRouter(UserModel);
